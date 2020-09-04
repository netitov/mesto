const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-btn');

const nameInput = popup.querySelector('.popup__text_name');
const jobInput = popup.querySelector('.popup__text_occupation');
const nameProfile = document.querySelector('.profile__name');
const occupationProfile = document.querySelector('.profile__occupation');

//Функция открытия всех попапов
const popupOpener = (element,cls) => {
  element.classList.add(cls);
}

//Функция закрытия всех попапов по кнопке
const popupRemover = (element,cls) => {
  element.classList.remove(cls);
}

//Функция закрытия всех попапов по оверлей
const popupRemoverOverley = (event,element,cls) => {
  if (event.target !== event.currentTarget)
  return
  popupRemover(element,cls)
}

//Функция закрытия всех попапов по Esc
const popupRemoverEsc = (evt,element,cls) => {
  if (evt.key === 'Escape') {
    element.classList.remove(cls);
  }
}


popupEditButton.addEventListener('click', () => {
  popupOpener(popup,'popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
  document.addEventListener('keydown', function () {
    popupRemoverEsc(event,popup,'popup_opened')
});
});


popupCloseButton.addEventListener('click', function () {
  popupRemover(popup, 'popup_opened') 
});

popup.addEventListener('mousedown', function () {
popupRemoverOverley (event,popup,'popup_opened')
});


const formElement = document.querySelector('.popup__container');
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = jobInput.value;
    popupRemover(popup,'popup_opened');
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
  //el.classList.add('elements__element_inactive')
  el.remove();
}

const popupImgСlose = document.querySelector('.popup-image__close-btn');

/*//Функция закрытия фото по Esc
const escClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    popupImg.classList.remove('popup-image_active');
  }
}

//Функция закрытия фото по кнопке
const popupImgСlose = document.querySelector('.popup-image__close-btn');
const handleCloseImg = () => {
  popupImg.classList.remove('popup-image_active')
}

//Функция закрытия фото по клику оверлей
const handleCloseImgOverley = (event) => {
  if (event.target !== event.currentTarget) return
  popupImg.classList.remove('popup-image_active')
}*/


//Добавление карточек при загрузке
const addCard = (card) => {
  const elementTemplate = document.querySelector('#cardsTemplate').content;
  const addElement = elementTemplate.cloneNode(true);
  
  addElement.querySelector('.elements__title').textContent = card.name
  addElement.querySelector('.elements__img').src = card.link
  //cardImg.setAttribute('alt', 'ИЗОБРАЖЕНИЕ')
  
  const likeButton = addElement.querySelector('.elements__like');
  const deleteButton = addElement.querySelector('.elements__del');
  const cardImg = addElement.querySelector('.elements__img');
  const deleteCard = deleteButton.closest('.elements__element')

  cardImg.setAttribute('alt', 'Добавленное изображение')

  elementContainer.prepend(addElement)

  likeButton.addEventListener('click', handleLikeIcon);

  deleteButton.addEventListener('click', function () {
   handleDeleteCard(deleteCard)});

  cardImg.addEventListener('click', function () {
    popupOpener(popupImg,'popup-image_active');
    popupPicTitle.textContent = card.name;
    popupPicSrc.src = card.link;
    document.addEventListener('keydown', function () { 
      popupRemoverEsc(event,popupImg,'popup-image_active')
      });
  });

  popupImgСlose.addEventListener('click', function () { 
  popupRemoverOverley(event,popupImg,'popup-image_active')
  });

  popupImg.addEventListener('click', function () {
    popupRemover(popupImg,'popup-image_active')
  });

 }

initialCards.forEach(addCard)


//Открытие и закрытие попап добавления карточек
const popupCard = document.querySelector('.popup_card');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');


/*const popupCardRemove = function () {
  popupCard.classList.remove('popup_opened');
}

const closePopupCard = function(event) {
  if (event.target !== event.currentTarget) return
  popupCardRemove(event);
}*/

popupAddButton.addEventListener('click', function () {
  popupOpener(popupCard,'popup_opened')
  document.addEventListener('keydown', function () {
    popupRemoverEsc(event,popupCard,'popup_opened')
    })
});


popupCardCloseButton.addEventListener('click', function () {
popupRemover(popupCard,'popup_opened')});

popupCard.addEventListener('mousedown', function () {
popupRemoverOverley (event,popupCard,'popup_opened')});


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

  popupRemover(popupCard,'popup_opened')

})
















