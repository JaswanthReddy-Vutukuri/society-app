import { handleResponse } from '../helpers';
import apiUrl from '../config';

export const userService = {
    createUser,
    getUsers,
    getUsersByRole
};

function createUser(userData) {
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
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/User/GetAll`, requestOptions)
        .then(handleResponse)
        .then(users => {
            return users;
        });
}


function getUsersByRole(role) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/User/GetUsersBasedOnRole?Role=${role}`, requestOptions)
        .then(handleResponse)
        .then(users => {
            return users;
        });
}
