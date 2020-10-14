import './index.css'
import Card from '../components/Card.js'
import { elementList, FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import Api from '../components/Api.js'
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
  initialCards,
  popupWithSubmitForm,
  deleteButton
 } from '../utils/constants.js'


const addCardValidator = new FormValidator(elementList, cardAddPopup);
const editProfileValidator = new FormValidator(elementList, editProfileForm);
const profilePopup = new PopupWithForm(popup, handleSubmitForm);
const cardPopup = new PopupWithForm(popupCard, handleSubmitCard);//cardAddPopup
const imagePopup = new PopupWithImage(popupImg);
const userData = new UserInfo(nameProfile, occupationProfile);
const submitPopup = new PopupWithSubmit(popupWithSubmitForm, handleSubmitForm);//CORRECT!

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '26c6e873-4075-4038-96d8-f1cc54cdc871',
    'content-type': 'application/json'
  }
});



//rendering Cards from server
const initCards = api.getInitialCards();

initCards.then((data) => {
  const cardsLists = new Section ({
    items: data,
    renderer: (items) => {
      addCards(items);
    }
   }, elementContainer, api);
   cardsLists.renderItems();
})
.catch((error) => alert(error))//show error if something wrong


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

//test add new card
function addCards(card) {
  const cardClass = new Card(card, '#cardsTemplate', handleCardClick);
  const cardElement = cardClass.generateCard();
  cardsList.addItem(cardElement);
}


/*//Добавление новой карточки
function handleSubmitCard(card) {

  const cards = {
    name: cardAddInputText.value,
    link: cardAddInputLink.value
  }
  addCards(cards);
  cardPopup.closePopup();
}*/

function handleSubmitCard(card) {
  const cards = {
    name: cardAddInputText.value,
    link: cardAddInputLink.value
  }
  api.saveNewCard(cards)
    .then((data) => {
      addCards(cards);
      cardPopup.closePopup();
    })
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

/*popupEditButton.addEventListener('click', function () {
  submitPopup.openPopup();
});*/


profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();
submitPopup.setEventListeners();


addCardValidator.enableValidation();
editProfileValidator.enableValidation();

//cardsList.renderItems();









