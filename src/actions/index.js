import { GET_CURRENT_USER, SET_CURRENT_USER, LOG_OUT } from './types';

export const getCurrentUser = () => {
    let currentUser = null;
    return {
        type: GET_CURRENT_USER,
        currentUser
    }
}

export const setCurrentUser = (currentUser) => {
    return {
        type: SET_CURRENT_USER,
        currentUser
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT,
        currentUser: null
    }
}