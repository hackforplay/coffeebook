import { applyMiddleware, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { NEVER } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithImmer } from './reducerWithImmer';

export interface StoreState {}

const actionCreator = actionCreatorFactory('gamebook');
export const sampleAction = actionCreator<{}>('SAMPLE');

export const rootEpic = combineEpics(action$ =>
  action$.pipe(
    filter(sampleAction.match),
    mergeMap(() => NEVER)
  )
);

export const initialState: StoreState = {};

export const rootReducer = reducerWithImmer(initialState)
  .case(sampleAction, () => {})
  .toReducer();

export function createGamebookStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);
  return store;
}
