import Alpine from '@alpinejs/csp';
import intlTelInput from 'intl-tel-input';

Alpine.data('telInput', () => ({
  inputField: null,
  iti: null,
  validationElement: null,
  requiredValidationMessage: '',
  logicValidationMessage: '',
  required: false,

  init() {
    this.validationElement = this.$root.querySelector('.invalid-feedback');
    this.requiredValidationMessage = this.validationElement.innerText;
    this.logicValidationMessage = this.$root.querySelector('.logic-validation').innerText;
    this.inputField = this.$root.querySelector('input');

    let name = this.inputField.getAttribute('name');
    let onlyCountries = this.$root.querySelector('.only-countries').innerText.split(',').map(c => c.trim()).filter(c => !!c);
    let initialCountry = this.$root.querySelector('.initial-country').innerText.split(',')[0].trim() || 'auto';
    let hasFloatingLabel = !!this.$root.closest('.bsi-form-label-floating');

    this.iti = intlTelInput(this.inputField, {
      onlyCountries: onlyCountries,
      countrySearch: onlyCountries.length > 5 || onlyCountries.length == 0,
      loadUtils: () => import('intl-tel-input/build/js/utils.js'),
      hiddenInput: () => ({ phone: name }),
      separateDialCode: false, // If floating label is selected, only show country flag without country code
      initialCountry: initialCountry,
      validationNumberTypes: ["FIXED_LINE_OR_MOBILE"],
    });

    if (hasFloatingLabel) {
      this._initFloatingLabel();
    }
  },

  validate() {
    let logicValid = !this.inputField.value || this.iti.isValidNumber();
    this.inputField.setCustomValidity(logicValid ? '' : this.logicValidationMessage);
    this.validationElement.innerText = logicValid ? this.requiredValidationMessage : this.logicValidationMessage;
    let classList = this.validationElement.classList;
    this.inputField.checkValidity() ? classList.remove('d-block') : classList.add('d-block');
    // set Aria describedby attribute - also relevant in form.js and form-field.js
    this.inputField.setAttribute('aria-invalid', !logicValid);
    if (logicValid && !this.inputField.value.trim() === '') {
      this.inputField.removeAttribute('aria-describedby');
    } else if ('ariaDescribedByElements' in Element.prototype) {
      var errorMessageElements = Array.from(
        this.inputField.closest('.bsi-form-element').querySelectorAll('.invalid-feedback'))
      .filter(
        (errorMessageElement) =>
          window.getComputedStyle(errorMessageElement).display !== 'none');
      this.inputField.ariaDescribedByElements = errorMessageElements;
    }
  },

  _initFloatingLabel() {
    let labelElement = this.$root.querySelector('.form-label');
    let itiElement = this.$root.querySelector('.iti');
    itiElement.classList.add('form-floating');
    itiElement.append(labelElement);
    labelElement.innerText = this.inputField.placeholder;
  },
}));