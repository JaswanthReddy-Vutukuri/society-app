import { GET_DISTRICTS } from '../actions/types';

export default function districtReducer(state = [], action) {
  switch (action.type) {
    case GET_DISTRICTS:
      return action.districts;
    default:
      return state;
  }
}