import Alpine from '@alpinejs/csp';

Alpine.data('formRadio', () => ({
  validateInput() {
    let valid = this.$el.checkValidity();
    this.$root.querySelector('.invalid-feedback').style.display = valid ? 'none' : 'block';
  }
}))