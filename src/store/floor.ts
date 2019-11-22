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
  maps: [] as GameMap[]
};

const actionCreator = actionCreatorFactory('gamebook');

export const actions = {
  setFloor: actionCreator<number>('SET_FLOOR'),
  setStages: actionCreator<GameMap[]>('SET_STAGES'),
  setMaps: actionCreator<GameMap[]>('SET_MAPS')
};

const floor = reducerWithImmer(initialState)
  .case(actions.setFloor, (draft, payload) => {
    draft.selected = payload;
  })
  .case(actions.setStages, (draft, payload) => {
    draft.stages = payload;
  })
  .case(actions.setMaps, (draft, payload) => {
    draft.maps = payload;
  })
  .toReducer();

export default floor;

export const reducers = {
  floor
};

export const epic = combineEpics();
