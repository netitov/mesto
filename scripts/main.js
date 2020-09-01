const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-btn');

const nameInput = popup.querySelector('.popup__text_name');
const jobInput = popup.querySelector('.popup__text_occupation');
const name = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');

const popupAdd = () => {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = occupation.textContent;
}

const popupRemove = () => {
  popup.classList.remove('popup_opened');
}

const closePopup = (event) => {
  if (event.target !== event.currentTarget) return
  popupRemove(event);
}

popupEditButton.addEventListener('click', popupAdd);
popupCloseButton.addEventListener('click', popupRemove);
popup.addEventListener('mousedown', closePopup);

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    popup.classList.remove('popup_opened');
  }
});


const formElement = document.querySelector('.popup__container');
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

 //Переменные Увеличение фото
  const popupImg = document.querySelector('.popup-image');
  const popupPicTitle = popupImg.querySelector('.popup-image__title');
  const popupPicSrc = popupImg.querySelector('.popup-image__picture');



//Добавление карточек при загрузке
const elementContainer = document.querySelector('.elements')

const addCard = (card) => {
  const elementTemplate = document.querySelector('#cardsTemplate').content;
  const addElement = elementTemplate.cloneNode(true);
  

  addElement.querySelector('.elements__title').textContent = card.name
  addElement.querySelector('.elements__img').src = card.link
  
  const likeButton = addElement.querySelector('.elements__like');
  const deleteButton = addElement.querySelector('.elements__del');
  const cardImg = addElement.querySelector('.elements__img');

 
  elementContainer.prepend(addElement)

  //Добавление лайков
  likeButton.addEventListener('click', function(event) {
  event.target.classList.toggle('elements__like_active')
   })

  //Удаление карточек
  deleteButton.addEventListener('click', function() {
    const deleteCard = deleteButton.closest('.elements__element');
    deleteCard.remove()
  });


 //Увеличение фото
    cardImg.addEventListener('click', function() {
    popupImg.classList.add('popup-image_active')
    popupPicTitle.textContent = card.name
    popupPicSrc.src = card.link
})
//Закрытие фото по кнопке
  const popupImgСlose = document.querySelector('.popup-image__close-btn');

  popupImgСlose.addEventListener('click', function() {
    popupImg.classList.remove('popup-image_active')
  })

//Закрытие фото по оверлей
  popupImg.addEventListener('click', function(event) {
    if (event.target !== event.currentTarget) return
    popupImg.classList.remove('popup-image_active')
  })

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      popupImg.classList.remove('popup-image_active')
    }
  });

 }

initialCards.forEach(addCard)


//Открытие и закрытие попап добавления карточек
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
popupCard.addEventListener('mousedown', closePopupCard);

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    popupCard.classList.remove('popup_opened');
  }
});

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
















