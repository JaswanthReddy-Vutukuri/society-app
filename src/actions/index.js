import { GET_CURRENT_USER, SET_CURRENT_USER, LOG_OUT, GET_DISTRICTS, GET_CONSTITUENCIES, GET_MANDALS, GET_VILLAGES, CREATE_REQUEST, GET_REQUESTS } from './types';
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
        throw (error);
      });
  };
};

export const onDistricts = (districts) => {
  return {
    type: GET_DISTRICTS,
    districts
  }
}

export const getMandals = (id) => {
  return (dispatch) => {
    return axios.get(`http://api.magunta.in/api/MasterData/GetMandals?districtID=${id}`)
      .then(response => {
        dispatch(onMandals(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const onMandals = (mandals) => {
  return {
    type: GET_MANDALS,
    mandals
  }
}

export const getVillages = (id) => {
  return (dispatch) => {
    return axios.get(`http://api.magunta.in/api/MasterData/GetVillages?mandalID=${id}`)
      .then(response => {
        dispatch(onVillages(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const onVillages = (villages) => {
  return {
    type: GET_VILLAGES,
    villages
  }
}

export const getConstituencies = () => {
  return (dispatch) => {
    return axios.get('http://api.magunta.in/api/MasterData/GetConstituencies')
      .then(response => {
        dispatch(onConstituencies(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const onConstituencies = (constituencies) => {
  return {
    type: GET_CONSTITUENCIES,
    constituencies
  }
}

export const createRequest = (reqData) => {
  return (dispatch) => {
    return axios('http://api.magunta.in/api/Requests/Save', {
      method: 'POST',
      data: reqData,
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response);
      dispatch(onRequestSuccess(response.data))
    }).catch(function (error) {
      console.log(error);
    });
  }
}

export const onRequestSuccess = (ticketnumber) => {
  return {
    type: CREATE_REQUEST,
    ticketnumber
  }
}

export const getRequests = (reqParams) => {
  console.log(reqParams)
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
      console.log(response);
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