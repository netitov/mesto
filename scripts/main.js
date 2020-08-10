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
