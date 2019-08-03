import { handleResponse } from '../helpers';
import apiUrl from '../config';

export const userService = {
    createUser,
    getUsers
};

function createUser(userData) {
    // const apiUrl = 'http://api.magunta.in/api'
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


function getUsers() {
    // const apiUrl = 'http://api.magunta.in/api'
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/User/GetAll`, requestOptions)
        .then(handleResponse)
        .then(users => {
            return users;
        });
}
