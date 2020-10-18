export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject('Some error')
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then((res) => {
      return this._checkServerResponse(res)
    });
  }

    saveNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      return this._checkServerResponse(res)
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._checkServerResponse(res)
    });
  }


  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      return this._checkServerResponse(res)
    });
  }

  saveUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      return this._checkServerResponse(res)
    });
  }

  saveAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      return this._checkServerResponse(res)
    });
  }



}


