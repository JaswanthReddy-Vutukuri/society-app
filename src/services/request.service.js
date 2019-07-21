import { handleResponse } from '../helpers';

export const requestService = {
    createRequest
};

function createRequest(reqData) {
    const apiUrl = 'http://api.magunta.in/api'
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
