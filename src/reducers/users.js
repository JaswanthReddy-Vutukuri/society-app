import { GET_CURRENT_USER, SET_CURRENT_USER, LOG_OUT } from '../actions/types';

export default function userReducer(state = [], action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.currentUser;
    case SET_CURRENT_USER:
      return action.currentUser;
    case LOG_OUT:
      return action.currentUser;
    default:
      return state;
  }
}