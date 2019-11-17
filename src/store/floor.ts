import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithImmer } from './reducerWithImmer';

const name = 'floor';

export interface State {
  selected: number;
}

export interface States {
  [name]: State;
}

export const initialState: State = {
  selected: 1
};

const actionCreator = actionCreatorFactory('gamebook/floor');

export const actions = {
  setFloor: actionCreator<number>('SET_FLOOR')
};

export const reducer = reducerWithImmer(initialState)
  .case(actions.setFloor, (draft, payload) => {
    draft.selected = payload;
  })
  .toReducer();

export const reducers = {
  [name]: reducer
};

export const epic = combineEpics();
