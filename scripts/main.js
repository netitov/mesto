const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-btn');

let nameInput = popup.querySelector('.popup__text_name');
let jobInput = popup.querySelector('.popup__text_occupation');
let name = document.querySelector('.profile__name');
let occupation = document.querySelector('.profile__occupation');

const popupAdd = function () {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = occupation.textContent;
}

const popupRemove = function () {
  popup.classList.remove('popup_opened');
}

const closePopup = function(event) {
  if (event.target !== event.currentTarget) return
  popupRemove(event);
}

popupEditButton.addEventListener('click', popupAdd);
popupCloseButton.addEventListener('click', popupRemove);
popup.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__container');
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    name.textContent = nameInput.value;
    occupation.textContent = jobInput.value;
    popupRemove();
}

formElement.addEventListener('submit', formSubmitHandler);


const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//Добавление карточек при загрузке
const elementContainer = document.querySelector('.elements')

const addCard = (card) => {
  const addElement = document.querySelector('#cardsTemplate').content.cloneNode(true)

  addElement.querySelector('.elements__title').textContent = card.name
  addElement.querySelector('.elements__img').src = card.link

  elementContainer.prepend(addElement)

  //Добавление лайков
  const likeButton = document.querySelector('.elements__like');
  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('elements__like_active')
  })

  //Удаление карточек
  const deleteButton = document.querySelector('.elements__del');
  const cardElement = document.querySelector('.elements__element')
  
  deleteButton.addEventListener('click', function() {
    cardElement.classList.toggle('elements__element_deleted')
  })
  }

initialCards.forEach(addCard)


const popupCard = document.querySelector('.popup_card');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');


const popupCardAdd = function () {
  popupCard.classList.add('popup_opened');
  }

const popupCardRemove = function () {
  popupCard.classList.remove('popup_opened');
}

const closePopupCard = function(event) {
  if (event.target !== event.currentTarget) return
  popupCardRemove(event);
}

popupAddButton.addEventListener('click', popupCardAdd);
popupCardCloseButton.addEventListener('click', popupCardRemove);
popupCard.addEventListener('click', closePopupCard);


//Добавление новой карточки
const CardAddPopup = document.querySelector('.popup__form_card')

CardAddPopup.addEventListener('submit', event => {
  event.preventDefault()

  const newCard = {
    name: document.querySelector('.popup__text_place').value,
    link: document.querySelector('.popup__text_link').value
  }

  addCard(newCard)

  CardAddPopup.reset()

  popupCardRemove();

})


const cardImg = document.querySelector('.popup__image');
//const cardElement = document.querySelector('.elements__element')

cardImg.addEventListener('click', function() {
  cardImg.classList.toggle('elements__img_active')
})
















