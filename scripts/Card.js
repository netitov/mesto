export class Card {
  constructor(card, cardSelector, openPopup, popupImg, popupPicTitle, popupPicSrc) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._popupImg = popupImg;
    this._popupPicTitle = popupPicTitle;
    this._popupPicSrc = popupPicSrc;
  }

  _getTemplate() { 
    const cardElement = document
      .querySelector('#cardsTemplate')
      .content
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImg = this._cardElement.querySelector('.elements__img');
    this._cardImg.src = this._link;
    this._cardElement.querySelector('.elements__title').textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.elements__like').addEventListener('click', this._handleLikeIcon);
    this._cardElement.querySelector('.elements__del').addEventListener('click', this._handleDeleteCard);
    this._cardImg.addEventListener('click', () => this._previewCards());    
  }


  _handleLikeIcon(evt) {
    evt.target.classList.toggle('elements__like_active')
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.elements__element').remove(); 
  }

  _previewCards() {
    this._openPopup(this._popupImg);
    this._popupPicTitle.textContent = this._name;
    this._popupPicSrc.src = this._link;
    this._popupPicSrc.setAttribute('alt', `Изображение ${this._name}`);
  }

} 