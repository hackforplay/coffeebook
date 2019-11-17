import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithImmer } from './reducerWithImmer';

export const initialState = {
  selected: 1
};

const actionCreator = actionCreatorFactory('gamebook');

export const actions = {
  setFloor: actionCreator<number>('SET_FLOOR')
};

const floor = reducerWithImmer(initialState)
  .case(actions.setFloor, (draft, payload) => {
    draft.selected = payload;
  })
  .toReducer();

export default floor;

export const reducers = {
  floor
};

export const epic = combineEpics();
