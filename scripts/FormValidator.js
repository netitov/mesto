export const elementList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
}

export class FormValidator {
  constructor(elementList, formElement){
    this._formSelector = elementList.formSelector;
    this._inputSelector = elementList.inputSelector;
    this._submitButtonSelector = elementList.submitButtonSelector;
    this._inactiveButtonClass = elementList.inactiveButtonClass;
    this._inputErrorClass = elementList.inputErrorClass;
    this._errorClass = elementList.errorClass;
    this.formElement = formElement;
  }

  _showError(formSelector, inputSelector, errorMessage) {
    const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass); 
  }

  _hideError(formSelector, inputSelector) {
    const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.remove(this._inputErrorClass);
    formError.textContent = '';
    formError.classList.remove(this._errorClass); 
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    })  
  }

  _checkInputValidity(formSelector, inputSelector) {
    if (!inputSelector.validity.valid) {
      this._showError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      this._hideError(formSelector, inputSelector);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  resetPopup(element) {
    const inputList = Array.from(element.querySelectorAll(this._inputSelector));
    const buttonElement = element.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputSelector) => {
      this._toggleButtonState(inputList, buttonElement);
  })
  }


  _setEventListeners() {
    const inputList = Array.from(this.formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this.formElement.querySelector(this._submitButtonSelector);
  
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._checkInputValidity(this.formElement, inputSelector);
        this._toggleButtonState(inputList, buttonElement);
      });
      this._toggleButtonState(inputList, buttonElement);
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

}