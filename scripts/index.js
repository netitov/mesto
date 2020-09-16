const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-btn');

const nameInput = popup.querySelector('.popup__text_name');
const jobInput = popup.querySelector('.popup__text_occupation');
const nameProfile = document.querySelector('.profile__name');
const occupationProfile = document.querySelector('.profile__occupation');
//const popupList = Array.from(document.querySelectorAll('.popup'));
const editProfileForm = document.querySelector('.popup__form_profile')
const cardAddPopup = document.querySelector('.popup__form_card')

const elementContainer = document.querySelector('.elements')

const popupImg = document.querySelector('.popup-image');
const popupPicTitle = popupImg.querySelector('.popup-image__title');
const popupPicSrc = popupImg.querySelector('.popup-image__picture');

const popupImgСlose = document.querySelector('.popup-image__close-btn');
const elementTemplate = document.querySelector('#cardsTemplate');

const addCardValidator = new FormValidator(elementList, cardAddPopup);
const editProfileValidator = new FormValidator(elementList, editProfileForm);



//Функция открытия всех попапов
const openPopup = (element) => {
  element.classList.add('popup_opened');
  document.addEventListener('mousedown', removePopupOverley);  
  document.addEventListener('keydown', removePopupEsc); 
}


//Функция закрытия всех попапов
const removePopup = (element) => {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', removePopupEsc);
  document.removeEventListener('mousedown', removePopupOverley);
}


//Функция закрытия всех попапов по оверлей
const removePopupOverley = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup_opened')) {
    removePopup(activePopup)}
}


//Функция закрытия всех попапов по Esc
const removePopupEsc = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    removePopup(activePopup);
  }
}

popupEditButton.addEventListener('click', () => {
  openPopup(popup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
  editProfileValidator.resetPopup(popup);
});


popupCloseButton.addEventListener('click', function () {
  removePopup(popup) 
});


const formElement = document.querySelector('.popup__container');
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = jobInput.value;
    removePopup(popup);
}

formElement.addEventListener('submit', formSubmitHandler);


const initialCards = [
  {
      name: 'Карелия',
      link: 'https://images.unsplash.com/photo-1573156667488-5c0cec674762?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Омск',
      link: 'https://images.unsplash.com/photo-1575457180622-9ca8a083c50a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1411&q=80'
  },
  {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1551709076-89f2499d383b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//Функция Рендер карточек
const renderCards = (el, card) => {
  const cardClass = new Card(card, elementTemplate, openPopup, popupImg, popupPicTitle, popupPicSrc);
  const cardElement = cardClass.generateCard();
  el.prepend(cardElement);
}


//Добавление карточек из массива
const addCards = (initialCards) => {
  initialCards.forEach((card) => {
    renderCards(elementContainer, card);
  });
}


//Открытие и закрытие попап добавления карточек
const popupCard = document.querySelector('.popup_card');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');

popupAddButton.addEventListener('click', function () {
  addCardValidator.resetPopup(popupCard);
  openPopup(popupCard)
});

popupCardCloseButton.addEventListener('click', function () {
  removePopup(popupCard)});
popupImg.addEventListener('click', function () {
  removePopup(popupImg)
});

addCards(initialCards)

//Добавление новой карточки


function handleSubmitCard(evt) {
  evt.preventDefault();
  const card = {
    name: document.querySelector('.popup__text_place').value,
    link: document.querySelector('.popup__text_link').value
  }
  renderCards(elementContainer, card);
  removePopup(popupCard);
  cardAddPopup.reset();
}

cardAddPopup.addEventListener('submit', handleSubmitCard);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();


import { Card } from './Card.js'
import { elementList, FormValidator } from './FormValidator.js'



