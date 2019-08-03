import { combineReducers } from 'redux';
import currentUser from './users';
import requests from "./requests";

export default combineReducers({
    currentUser : currentUser,
    requests    : requests
});