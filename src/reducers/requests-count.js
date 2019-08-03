import { SET_REQUESTS_COUNT } from '../actions/types';

export default function(state = 0, action) {
  switch (action.type) {
    case SET_REQUESTS_COUNT:
      return action.requestsCount;
    default:
      return state;
  }
}