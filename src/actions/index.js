import { GET_CURRENT_USER, SET_CURRENT_USER, LOG_OUT, GET_REQUESTS } from './types';
import { authenticationService } from '../services';
import axios from 'axios';

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

export const logOut = () => {
  return {
    type: LOG_OUT,
    currentUser: null
  }
}

export const getRequests = (reqParams) => {
  const reqData = {
    "UserID": JSON.parse(localStorage.getItem('currentUser')).UserID,
    "Status": reqParams.reqStatus ? reqParams.reqStatus : null,
    "Index": reqParams.index ? reqParams.index : null,
    "Count": reqParams.count ? reqParams.count : null,
    "SortType": reqParams.sortType ? reqParams.sortType : null,
    "SortBy": reqParams.sortBy ? reqParams.sortBy : null,
    "VillageID": reqParams.villageID ? reqParams.villageID : null,
    "ConstituencyID": reqParams.ConstituencyID ? reqParams.ConstituencyID : null,
    "MandalID": reqParams.MandalID ? reqParams.MandalID : null,
    "DistrictID": reqParams.DistrictID ? reqParams.DistrictID : null
  }
  return (dispatch) => {
    return axios('http://api.magunta.in/api/Requests/GetList', {
      method: 'POST',
      data: reqData,
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      dispatch(onRequests(response.data))
    }).catch(function (error) {
      console.log(error);
    });
  }
}

export const onRequests = (requests) => {
  return {
    type: GET_REQUESTS,
    requests
  }
}