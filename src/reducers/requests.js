import { SET_REQUESTS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case SET_REQUESTS:
      return action.requests;
    default:
      return state;
  }
}