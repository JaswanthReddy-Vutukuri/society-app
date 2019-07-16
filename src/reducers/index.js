import { combineReducers } from 'redux';
import currentUser from './users';
import districts from './districts';
import constituencies from './constituencies';

export default combineReducers({
    currentUser : currentUser,
    districts   : districts,
    constituencies: constituencies
});