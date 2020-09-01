
//Первонач план
const formProfile = document.querySelector('.popup__form');
const formInput = formProfile.querySelector('.popup__text');
const formError = formProfile.querySelector(`#${formInput.id}-error`);


const showError = (formProfile, formInput, errorMessage) => {
  const formError = formProfile.querySelector(`#${formInput.id}-error`);
  formInput.classList.add('popup__text_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__text-error_visible');
};

const hideError = (formProfile, formInput) => {
  const formError = formProfile.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove('popup__text_type_error');
  // 1. Удалите активный класс ошибки c formError.
  formError.classList.remove('popup__text-error_visible');
  // 2. Очистите свойство textContent элемента formError.
  formError.textContent = '';
};

const checkInputValidity = (formProfile, formInput) => {
  if (!formInput.validity.valid) {
    showError(formProfile, formInput, formInput.validationMessage);
  } else {
    hideError(formProfile, formInput);
  }
};

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

//добавление обработчика всем полям формы

const setEventListeners = (formProfile) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formProfile.querySelectorAll('.popup__text'));
  //const buttonElement = formElement.querySelector('.popup__btn');
  const buttonElement = formElement.querySelector('.popup__btn');
  const buttonSubmitCard = document.querySelector('.popup__btn-crd');

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formProfile, formInput);
      toggleButtonState(inputList, buttonElement, buttonSubmitCard);
    });
  });
};

//добавление обработчика формам

const enableValidation = (obj) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formProfile) => {
    formProfile.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formProfile);
  });
};

// Вызовем функцию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn',
  submitButtonSelector: '.popup__btn-crd',  
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
});


// Наличие невалидных полей в форме
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((formInput) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !formInput.validity.valid;
  })
};

// Стилизация кнопки формы
const toggleButtonState = (inputList, buttonElement, buttonSubmitCard) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__btn_inactive');
    buttonSubmitCard.classList.add('popup__btn_inactive');
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__btn_inactive');
    buttonSubmitCard.classList.remove('popup__btn_inactive');
  }
};