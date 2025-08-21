import Alpine from '@alpinejs/csp';

Alpine.data('selectField', () => ({
  rootElement: null,
  selectElement: null,

  initSelectField() {
    this.rootElement = this.$root;
    this.selectElement = this.$el;

    if (this.rootElement.classList.contains('bsi-placeholder-defined')) {

      this.selectElement.options[0].setAttribute('value', '');
      this.selectElement.options[0].setAttribute('selected', '');

      // The select field was initialized with an empty value for the placeholder. We need to quickly toggle the value for the required value to be properly handled by the form.
      this.selectElement.value = this.selectElement.options[0].value + '_temp';
      this.selectElement.value = this.selectElement.options[0].value;
    }
  },
}))