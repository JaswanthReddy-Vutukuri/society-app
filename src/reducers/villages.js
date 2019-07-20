import { GET_VILLAGES } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case GET_VILLAGES:
      return action.villages;
    default:
      return state;
  }
}