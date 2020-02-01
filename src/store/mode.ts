import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { EditorMode } from './enums';
import { reducerWithImmer } from './reducerWithImmer';

export const initialState = {
  /**
   * GameView をメインパネルより手前に持ってくる
   */
  bringGameFront: true,
  /**
   * メインパネルのモード
   */
  editorMode: EditorMode.Map
};

const actionCreator = actionCreatorFactory('gamebook');

export const actions = {
  setEditorMode: actionCreator<EditorMode>('SET_EDITOR_MODE'),
  bringGameFront: actionCreator<boolean>('BRING_GAME_FRTON')
};

const mode = reducerWithImmer(initialState)
  .case(actions.setEditorMode, (draft, payload) => {
    draft.editorMode = payload;
  })
  .case(actions.bringGameFront, (draft, payload) => {
    draft.bringGameFront = payload;
  })
  .toReducer();

export default mode;

export const reducers = {
  mode
};

export const epic = combineEpics();
