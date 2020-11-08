export default class UserInfo {
  constructor (profileName, profileOccupat, profileAvatar) {
    this._profileName = profileName;
    this._profileOccupat = profileOccupat;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo () {
    this._profileValues = {};
    this._profileValues.name = this._profileName.textContent;
    this._profileValues.occupation = this._profileOccupat.textContent;

    return this._profileValues;
  }

  setUserInfo (inputValues, _id) {
    this.id = _id;
    this._profileName.textContent = inputValues.name;
    this._profileOccupat.textContent = inputValues.about;
    this._profileAvatar.src = inputValues.avatar;
  }


}
