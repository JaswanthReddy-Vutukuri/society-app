import { GET_CURRENT_USER, SET_CURRENT_USER, LOG_OUT, SET_REQUESTS, SET_REQUESTS_COUNT } from './types';
import { authenticationService } from '../services';

export const getCurrentUser = () => {
  const currentUser = authenticationService.currentUserValue;
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

export const setRequestsCount = (requestsCount) => {
  return {
    type: SET_REQUESTS_COUNT,
    requestsCount
  }
}

export const setRequests = (requests) => {
  return {
    type: SET_REQUESTS,
    requests
  }
}

export const logOut = () => {
  return {
    type: LOG_OUT,
    currentUser: null
  }
}
