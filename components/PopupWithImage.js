import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;

  }

  openPopup ({ name, link }) {
    super.openPopup();
    this._popupSelector.querySelector('.popup-image__title').textContent = name;
    this._popupSelector.querySelector('.popup-image__picture').src = link;
    this._popupSelector.querySelector('.popup-image__picture').alt = name;
   }

}

