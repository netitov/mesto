export default class UserInfo {
  constructor ({ nameSelector, occupationSelector }) {
    this._nameSelector = nameSelector;
    this._occupationSelector = occupationSelector;
  }

  getUserInfo () {
    this._ProfileValues = {};
    this._ProfileValues.name = this._nameSelector.textContent;
    this._ProfileValues.value = this._occupationSelector.textContent;

    return this._ProfileValues;
  }

  setUserInfo (input) {
    this._nameSelector = input.name;
    this._occupationSelector = input.occupationSelector;
  }

}
