class Auth {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }
  
    registration({ email, password }) {
      return fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({ email, password }),
      }).then(this._checkResponse);
    }
  
    authorization({ email, password }) {
      return fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then(this._checkResponse);
    }
  
    checkToken(token) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  }
  
  const auth = new Auth('https://api.mest0.students.nomoredomainsicu.ru');
  
  export default auth;