import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithImmer } from './reducerWithImmer';
import { GameMap } from './types';

export const initialState = {
  selected: 1,
  /**
   * [stage1, stage2, ...]
   */
  stages: [] as GameMap[],
  mine: [] as GameMap[],
  ours: [] as GameMap[]
};

const actionCreator = actionCreatorFactory('gamebook');

export const actions = {
  setFloor: actionCreator<number>('SET_FLOOR'),
  setStages: actionCreator<GameMap[]>('SET_STAGES'),
  setMine: actionCreator<GameMap[]>('SET_MINE'),
  setOurs: actionCreator<GameMap[]>('SET_OURS')
};

const floor = reducerWithImmer(initialState)
  .case(actions.setFloor, (draft, payload) => {
    draft.selected = payload;
  })
  .case(actions.setStages, (draft, payload) => {
    draft.stages = payload;
  })
  .case(actions.setMine, (draft, payload) => {
    draft.mine = payload;
  })
  .case(actions.setOurs, (draft, payload) => {
    draft.ours = payload;
  })
  .toReducer();

export default floor;

export const reducers = {
  floor
};

export const epic = combineEpics();
