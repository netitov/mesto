export default class Card {
  constructor(card, elementTemplate, handleCardClick, userId, {handlePopupDelete, setLike}) {
    this._name = card.name;
    this._link = card.link;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handlePopupDelete = handlePopupDelete;
    this._card = card;
    this._setLike = setLike;
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
    this._likeSum = this._cardElement.querySelector('.elements__like-counter');
    this._likeIcon = this._cardElement.querySelector('.elements__like');

    this._cardImg.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardTitle.alt = this._name;


    if (this._card.owner._id === this._userId) {
      this._deletetBtn.classList.add('elements__del_active');
    }

    this._likeSum.textContent = this._card.likes.length
    this._isLiked()
    this._setEventListeners();

    return this._cardElement;

  }


  _setEventListeners() {
    this._likeIcon.addEventListener('click', (evt) => {
      this._setLike(evt, this._card, this._likeSum)});
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


  _isLiked() {
    this._card.likes.forEach((likeOwner) => {
      if (likeOwner._id === this._userId) {
        this._likeIcon.classList.add('elements__like_active');
      }
    })
  }
}
