import { handleResponse } from '../helpers';
import apiUrl from '../config';
// const apiUrl = 'http://api.magunta.in/api'

export const commonService = {
    getDistricts,
    getMandals,
    getVillages,
    getConstituencies
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
