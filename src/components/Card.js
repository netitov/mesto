export default class Card {
  constructor(card, elementTemplate, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
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

    this._cardImg.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardTitle.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }


  _setEventListeners() {
    this._cardElement.querySelector('.elements__like').addEventListener('click', this._handleLikeIcon);
    this._cardElement.querySelector('.elements__del').addEventListener('click', this._handleDeleteCard);
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle('elements__like_active')
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.elements__element').remove();
  }

}
