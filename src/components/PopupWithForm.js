import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor (popupSelector, hanldeSubmitForm) {
    super(popupSelector);
    this._hanldeSubmitForm = hanldeSubmitForm;
    this._formElement = this._popupSelector.querySelector('.popup__form');
    this._popupSbtBtn = this._formElement.querySelector('.popup__btn');
    this._initialSbtBtn = this._popupSbtBtn.textContent;
  }


  _getInputValues () {
    this._inputList = this._formElement.querySelectorAll('.popup__text');

    this._formValues = {};
    this._inputList.forEach(input => {this._formValues[input.name] = input.value});
    return this._formValues;
  }


  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
       this._hanldeSubmitForm(this._getInputValues());
    })
  }


  closePopup () {
    super.closePopup();
    this._formElement.reset();
  }


  renderLoading(isLoading) {
    if (isLoading) {
      this._popupSbtBtn.textContent = 'Сохранение...';
    } else {
      this._popupSbtBtn.textContent = this._initialSbtBtn;
    }
  }

}


