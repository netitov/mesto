export default class Card {
  constructor(card, elementTemplate, handleCardClick, userId, {handlePopupDelete}) {
    this._name = card.name;
    this._link = card.link;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handlePopupDelete = handlePopupDelete;
    this._card = card;
  }


  _getTemplate() {
    const cardElement = document
      .querySelector(this._elementTemplate)
      .content
      .cloneNode(true);

    return cardElement;
  }


  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImg = this._cardElement.querySelector('.elements__img');
    this._cardTitle = this._cardElement.querySelector('.elements__title');
    this._deletetBtn = this._cardElement.querySelector('.elements__del');

    this._cardImg.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardTitle.alt = this._name;


    if (this._card.owner._id === this._userId) {
      this._deletetBtn.classList.add('elements__del_active');
    }

    this._setEventListeners();


    return this._cardElement;
  }


  _setEventListeners() {
    this._cardElement.querySelector('.elements__like').addEventListener('click', this._handleLikeIcon);
    this._deletetBtn.addEventListener('click', () => {
      this._handlePopupDelete(this._cardElement)
    });
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }


  _handleLikeIcon(evt) {
    evt.target.classList.toggle('elements__like_active')
  }



  /*handleDeleteCard(evt) {
    evt.target.closest('.elements__element').remove();
  }*/


}
