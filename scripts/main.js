const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-btn');

const nameInput = popup.querySelector('.popup__text_name');
const jobInput = popup.querySelector('.popup__text_occupation');
const nameProfile = document.querySelector('.profile__name');
const occupationProfile = document.querySelector('.profile__occupation');

//Функция открытия всех попапов
const popupOpener = (element) => {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', function () {
    popupRemoverEsc(event,popup)
});
  document.addEventListener('keydown', function () { 
    popupRemoverEsc(event,popupImg)
  });
  document.addEventListener('keydown', function () {
    popupRemoverEsc(event,popupCard)
    })
  popup.addEventListener('mousedown', function () {
    popupRemoverOverley (event,popup)
  });
  popupImgСlose.addEventListener('click', function () { 
    popupRemoverOverley(event,popupImg)
    });
  popupCard.addEventListener('mousedown', function () {
    popupRemoverOverley (event,popupCard)});
}

//Функция закрытия всех попапов по кнопке
const popupRemover = (element) => {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', function () {
    popupRemoverEsc(event,popup)
});
  document.removeEventListener('keydown', function () { 
    popupRemoverEsc(event,popupImg)
  });
  document.removeEventListener('keydown', function () {
    popupRemoverEsc(event,popupCard)
    })
  popup.removeEventListener('mousedown', function () {
    popupRemoverOverley (event,popup)
  });
  popupImgСlose.removeEventListener('click', function () { 
    popupRemoverOverley(event,popupImg)
    });
  popupCard.removeEventListener('mousedown', function () {
    popupRemoverOverley (event,popupCard)});
}

//Функция закрытия всех попапов по оверлей
const popupRemoverOverley = (event,element) => {
  if (event.target !== event.currentTarget)
  return
  popupRemover(element)
}

//Функция закрытия всех попапов по Esc
const popupRemoverEsc = (evt,element) => {
  if (evt.key === 'Escape') {
    popupRemover(element);
  }
}


popupEditButton.addEventListener('click', () => {
  popupOpener(popup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
});


popupCloseButton.addEventListener('click', function () {
  popupRemover(popup) 
});


const formElement = document.querySelector('.popup__container');
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = jobInput.value;
    popupRemover(popup);
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
const cardsRender = (el, list) => {
  el.prepend(list);
}

//Функция превью карточки
const cardsPreview = (card) => {
  popupOpener(popupImg);
  popupPicTitle.textContent = card.name;
  popupPicSrc.src = card.link;
  popupPicSrc.setAttribute('alt', "Изображение " + card.name);
}


const popupImgСlose = document.querySelector('.popup-image__close-btn');
const elementTemplate = document.querySelector('#cardsTemplate').content;

//Добавление карточек при загрузке
const addCard = (card) => {
  
  const cardsList = elementTemplate.cloneNode(true);

  const cardImg = cardsList.querySelector('.elements__img');
  
  cardsList.querySelector('.elements__title').textContent = card.name
  cardImg.src = card.link

  
  const likeButton = cardsList.querySelector('.elements__like');
  const deleteButton = cardsList.querySelector('.elements__del');
  const deleteCard = deleteButton.closest('.elements__element')

  cardImg.setAttribute('alt', 'Добавленное изображение')

  cardsRender (elementContainer, cardsList)

  likeButton.addEventListener('click', handleLikeIcon);

  deleteButton.addEventListener('click', function () {
   handleDeleteCard(deleteCard)});

  cardImg.addEventListener('click', function () {
    cardsPreview(card)
  });

 }

initialCards.forEach(addCard)

popupImg.addEventListener('click', function () {
  popupRemover(popupImg)
});

//Открытие и закрытие попап добавления карточек
const popupCard = document.querySelector('.popup_card');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn');

popupAddButton.addEventListener('click', function () {
  popupOpener(popupCard)
});


popupCardCloseButton.addEventListener('click', function () {
popupRemover(popupCard)});



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

  popupRemover(popupCard)

})
















