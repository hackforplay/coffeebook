import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithImmer } from './reducerWithImmer';
import { User } from './types';

export const initialState = {
  collaborators: [] as User[]
};

const actionCreator = actionCreatorFactory('gamebook');

export const actions = {
  setCollaborators: actionCreator<User[]>('SET_COLLABORATORS')
};

const user = reducerWithImmer(initialState)
  .case(actions.setCollaborators, (draft, payload) => {
    draft.collaborators = payload;
  })
  .toReducer();

export default user;

export const reducers = {
  user
};

export const epic = combineEpics();
