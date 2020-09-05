const formProfile = document.querySelector('.popup__form');

const elementList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
}

const showError = (formSelector, inputSelector, errorMessage, inputErrorClass, errorClass) => {
  const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
};

const hideError = (formSelector, inputSelector, inputErrorClass, errorClass) => {
  const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  // 1. Удалите активный класс ошибки c formError.
  formError.classList.remove(errorClass);
  // 2. Очистите свойство textContent элемента formError.
  formError.textContent = '';
};

const checkInputValidity = (formSelector, inputSelector, inputErrorClass, errorClass) => {
  if (!inputSelector.validity.valid) {
    showError(formSelector, inputSelector, inputSelector.validationMessage, inputErrorClass, errorClass);
  } else {
    hideError(formSelector, inputSelector,inputErrorClass, errorClass);
  }
};


// Наличие невалидных полей в форме
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputSelector) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputSelector.validity.valid;
  })
};

// Стилизация кнопки формы
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//добавление обработчика всем полям формы

const setEventListeners = (formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
  const buttonElement = formSelector.querySelector(submitButtonSelector);


  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputSelector) => {
    // каждому полю добавим обработчик события input
    inputSelector.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formSelector, inputSelector, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
};


//добавление обработчика формам

const enableValidation = (elements) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(elements.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formSelector, elements.inputSelector, elements.submitButtonSelector, elements.inactiveButtonClass, elements.inputErrorClass, elements.errorClass );
  });
};

// Вызовем функцию
enableValidation(elementList);


