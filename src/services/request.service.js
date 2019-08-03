import { handleResponse } from '../helpers';
import apiUrl from '../config';

export const requestService = {
    createRequest,
    getRequestCounts,
    getRequests
};

function createRequest(reqData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
    };

    return fetch(`${apiUrl}/Requests/Save`, requestOptions)
        .then(handleResponse)
        .then(ticketNumber => {
            return ticketNumber;
        });
}

function getRequestCounts(userID) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/Requests/GetCount?userID=${userID}`, requestOptions)
        .then(handleResponse)
        .then(requestCounts => {
            return requestCounts;
        });
}

function getRequests (reqParams) {
    const reqData = {
      "UserID": JSON.parse(localStorage.getItem('currentUser')).UserID,
      "Status": reqParams.reqStatus ? (JSON.parse(localStorage.getItem('currentUser')).Role.substring(0,3) +'_'+reqParams.reqStatus) : null,
      "Index": reqParams.index ? reqParams.index : null,
      "Count": reqParams.count ? reqParams.count : null,
      "SortType": reqParams.sortType ? reqParams.sortType : null,
      "SortBy": reqParams.sortBy ? reqParams.sortBy : null,
      "VillageID": reqParams.villageID ? reqParams.villageID : null,
      "ConstituencyID": reqParams.ConstituencyID ? reqParams.ConstituencyID : null,
      "MandalID": reqParams.MandalID ? reqParams.MandalID : null,
      "DistrictID": reqParams.DistrictID ? reqParams.DistrictID : null
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
    };

    return fetch(`${apiUrl}/Requests/GetList`, requestOptions)
        .then(handleResponse)
        .then(requests => {
            return requests;
        });
}