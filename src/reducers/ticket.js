import { CREATE_REQUEST } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case CREATE_REQUEST:
      return action.ticketnumber;
    default:
      return state;
  }
}