import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import * as floor from './floor';

type ReducersStates<R extends { [key: string]: (...args: any) => any }> = {
  [key in keyof R]: ReturnType<R[key]>;
};

export interface StoreState extends ReducersStates<typeof floor.reducers> {}
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
