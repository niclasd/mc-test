const {cx} = require('@bsi-cx/design-build');

module.exports = cx.contentElement
  .withId('shop')
  .withLabel('Shop')
  .withTemplate(require('./template.twig'));
