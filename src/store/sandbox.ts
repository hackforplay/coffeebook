import { combineEpics } from 'redux-observable';
import { NEVER } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  tap
} from 'rxjs/operators';
import actionCreatorFactory from 'typescript-fsa';
import { S$ } from '.';
import { IFile, Sandbox } from '../sandbox';
import { reducerWithImmer } from './reducerWithImmer';

export const initialState = {
  instance: new Sandbox(),
  runningVersion: 0,
  version: 0
};

const actionCreator = actionCreatorFactory('gamebook');

export const actions = {
  runSanbox: actionCreator<void>('RUN_SANDBOX'),
  writeFiles: actionCreator<IFile[]>('WRITE_FILES')
};

const sandbox = reducerWithImmer(initialState)
  .case(actions.runSanbox, draft => {
    draft.runningVersion = draft.version;
  })
  .case(actions.writeFiles, draft => {
    draft.version += 1;
  })
  .toReducer();

export default sandbox;

export const reducers = {
  sandbox
};

export const epic = combineEpics(
  (action$, store$: S$) =>
    action$.pipe(
      filter(actions.writeFiles.match),
      tap(action => {
        store$.value.sandbox.instance.update(action.payload);
      }),
      mergeMap(() => NEVER)
    ),
  (action$, store$: S$) =>
    store$.pipe(
      map(state => state.sandbox.runningVersion),
      distinctUntilChanged(),
      tap(() => {
        store$.value.sandbox.instance.run();
      }),
      mergeMap(() => NEVER)
    )
);
