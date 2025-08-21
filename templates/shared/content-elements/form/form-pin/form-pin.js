import Alpine from '@alpinejs/csp';
import { isNumber } from 'chart.js/helpers';

Alpine.data('formPin', () => ({
  bsiInputElement: null, // Input field required for CX story / value flow
  maxLength: null,
  requiredErrorElement: null,
  form: null,
  root: null,

  initForm() {
    this.form = this.$el;
    this.root = this.$root;

    if (this.root.classList.contains('bsi-form-label-floating')) {
      for(const floatingElement of this.form.getElementsByClassName('bsi-label-floating-element')) {
        this._initFloatingLabels(floatingElement);
      }
    }
  },

  submitForm(e) {
    if (!this.form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      this.validateInput();
    }
    this.form.classList.add('was-validated');
  },

  initRequiredError() {
    this.requiredErrorElement = this.$el;
  },

  validateInput() {
    if (this.bsiInputElement.value.length != this.maxLength) {
      this.requiredErrorElement.style.display = "block";
      this.requiredErrorElement.setAttribute('aria-hidden', 'false');
      this.requiredErrorElement.setAttribute('tabindex', '0');
    } else {
      this.requiredErrorElement.style.display = "none";
      this.requiredErrorElement.setAttribute('aria-hidden', 'true');
      this.requiredErrorElement.removeAttribute('tabindex');
    }
  },

  initPinNumberFields() {
    this.bsiInputElement = this.$root.querySelector('.bsi-form-field-input-original');
    let containerDiv = this.$root.querySelector('.bsi-form-pin-element');

    this.maxLength = this.bsiInputElement.getAttribute('maxlength') ?? 6;
    for (let i = 0; i < this.maxLength; i++) {
      this._initPinNumberField(containerDiv, i);
    }
    this._autoFocusFirstPinInput();
  },

  _initPinNumberField(containerDiv, i) {
    let div = document.createElement('div');
    let label = document.createElement('label');
    let inputPin = document.createElement('input');
    
    div.classList = 'input-wrapper';
    label.classList = 'form-label';
    label.innerHTML = (i + 1) + ".";
    inputPin.classList = 'bsi-form-field-input form-control bsi-form-field-input pin';
    
    inputPin.setAttribute('required', 'true');
    inputPin.setAttribute('inputmode', 'numeric');
    inputPin.setAttribute('type', "number");
    inputPin.setAttribute('min', "0");
    inputPin.setAttribute('max', "9");

    div.appendChild(label);
    div.appendChild(inputPin);
    containerDiv.appendChild(div);

    inputPin.addEventListener('focusin', (e) => {
      if (inputPin.value < 0 || inputPin.value > 9 || !isNumber(inputPin.value)) {
        inputPin.value = '';
      }
    });

    inputPin.addEventListener('keydown', (e) => {
      if ((e.key =='Backspace') && !inputPin.value) {
        this._autoFocusPreviousPinInput(inputPin);
      }
    });
    
    inputPin.addEventListener('input', (e) => {
      const inputPinList = this.$root.querySelectorAll('input.pin');
      this._cleanUp(inputPin);
      this.bsiInputElement.value = Array.from(inputPinList).reduce((result, input) => {
        return result + input.value;
      }, "");
      if (this.$root.classList.contains('auto-submit')) {
        this._autoSubmitIfFilledIn();
      }
      this._autoFocusNextPinInput(inputPin);
    });
  },

  _autoFocusFirstPinInput() {
    let wrapper = this.$root.querySelector('.input-wrapper');
    this._autoFocus(wrapper);
  },

  _autoFocusNextPinInput(inputPin) {
    let nextWrapper = inputPin.parentNode.nextElementSibling;
    if (inputPin.value && !this._isLastPinElement(inputPin)) {
      this._autoFocus(nextWrapper);
    }
  },

  _autoFocusPreviousPinInput(inputPin) {
    let previousWrapper = inputPin.parentNode.previousSibling;
    if (previousWrapper != null) {
      this._autoFocus(previousWrapper);
    }
  },

  _autoFocus(wrapper){
    var nextPinInput = wrapper.querySelector('input.pin');
      if (nextPinInput) {
        nextPinInput.focus();
      }
  },

  _autoSubmitIfFilledIn() {
    let form = this.$root.querySelector('.formular-pin');
    if (form && (this.bsiInputElement.value.length == this.maxLength)) {
      form.submit();
    }
  },

  _cleanUp(inputPin) {
    if (inputPin.value) {
      if (this._isLastPinElement(inputPin)){
        inputPin.value = inputPin.value.slice(-1);
      }
    }
  },

  _isLastPinElement(inputPin) {
    return inputPin.parentNode.nextElementSibling == null; 
  },
}));
