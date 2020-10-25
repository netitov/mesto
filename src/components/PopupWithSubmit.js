import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._formElement = this._popupSelector.querySelector('.popup__form');
  }

  openPopup(element, data) {
    super.openPopup();
    this._element = element;
    this._data = data;
  }

  removeCard() {
    this._cardElement.remove();
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', () => {
      this._handleDeleteCard(this._element, this._data);
    })
  }
}

