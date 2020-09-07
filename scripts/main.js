const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-btn');

const nameInput = popup.querySelector('.popup__text_name');
const jobInput = popup.querySelector('.popup__text_occupation');
const nameProfile = document.querySelector('.profile__name');
const occupationProfile = document.querySelector('.profile__occupation');
const popupList = Array.from(document.querySelectorAll('.popup'));


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
  resetPopup(popup, {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_visible' 
  });
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

 //Переменные Увеличение фото
  const popupImg = document.querySelector('.popup-image');
  const popupPicTitle = popupImg.querySelector('.popup-image__title');
  const popupPicSrc = popupImg.querySelector('.popup-image__picture');

const elementContainer = document.querySelector('.elements')

//Функция добавления лайков
const handleLikeIcon = (event) => {
  event.target.classList.toggle('elements__like_active')
}

//Функция удаление карточек
const handleDeleteCard = (el) => {
  el.remove();
}

//Функция Рендер карточек
const renderCards = (el, card) => {
  el.prepend(getCard(card));
}


//Функция превью карточки
const previewCards = (card) => {
  openPopup(popupImg);
  popupPicTitle.textContent = card.name;
  popupPicSrc.src = card.link;
  popupPicSrc.setAttribute('alt', `Изображение ${card.name}`);
}


const popupImgСlose = document.querySelector('.popup-image__close-btn');
const elementTemplate = document.querySelector('#cardsTemplate').content;


//Функция создание разметки карточки
const getCard = (card) => {
  
  const cardsList = elementTemplate.cloneNode(true);

  const cardImg = cardsList.querySelector('.elements__img');

  cardsList.querySelector('.elements__title').textContent = card.name
  cardImg.src = card.link

  
  const likeButton = cardsList.querySelector('.elements__like');
  const deleteButton = cardsList.querySelector('.elements__del');
  const deleteCard = deleteButton.closest('.elements__element')
  cardImg.setAttribute('alt', 'Добавленное изображение')


  likeButton.addEventListener('click', handleLikeIcon);
  deleteButton.addEventListener('click', function () {
   handleDeleteCard(deleteCard)});
  cardImg.addEventListener('click', function () {
    previewCards(card)
  });

  return cardsList
 }


//Добавление карточек из массива
function addCards(initialCards) {
  initialCards.forEach((card) => {
    renderCards(elementContainer, card);
  });
}


//Открытие и закрытие попап добавления карточек
const popupCard = document.querySelector('.popup_card');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');

popupAddButton.addEventListener('click', function () {
  resetPopup(popupCard, {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_visible' 
  });
  openPopup(popupCard)
});

popupCardCloseButton.addEventListener('click', function () {
  removePopup(popupCard)});
popupImg.addEventListener('click', function () {
  removePopup(popupImg)
});

addCards(initialCards)

//Добавление новой карточки
const CardAddPopup = document.querySelector('.popup__form_card')

function handleSubmitCard(evt) {
  evt.preventDefault();
  const card = {
    name: document.querySelector('.popup__text_place').value,
    link: document.querySelector('.popup__text_link').value
  }
  renderCards(elementContainer, card);
  removePopup(popupCard);
  CardAddPopup.reset();
}

CardAddPopup.addEventListener('submit', handleSubmitCard)
