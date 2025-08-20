const {cx, part} = require('@bsi-cx/design-build');

module.exports = cx.contentElement
  .withElementId('shop-UEyFnQ')
  .withLabel('Shop')
  .withParts(
    part.withId('product-list').withLabel('Produktliste'),
    part.withId('cart-heading').withLabel('Warenkorb-Überschrift'),
    part.withId('cart-empty-button').withLabel('Warenkorb leeren'),
    part.withId('point-warning').withLabel('Punktwarnung'),
    part.withId('lightbox-close-text').withLabel('Lightbox schließen'),
    part.withId('modal-ok-button').withLabel('OK-Schaltfläche')
  )
  .withFile(require('./template.twig'));
