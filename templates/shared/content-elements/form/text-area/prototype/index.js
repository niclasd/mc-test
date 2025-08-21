const {cx, Icon} = require('@bsi-cx/design-build');

/**
 * @param {string} template
 * @param {string} elementId
 * @param {string} elementLabel
 * @param {string} elementPartId
 * @param {string} elementPartLabel
 * @param {string} formTextPartId
 * @param {string} formTextPartLabel
 * @param {string} errorRequiredPartId
 * @param {string} errorRequiredPartLabel
 * @returns {ContentElement}
 */
module.exports = (
  template = require('../template.twig'),
  elementId = 'text-area-J5z17p',
  /*elementLabel = 'Multiline text field',*/
  elementLabel = 'Mehrzeiliges Textfeld',
  elementPartId = 'text-area-part-61guvT',
  /*elementPartLabel = 'Multiline text field',*/
  elementPartLabel = 'Mehrzeiliges Textfeld',
  formTextPartId = 'text-area-part-text-gFR3M5',
  /*formTextPartLabel = 'Info text',*/
  formTextPartLabel = 'Info Text',
  errorRequiredPartId = 'text-area-part-error-required-ZPOyD8',
  /*errorRequiredPartLabel = 'Required error message'*/
  errorRequiredPartLabel = 'Fehlermeldung bei leerem Pflichtfeld'
) => cx
  .contentElement
  .withFile(template)
  .withElementId(elementId)
  .withLabel(elementLabel)
  .withIcon(Icon.TEXTAREA)
  .withParts(
    cx.part.formTextarea
      .withId(elementPartId)
      .withLabel(elementPartLabel),
    cx.part.plainText
      .withId(formTextPartId)
      .withLabel(formTextPartLabel),
    cx.part.plainText
      .withId(errorRequiredPartId)
      .withLabel(errorRequiredPartLabel));