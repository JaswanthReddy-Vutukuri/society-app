import { GET_REQUESTS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case GET_REQUESTS:
      return action.requests;
    default:
      return state;
  }
} 