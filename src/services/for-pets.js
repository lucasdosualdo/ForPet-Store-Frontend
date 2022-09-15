import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function postSignIn(body) {
    return axios.post(`${BASE_URL}/sign-in`, body);
}

function getSession(token) {
    return axios.get(`${BASE_URL}/session`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

function postSignUp(body) {
    return axios.post(`${BASE_URL}/sign-up`, body);
}

function deleteLogout(token) {
    return axios.delete(`${BASE_URL}/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

function getItems(token) {
    return axios.get(`${BASE_URL}/items`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export {
    postSignIn,
    getSession,
    postSignUp,
    deleteLogout,
    getItems
};