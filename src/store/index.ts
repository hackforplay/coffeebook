import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import {
  combineEpics,
  createEpicMiddleware,
  StateObservable
} from 'redux-observable';
import * as floor from './floor';
import * as mode from './mode';
import * as sandbox from './sandbox';

export * from './enums';

type ReducersStates<R extends Reducer> = R extends Reducer<infer S> ? S : never;

export type StoreState = ReducersStates<typeof rootReducer>;
export type SS = StoreState; // alias

export type Store = ReturnType<typeof createGamebookStore>;

export type S$ = StateObservable<SS>;

export const rootReducer = combineReducers({
  ...floor.reducers,
  ...mode.reducers,
  ...sandbox.reducers
});

export const actions = {
  ...floor.actions,
  ...mode.actions,
  ...sandbox.actions
};

export const rootEpic = combineEpics(floor.epic, sandbox.epic);

export function createGamebookStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);
  return store;
}
