class Api {
    constructor({ url }) {
    this._url = url;
  }

  receiveUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Authorization" : `Bearer ${token}`,
      },
    })
      .then(this._checkingResponse);
  }

  receiveCardsInfo(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        "Authorization" : `Bearer ${token}`,
      },
    })
      .then(this._checkingResponse);
  }

  editProfileInfo(info, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(info),
    })
      .then(this._checkingResponse);
  }

  createNewCard(info, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(info),
    })
      .then(this._checkingResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`,
      },
    })
      .then(this._checkingResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token){
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method,
      headers: {
        "Authorization" : `Bearer ${token}`,
      },
    })
    .then(this._checkingResponse);
  }

  changeAvatar(info, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(info),
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
  url: 'https://api.mest0.students.nomoredomainsicu.ru',
});

export default api;