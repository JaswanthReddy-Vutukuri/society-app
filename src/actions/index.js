import { GET_CURRENT_USER, SET_CURRENT_USER, LOG_OUT, GET_DISTRICTS, GET_CONSTITUENCIES } from './types';
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

export const getDistricts = () => {
    return (dispatch) => {
      return axios.get('http://api.magunta.in/api/MasterData/GetDistricts')
        .then(response => {
          dispatch(onDistricts(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
};
  
export const onDistricts = (districts) => {
    return {
        type: GET_DISTRICTS,
        districts
    }
}

export const getConstituencies = () => {
    return (dispatch) => {
      return axios.get('http://api.magunta.in/api/MasterData/GetConstituencies')
        .then(response => {
          dispatch(onConstituencies(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
};
  
export const onConstituencies = (constituencies) => {
    return {
        type: GET_CONSTITUENCIES,
        constituencies
    }
}