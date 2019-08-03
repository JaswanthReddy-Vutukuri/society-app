import { handleResponse } from '../helpers';
import apiUrl from '../config';

export const commonService = {
    getDistricts,
    getMandals,
    getVillages,
    getConstituencies,
    getRoles
};

function getDistricts() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/MasterData/GetDistricts`, requestOptions)
        .then(handleResponse)
        .then(districts => {
            return districts;
        });
}

function getMandals(districtID) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/MasterData/GetMandals?districtID=${districtID}`, requestOptions)
        .then(handleResponse)
        .then(mandals => {
            return mandals;
        });
}

function getVillages(mandalID) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/MasterData/GetVillages?mandalID=${mandalID}`, requestOptions)
        .then(handleResponse)
        .then(villages => {
            return villages;
        });
}

function getConstituencies() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/MasterData/GetConstituencies`, requestOptions)
        .then(handleResponse)
        .then(constituencies => {
            return constituencies;
        });
}

function getRoles() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/MasterData/GetRoles`, requestOptions)
        .then(handleResponse)
        .then(roles => {
            return roles;
        });
}
