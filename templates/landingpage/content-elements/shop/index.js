const {cx} = require('@bsi-cx/design-build');

module.exports = cx.contentElement
  .withElementId('shop-UEyFnQ')
  .withLabel('Shop')
  .withParts(
    cx.part.withPartId('product-list').withLabel('Produktliste'),
    cx.part.withPartId('cart-heading').withLabel('Warenkorb-Überschrift'),
    cx.part.withPartId('cart-empty-button').withLabel('Warenkorb leeren'),
    cx.part.withPartId('point-warning').withLabel('Punktwarnung'),
    cx.part.withPartId('lightbox-close-text').withLabel('Lightbox schließen'),
    cx.part.withPartId('modal-ok-button').withLabel('OK-Schaltfläche')
  )
  .withFile(require('./template.twig'));
