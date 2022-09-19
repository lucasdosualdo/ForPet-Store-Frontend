import axios from "axios";

const BASE_URL = "http://localhost:5000";

function postSignIn(body) {
  return axios.post(`${BASE_URL}/sign-in`, body);
}

function getSession(token) {
  return axios.get(`${BASE_URL}/session`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function postSignUp(body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}

function deleteLogout(token) {
  return axios.delete(`${BASE_URL}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getItems(token, filter) {
  return axios.get(`${BASE_URL}/items${filter}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function postFavorite(token, body) {
  return axios.post(`${BASE_URL}/favorites`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getFavorites(token) {
  return axios.get(`${BASE_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function postPurchase(token, body) {
  return axios.post(`${BASE_URL}/purchase`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function postCart(token, body) {
  return axios.post(`${BASE_URL}/cart`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getCart(token) {
  return axios.get(`${BASE_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteItem(token, id) {
  return axios.delete(`${BASE_URL}/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function decrementItem(token, body) {
  return axios.put(`${BASE_URL}/cartitem`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getCathegories(token, pet) {
  return axios.get(`${BASE_URL}/cathegories/${pet}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getHistory(token) {
  return axios.get(`${BASE_URL}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getOrder(token, id) {
  return axios.get(`${BASE_URL}/order/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export {
  postSignIn,
  getSession,
  postSignUp,
  deleteLogout,
  getItems,
  postFavorite,
  getFavorites,
  getCathegories,
  getHistory,
  getOrder,
  postPurchase,
  postCart,
  getCart,
  deleteItem,
  decrementItem,
};
