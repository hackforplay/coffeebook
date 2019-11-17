import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { EditorMode } from './enums';
import { reducerWithImmer } from './reducerWithImmer';

export const initialState = {
  editorMode: EditorMode.Map
};

const actionCreator = actionCreatorFactory('gamebook');

export const actions = {
  setEditorMode: actionCreator<EditorMode>('SET_EDITOR_MODE')
};

const mode = reducerWithImmer(initialState)
  .case(actions.setEditorMode, (draft, payload) => {
    draft.editorMode = payload;
  })
  .toReducer();

export default mode;

export const reducers = {
  mode
};

export const epic = combineEpics();
