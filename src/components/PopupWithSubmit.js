import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector, hanldeSubmitForm) {
    super(popupSelector);
    this._hanldeSubmitForm = hanldeSubmitForm;
    this._formElement = this._popupSelector.querySelector('.popup__form');
  }

  /*setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
       this._hanldeSubmitForm();
    })
  }*/

  openPopup(element, data) {
    super.openPopup();
    this._element = element;
    this._data = data;
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
       this._hanldeSubmitForm(this._element, this._data);
    })
  }

}
