import { combineReducers } from 'redux';
import currentUser from './users';
import districts from './districts';
import mandals from './mandals';
import villages from './villages';
import constituencies from './constituencies';
import ticketnumber from './ticket';
import requests from './requests';

export default combineReducers({
    currentUser : currentUser,
    districts   : districts,
    mandals     : mandals,
    constituencies: constituencies,
    villages    : villages,
    ticketnumber: ticketnumber,
    requests    : requests
});