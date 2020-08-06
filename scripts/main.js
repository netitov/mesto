const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-btn');

const popupToggle = function (event) {
  popup.classList.toggle('popup_opened');
}

const closePopup = function(event) {
  if (event.target !== event.currentTarget) return
  popupToggle(event);
}

popupEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);



let formElement = document.querySelector('.popup__container');
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameInput = popup.querySelector('.popup__text_name');
    let jobInput = popup.querySelector('.popup__text_occupation');

    let name = document.querySelector('.profile__name');
    let occupation = document.querySelector('.profile__occupation');
    name.textContent = nameInput.value;
    occupation.textContent = jobInput.value;
    popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);