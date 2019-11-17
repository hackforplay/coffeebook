import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import * as floor from './floor';

export interface StoreState extends floor.States {}
export type SS = StoreState; // alias

export const rootReducer = combineReducers({
  ...floor.reducers
});

export const actions = {
  ...floor.actions
};

export const rootEpic = combineEpics(floor.epic);

export function createGamebookStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);
  return store;
}

export type Store = ReturnType<typeof createGamebookStore>;
