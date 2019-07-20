import { GET_MANDALS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case GET_MANDALS:
      return action.mandals;
    default:
      return state;
  }
}