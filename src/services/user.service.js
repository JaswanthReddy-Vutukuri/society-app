import { authHeader, handleResponse } from '../helpers';

const apiUrl = 'http://localhost:4000';

export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}