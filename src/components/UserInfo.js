export default class UserInfo {
  constructor (profileName, profileOccupat) {
    this._profileName = profileName;
    this._profileOccupat = profileOccupat;
  }

  getUserInfo () {
    this._profileValues = {};
    this._profileValues.name = this._profileName.textContent;
    this._profileValues.occupation = this._profileOccupat.textContent;

    return this._profileValues;
  }

  setUserInfo (nameInput, jobInput) {
    this._profileName.textContent = nameInput.value;
    this._profileOccupat.textContent = jobInput.value;
  }

}
