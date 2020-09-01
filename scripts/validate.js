// включение валидации вызовом enableValidation
// все настройки передаются при вызове

//enableValidation({
//  formSelector: '.popup__form',
//  inputSelector: '.popup__input',
//  submitButtonSelector: '.popup__button',
//  inactiveButtonClass: 'popup__button_disabled',
//  inputErrorClass: 'popup__text_type_error',
//  errorClass: 'popup__text-error_visible'
//});

//

const formProfile = document.querySelector('.popup__form');
const formInput = formProfile.querySelector('.popup__text');
const formError = formProfile.querySelector(`#${formInput.id}-error`);

/*const showError = (input, errorMessage) => {
  input.classList.add('popup__text_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__text-error_visible');
};

const hideError = (input) => {
  input.classList.remove('popup__text_type_error');
  // 1. Удалите активный класс ошибки c formError.
  formError.classList.remove('popup__text-error_visible');
  // 2. Очистите свойство textContent элемента formError.
  formError.textContent = '';
};

const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showError(formInput, formInput.validationMessage);
  } else {
    hideError(formInput);
  }
};

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});*/

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

/*formInput.addEventListener('input', function () {
  checkInputValidity();
});*/


//добавление обработчика всем полям формы

const setEventListeners = (formProfile) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formProfile.querySelectorAll('.popup__text'));
  //const buttonElement = formElement.querySelector('.popup__btn');
  const buttonElement =  Array.from(formElement.querySelectorAll('.popup__btn'));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formProfile, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//добавление обработчика формам

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

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
enableValidation();


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
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__btn_inactive');
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__btn_inactive');
  }
};