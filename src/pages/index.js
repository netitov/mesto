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
  nameInput,
  jobInput,
  nameProfile,
  occupationProfile,
  editProfileForm,
  cardAddPopup,
  elementContainer,
  popupImg,
  popupCard,
  popupAddButton,
  cardAddInputText,
  cardAddInputLink,
  popupWithSubmitForm,
  avatarProfile,
  popupAvatar,
  avatarInputLink,
  avatarProfileSrc
 } from '../utils/constants.js'


const addCardValidator = new FormValidator(elementList, cardAddPopup);
const popupAvatarValidator = new FormValidator(elementList, popupAvatar);
const editProfileValidator = new FormValidator(elementList, editProfileForm);
const profilePopup = new PopupWithForm(popup, handleSubmitForm);
const cardPopup = new PopupWithForm(popupCard, handleSubmitCard);//cardAddPopup
const imagePopup = new PopupWithImage(popupImg);
const userData = new UserInfo(nameProfile, occupationProfile, avatarProfileSrc);
//const submitPopup = new PopupWithSubmit(popupWithSubmitForm, handleDeleteCard);
const submitPopup = new PopupWithSubmit(popupWithSubmitForm, handleDeleteCard);
const avatarPopup = new PopupWithForm(popupAvatar, handleSubmitAvatar);


const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '26c6e873-4075-4038-96d8-f1cc54cdc871',
    'content-type': 'application/json'
  }
});


let userId = '';

api.getUserData()
  .then((data) => {
    const userDatas = data;
    userId = data._id
  })



const initCards = api.getInitialCards()
const userDataFromServer = api.getUserData();


const cardsList = new Section ({
  data: initCards,
  renderer: (data) => {
    addCards(data);
  }
 }, elementContainer)


//Add profile data from server
userDataFromServer.then((dataUser) => {
  userData.setUserInfo(dataUser)
})
.catch((error) => console.log(error))


//rendering Cards from server
initCards.then((data) => {
  const cardsLists = new Section ({
    items: data,
    renderer: (items) => {
      addCards(items);
    }
   }, elementContainer);
   cardsLists.renderItems();
})
.catch((error) => console.log(error))


//Change Profile data callBack
function handleSubmitForm (data) {
  const inputValues = {
    name: nameInput.value,
    about: jobInput.value
  }
  api.saveUserData(inputValues)
    .then((inputValues) => {
      userData.setUserInfo(inputValues);
      profilePopup.closePopup();
    })
    .catch((error) => console.log(error))
}

//Change avatar callback
function handleSubmitAvatar(data) {
  const inputValue = {
    avatar: avatarInputLink.value
  }
  api.saveAvatar(inputValue)
    .then((inputValue) => {
      userData.setUserInfo(inputValue);
      avatarPopup.closePopup();
    })
    .catch((error) => console.log(error))
}


//Отрытие попап профиля
function openProfile () {
  profilePopup.openPopup();
  const profileValues = userData.getUserInfo();
  nameInput.value = profileValues.name;
  jobInput.value = profileValues.occupation;
  editProfileValidator.resetPopup(popup);
}


//Delete cards
function handleDeleteCard(element, cardId) {
  api.deleteCard(cardId)
    .then(() =>{
      element.remove();
      element = null;
      submitPopup.closePopup();
    })
    .catch((error) => console.log(error))
}

//test add new card
function addCards(card) {
  const cardClass = new Card(card, '#cardsTemplate', handleCardClick, userId, {
    handlePopupDelete: (cardElement) => {
      submitPopup.openPopup(cardElement, card._id);
    }
  });
  const cardElement = cardClass.generateCard();
  cardsList.addItem(cardElement);
}


//Добавление новой карточки NEW
function handleSubmitCard() {
  const cards = {
    name: cardAddInputText.value,
    link: cardAddInputLink.value
  }
    api.saveNewCard(cards)
    .then((card) => {
      addCards(card);
      cardPopup.closePopup();
    })
    .catch((error) => console.log(error))
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

avatarProfile.addEventListener('click', function () {
  avatarPopup.openPopup();
});

/*popupEditButton.addEventListener('click', function () {
  submitPopup.openPopup();
});*/


profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();
submitPopup.setEventListeners();
avatarPopup.setEventListeners();



addCardValidator.enableValidation();
editProfileValidator.enableValidation();
popupAvatarValidator.enableValidation();


//cardsList.renderItems();








