import './index.css'
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
const profilePopup = new PopupWithForm(popup, handleSubmitForm);
const cardPopup = new PopupWithForm(popupCard, handleSubmitCard);//cardAddPopup
const imagePopup = new PopupWithImage(popupImg);
const userData = new UserInfo(nameProfile, occupationProfile);

const cardsList = new Section ({
  data: initialCards,
  renderer: (data) => {
    addCards(data);
  }
 }, elementContainer)


//Редактирование профиля
function handleSubmitForm () {
  userData.setUserInfo(nameInput, jobInput);
  profilePopup.closePopup();
}


//Отрытие попап профиля
function openProfile () {
  profilePopup.openPopup();
  const profileValues = userData.getUserInfo();
  nameInput.value = profileValues.name;
  jobInput.value = profileValues.occupation;
  editProfileValidator.resetPopup(popup);
}


//Добавление карточек
function addCards(card) {
  const cardClass = new Card(card, '#cardsTemplate', handleCardClick);
  const cardElement = cardClass.generateCard();
  cardsList.addItem(cardElement);
}


//Добавление новой карточки
function handleSubmitCard(card) {

  const cards = {
    name: cardAddInputText.value,
    link: cardAddInputLink.value
  }
  addCards(cards);
  cardPopup.closePopup();
}


//Превью карточки
function handleCardClick (name, link) {
  imagePopup.openPopup(name, link)
}

popupEditButton.addEventListener('click', openProfile);

popupAddButton.addEventListener('click', function () {
  addCardValidator.resetPopup(popupCard);
  cardPopup.openPopup();
});


profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();


addCardValidator.enableValidation();
editProfileValidator.enableValidation();

cardsList.renderItems();







