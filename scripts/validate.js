
const formProfile = document.querySelector('.popup__form');
const formInput = formProfile.querySelector('.popup__text');
const formError = formProfile.querySelector(`#${formInput.id}-error`);

const elementList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn',
  submitButtonSelectorCrd: '.popup__btn-crd',  
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
}

const showError = (formProfile, formInput, errorMessage, inputErrorClass, errorClass) => {
  const formError = formProfile.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
};

const hideError = (formProfile, formInput, inputErrorClass, errorClass) => {
  const formError = formProfile.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(inputErrorClass);
  // 1. Удалите активный класс ошибки c formError.
  formError.classList.remove(errorClass);
  // 2. Очистите свойство textContent элемента formError.
  formError.textContent = '';
};

const checkInputValidity = (formProfile, formInput, inputErrorClass, errorClass) => {
  if (!formInput.validity.valid) {
    showError(formProfile, formInput, formInput.validationMessage, inputErrorClass, errorClass);
  } else {
    hideError(formProfile, formInput,inputErrorClass, errorClass);
  }
};

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

//добавление обработчика всем полям формы

const setEventListeners = (formProfile, inputSelector, submitButtonSelector, submitButtonSelectorCrd, inactiveButtonClass, inputErrorClass, errorClass) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formProfile.querySelectorAll(inputSelector));
  //const buttonElement = formElement.querySelector('.popup__btn');
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const buttonSubmitCard = document.querySelector(submitButtonSelectorCrd);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formProfile, formInput, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, buttonSubmitCard, inactiveButtonClass);
    });
  });
};

//добавление обработчика формам

const enableValidation = (elements) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(elements.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formProfile) => {
    formProfile.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formProfile, elements.inputSelector, elements.submitButtonSelector, elements.submitButtonSelectorCrd, elements.inactiveButtonClass, elements.inputErrorClass, elements.errorClass );
  });
};

// Вызовем функцию
enableValidation(elementList);


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
const toggleButtonState = (inputList, buttonElement, buttonSubmitCard, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonSubmitCard.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
    buttonSubmitCard.disabled = true;
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonSubmitCard.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
    buttonSubmitCard.disabled = false;
  }
};