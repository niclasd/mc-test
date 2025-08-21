import Alpine from "@alpinejs/csp";
import flatpickr from "flatpickr";
import "flatpickr/dist/l10n/de.js";
import "flatpickr/dist/l10n/fr.js";
import "flatpickr/dist/l10n/it.js";

Alpine.data("formField", () => ({
  inputEl: null,
  fp: null,
  minDate: null,
  maxDate: null,
  isTime: false,
  requiredValidationMessage: '',
  logicValidationMessage: '',
  validationElement: null,

  init() {
    this.validationElement = this.$root.querySelector('.invalid-feedback');
    this.requiredValidationMessage = this.validationElement.innerText;
    this.logicValidationMessage = this.$root.querySelector('.logic-validation').innerText;
  },
  initFormFieldInput() {
    this.inputEl = this.$el;

    if (this.inputEl.type === 'range') {
      this._initRangeInput();
    } else if (['date', 'datetime-local', 'time'].includes(this.inputEl.type)) {
      this._initDateInput();
    }

    if (
      this.inputEl.type === 'text' ||
      this.inputEl.type === 'email' ||
      this.inputEl.type === 'password'
    ) {
      if (!this.inputEl.hasAttribute('maxlength')) {
        this.inputEl.setAttribute('maxlength', 250);
      }
    }

    if (this.inputEl.type === 'email') {
      this.inputEl.setAttribute('pattern', '^[^@\\s]{1,}@[^@\\[\\]\\s]{1,}\\.[^@\\[\\]\\s]{2,}$');
    }
  },

  validateInput() {
    // TODO: replace by css - this is styling, not validation
    if (
      this.inputEl.closest('.bsi-form-label-floating') &&
      this.inputEl.classList.contains('flatpickr-input') &&
      this.inputEl.value
    ) {
      let label = this.$root.querySelector('.form-label');
      label.style.opacity = 0.65;
      label.style.transform = 'scale(0.85) translateY(-0.5rem) translateX(0.15rem)';
    }

    this._validateDateTimeInput();
    this.validationElement.innerText = !this.$el.checkValidity() 
      && this.$el.value
        ? this.logicValidationMessage
        : this.requiredValidationMessage;
    // set Aria describedby attribute - also relevant in form.js and form-tel-input.js
    this.inputEl.setAttribute('aria-invalid', !this.inputEl.checkValidity());
    if (this.inputEl.checkValidity()) {
      this.inputEl.removeAttribute('aria-describedby');
    } else if ('ariaDescribedByElements' in Element.prototype) {
      var errorMessageElements = Array.from(
        this.inputEl
          .closest('.bsi-form-element')
          .querySelectorAll('.invalid-feedback'))
      .filter(
        (errorMessageElement) => window.getComputedStyle(errorMessageElement).display !== 'none');
      this.inputEl.ariaDescribedByElements = errorMessageElements;
    }
  },

  _validateDateTimeInput() {
    if (this.inputEl.classList.contains('flatpickr-input')) {
      let valid = true;
      if (this.inputEl.value && (this.inputEl.min || this.inputEl.max)) {
        let valDate = new Date(this.isTime ? `2000-01-01T${this.inputEl.value}` : this.inputEl.value);
        valid = valid && (!this.minDate || valDate >= this.minDate);
        valid = valid && (!this.maxDate || valDate <= this.maxDate);
      }
      this.inputEl.setCustomValidity(valid ? '' : this.logicValidationMessage);
    }
  },

  // Adjust range input to bootstrap styling
  _initRangeInput() {
    this.inputEl.classList.add('form-range');
    this.inputEl.classList.remove('form-control');
  },

  _initDateInput() {
    let locale = document.documentElement.lang.slice(0, 2) ?? 'de-CH';
    var type = this.inputEl.type;
    this.isTime = type === 'time';
    if (this.inputEl.placeholder && !this.isTime) {
      var twoDigitNumber = (number) => number.toString().padStart(2, "0");
      let date = new Date(this.inputEl.placeholder);
      let day = twoDigitNumber(date.getDate());
      let month = twoDigitNumber(date.getMonth() + 1); // month is 0 indexed
      let year = date.getFullYear();
      let hours = twoDigitNumber(date.getHours());
      let minutes = twoDigitNumber(date.getMinutes());
      this.inputEl.placeholder =
        type === 'date'
          ? `${day}.${month}.${year}`
          : `${day}.${month}.${year} ${hours}:${minutes}`;
    } else if (!this.inputEl.placeholder) {
      this.inputEl.placeholder =
        type === 'date'
          ? 'TT.mm.jjjj'
          : type === 'datetime-local'
          ? 'TT.mm.jjj --:--'
          : '--:--';
    }

    this.minDate = this.inputEl.min
      ? new Date(
          this.isTime ? `2000-01-01T${this.inputEl.min}` : this.inputEl.min
        )
      : null;
    this.maxDate = this.inputEl.max
      ? new Date(
          this.isTime ? `2000-01-01T${this.inputEl.max}` : this.inputEl.max
        )
      : null;

    var dateFormats = {
      date: 'Y-m-d', 'datetime-local': 'Y-m-dTH:i',
      time: 'H:i',
    };
    var altFormats = {
      date: 'd.m.Y', 'datetime-local': 'd.m.Y H:i',
      time: 'H:i',
    };
    this.fp = flatpickr(this.inputEl, {
      locale: locale,
      altInput: true,
      altFormat: altFormats[type],
      dateFormat: dateFormats[type],
      allowInput: this.inputEl.classList.contains('allowInput'),
      enableTime: type !== 'date',
      noCalendar: this.isTime,
      time_24hr: true,
      minDate: this.minDate,
      maxDate: this.maxDate,
    });

    this.inputEl.closest('.input-container').querySelector('.input').id = this.inputEl.id;
    this.inputEl.removeAttribute('id');
    // Add the span (with the icon) after the input
    this.inputEl.parentNode.classList.add('input-container'); // Add the container class in order to set the icon position
    var iconSpan = document.createElement('span');
    iconSpan.innerHTML = `<i class="bi ${
      this.isTime ? 'bi-clock' : 'bi-calendar'
    }"></i>`;
    this.inputEl.parentNode.appendChild(iconSpan);
  },
}));
