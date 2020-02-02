import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import {
  combineEpics,
  createEpicMiddleware,
  StateObservable
} from 'redux-observable';
import * as floor from './floor';
import * as mode from './mode';
import * as sandbox from './sandbox';
import * as user from './user';

export * from './enums';
export * from './types';

export type StoreState = ReturnType<typeof rootReducer>;
export type SS = StoreState; // alias

export type Store = ReturnType<typeof createGamebookStore>;

export type S$ = StateObservable<SS>;

export const rootReducer = combineReducers({
  ...floor.reducers,
  ...mode.reducers,
  ...sandbox.reducers,
  ...user.reducers
});

export const actions = {
  ...floor.actions,
  ...mode.actions,
  ...sandbox.actions,
  ...user.actions
};

export const rootEpic = combineEpics(
  floor.epic,
  mode.epic,
  sandbox.epic,
  user.epic
);

export function createGamebookStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);
  return store;
}
