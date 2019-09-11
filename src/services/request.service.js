import { handleResponse } from '../helpers';
import apiUrl from '../config';

export const requestService = {
    createRequest,
    getRequestCounts,
    getRequests,
    SaveEmployeeFeedback,
    SaveRepresentativeFeedback,
    SaveInchargeFeedback,
    SaveAdminFeedback,
    SaveRepresentativeComments
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
      "Index": reqParams.index ? reqParams.index : null,
      "Count": reqParams.count ? reqParams.count : null,
      "SortType": reqParams.sortType ? reqParams.sortType : null,
      "SortBy": reqParams.sortBy ? reqParams.sortBy : null,
      "VillageID": reqParams.villageID ? reqParams.villageID : null,
      "ConstituencyID": reqParams.ConstituencyID ? reqParams.ConstituencyID : null,
      "MandalID": reqParams.MandalID ? reqParams.MandalID : null,
      "DistrictID": reqParams.DistrictID ? reqParams.DistrictID : null,
      "TicketNumber": reqParams.TicketNumber ? reqParams.TicketNumber : null,
      "InActive": reqParams.InActive ? reqParams.InActive : false
    }
    reqData.Status = (reqParams.reqStatus && !reqParams.Status) ? (JSON.parse(localStorage.getItem('currentUser')).Role.substring(0,3) +'_'+reqParams.reqStatus) : reqParams.Status;
    reqData.Role = reqParams.Role ? reqParams.reqStatus : JSON.parse(localStorage.getItem('currentUser')).Role;

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

function SaveEmployeeFeedback (reqParams) {
    
    reqParams.CreatedbyUserID = JSON.parse(localStorage.getItem('currentUser')).UserID;
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqParams)
    };

    return fetch(`${apiUrl}/Requests/SaveEmployeeFeedback`, requestOptions)
        .then(handleResponse)
        .then(status => {
            return status;
        });
}

function SaveRepresentativeFeedback (reqParams) {
    
    reqParams.CreatedUserID = JSON.parse(localStorage.getItem('currentUser')).UserID;
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqParams)
    };

    return fetch(`${apiUrl}/Requests/SaveRepresentativeFeedback`, requestOptions)
        .then(handleResponse)
        .then(status => {
            return status;
        });
}

function SaveInchargeFeedback (reqParams) {
    
    reqParams.CreatedUserID = JSON.parse(localStorage.getItem('currentUser')).UserID;
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqParams)
    };

    return fetch(`${apiUrl}/Requests/SaveInchargeFeedback`, requestOptions)
        .then(handleResponse)
        .then(status => {
            return status;
        });
}

function SaveRepresentativeComments (reqParams) {
    
    reqParams.CreatedUserID = JSON.parse(localStorage.getItem('currentUser')).UserID;
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqParams)
    };

    return fetch(`${apiUrl}/Requests/SaveRepresentativeComment`, requestOptions)
        .then(handleResponse)
        .then(status => {
            return status;
        });
}


function SaveAdminFeedback (reqParams) {
    
    reqParams.AssignedUserID = JSON.parse(localStorage.getItem('currentUser')).UserID;
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqParams)
    };
    

    return fetch(`${apiUrl}/Requests/AssignRequestToSponser`, requestOptions)
        .then(handleResponse)
        .then(status => {
            return status;
        });
}
