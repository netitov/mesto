import Card from '../components/Card.js'
import { elementList, FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import {
  popup,
  popupEditButton,
  popupCloseButton,
  nameInput,
  jobInput,
  nameProfile,
  occupationProfile,
  editProfileForm,
  cardAddPopup,
  elementContainer,
  popupImg,
  popupPicTitle,
  popupPicSrc,
  formElement,
  popupCard,
  popupAddButton,
  popupCardCloseButton,
  cardAddInputText,
  cardAddInputLink,
  initialCards
 } from '../utils/constants.js'


const addCardValidator = new FormValidator(elementList, cardAddPopup);
const editProfileValidator = new FormValidator(elementList, editProfileForm);
const profilePopup = new PopupWithForm(popup, hanldeSubmitForm);
const cardPopup = new PopupWithForm(popupCard, handleSubmitCard);
const imagePopup = new PopupWithImage(popupImg);
const userData = new UserInfo({ nameInput, jobInput });

const cardsList = new Section ({
  data: initialCards,
  renderer: (card) => {
    addCards(card);
  }
 }, elementContainer)


//Редактирование профиля
const hanldeSubmitForm = (input) => {
  userData.setUserInfo(input);
  profilePopup.closePopup()
}

//Добавление новой карточки
const handleSubmitCard = (evt) => {
  evt.preventDefault();
  addCards(card);
  popupCard.closePopup();
}

//Добавление карточек
const addCards = (card) => {
  const cardClass = new Card(card, '#cardsTemplate', openPopup, popupImg, popupPicTitle, popupPicSrc, handleCardClick);
  const cardElement = cardClass.generateCard();
  cardsList.addItem(cardElement)
}

//Превью карточки
const handleCardClick = (name, link) => {
  imagePopup.openPopup(name, link)
}


//Отрытие попап профиля
const openProfile = () => {
  profilePopup.openPopup();
  userData.getUserInfo();
  editProfileValidator.resetPopup(popup);
}

/*//Отрытие попап добавление карточки
const cardPopup = () => {
  cardPopup.openPopup();
  userData.getUserInfo();
  editProfileValidator.resetPopup(popup);
}*/

popupEditButton.addEventListener('click', openProfile());

popupAddButton.addEventListener('click', function () {
  addCardValidator.resetPopup(popupCard);
  cardPopup.openPopup();
});


popupCloseButton.addEventListener('click', function () {
  removePopup(popup)
});

//formElement.addEventListener('submit', hanldeSubmitForm);

/*
popupCardCloseButton.addEventListener('click', function () {
  removePopup(popupCard)});
popupImg.addEventListener('click', function () {
  removePopup(popupImg)
});*/

//cardAddPopup.addEventListener('submit', handleSubmitCard);


profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();


addCardValidator.enableValidation();
editProfileValidator.enableValidation();

addCards(initialCards);

cardsList.renderItems();






