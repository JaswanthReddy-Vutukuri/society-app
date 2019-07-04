import { GET_CURRENT_USER, SET_CURRENT_USER } from '../actions/types';

export default function userGetterReducer(state = [], action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.currentUser;
    case SET_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
}