import { handleResponse } from '../helpers';
import apiUrl from '../config';

export const requestService = {
    createRequest,
    getRequestCounts
};

// const apiUrl = 'http://api.magunta.in/api'

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