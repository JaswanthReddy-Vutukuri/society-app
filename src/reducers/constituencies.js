import { GET_CONSTITUENCIES } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_CONSTITUENCIES:
      return action.constituencies;
    default:
      return state;
  }
}