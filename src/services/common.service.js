import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers';

// const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const commonService = {
    getDistricts,
    // logout,
    // currentUser: currentUserSubject.asObservable(),
    // get currentUserValue () { return currentUserSubject.value }
};

function getDistricts() {
    const apiUrl = 'http://api.magunta.in'
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiUrl}/api/MasterData/GetDistricts`, requestOptions)
        .then(handleResponse)
        .then(districts => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user));
            
            // currentUserSubject.next(user);
            return districts;
        });
}

// function logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//     currentUserSubject.next(null);
// }
