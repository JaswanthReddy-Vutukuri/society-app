import { handleResponse } from '../helpers';

export const authenticationService = {
    login
};

function login(username, password) {
    const apiUrl = 'http://localhost:4000'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}
