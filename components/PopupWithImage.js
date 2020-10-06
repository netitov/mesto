import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._name = this._popupSelector.querySelector('.popup-image__title');
    this._link = this._popupSelector.querySelector('.popup-image__picture');

  }

  openPopup (name, link) {
    super.openPopup();
    this._name.textContent = name;
    this._link.src = link;
    this._name.alt = name;
   }

}

