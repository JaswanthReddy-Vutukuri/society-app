import { combineReducers } from 'redux';
import currentUser from './users';
import requests from './requests';
import requestsCount from './requests-count';

export default combineReducers({
    currentUser : currentUser,
    requests    : requests,
    requestsCount: requestsCount
});