import { handleResponse } from '../helpers';
import apiUrl from '../config';

export const roleService = {
    getRoles
};

function getRoles() {
    // const apiUrl = 'http://api.magunta.in/api'
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/MasterData/GetRoles`, requestOptions)
        .then(handleResponse)
        .then(roles => {
            return roles;
        });
}
