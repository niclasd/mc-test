const { cx } = require('@bsi-cx/design-build');

module.exports = cx.contentElement
  .withElementId('shop-UEyFnQ')
  .withLabel('Shop')
  .withParts(
    cx.part.withId('product-list').withLabel('Produktliste'),
    cx.part.withId('cart-heading').withLabel('Warenkorb-Überschrift'),
    cx.part.withId('cart-empty-button').withLabel('Warenkorb leeren'),
    cx.part.withId('point-warning').withLabel('Punktwarnung'),
    cx.part.withId('lightbox-close-text').withLabel('Lightbox schließen'),
    cx.part.withId('modal-ok-button').withLabel('OK-Schaltfläche')
  )
  .withFile(require('./template.twig'));
