import { handleResponse } from '../helpers';

export const userService = {
    createUser
};

function createUser(userData) {
    const apiUrl = 'http://api.magunta.in/api'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    return fetch(`${apiUrl}/User/Add`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}
