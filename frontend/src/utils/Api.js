class Api {
    constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  receiveUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkingResponse);
  }

  receiveCardsInfo() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkingResponse);
  }

  editProfileInfo(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(info)
    })
      .then(this._checkingResponse);
  }

  createNewCard(info) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(info)
    })
      .then(this._checkingResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkingResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token){
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method,
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkingResponse);
  }

  changeAvatar(info, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(info)
    })
      .then(this._checkingResponse);
  }

  _checkingResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

const api = new Api({
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;