export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json() //обязательно ретерн при зен
      }
      return Promise.reject('Some error')
    });
  }

  saveNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) {
        return res.json() //make in seperate function?
      }
      return Promise.reject('Some error')
    });
  }

}


