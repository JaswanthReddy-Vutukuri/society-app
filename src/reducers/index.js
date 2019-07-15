import { combineReducers } from 'redux';
import currentUser from './users';
import districts from './districts';

export default combineReducers({
    currentUser : currentUser,
    districts   : districts
});