const {cx, Icon} = require('@bsi-cx/design-build');

/**
 * @param {string} template
 * @param {string} elementId
 * @param {string} elementLabel
 * @param {string} elementDescription
 * @param {string} elementPartId
 * @param {string} elementPartLabel
 * @param {string} formTextPartId
 * @param {string} formTextPartLabel
 * @param {string} errorRequiredPartId
 * @param {string} errorRequiredPartLabel
 * @param {string} errorInvalidPartId
 * @param {string} errorInvalidPartLabel
 * @returns {ContentElement}
 */
module.exports = (
  template = require('../template.twig'),
  elementId = 'form-field-REEhtN',
  /*elementLabel = 'Form field',*/
  elementLabel = 'Formularfeld',
  /*elementDescription = 'Text, e-mail, date/time, password, file, number, range',*/
  elementDescription = 'Text, E-Mail, Datum/Uhrzeit, Passwort, Datei, Zahl, Slider',
  elementPartId = 'form-field-part-H72Mnu',
  /*elementPartLabel = 'Form field',*/
  elementPartLabel = 'Formularfeld',
  formTextPartId = 'form-field-part-text-T9yfhp',
  /*formTextPartLabel = 'Info text',*/
  formTextPartLabel = 'Info Text',
  errorRequiredPartId = 'form-field-part-error-required-904DIx',
  /*errorRequiredPartLabel = 'Required error message',*/
  errorRequiredPartLabel = 'Fehlermeldung bei leerem Pflichtfeld',
  errorInvalidPartId = 'form-field-part-error-invalid-5g1mUc',
  /*errorInvalidPartLabel = 'Invalid error message',*/
  errorInvalidPartLabel = 'Fehlermeldung bei ungültiger Eingabe',
) => cx
  .contentElement
  .withFile(template)
  .withElementId(elementId)
  .withLabel(elementLabel)
  .withDescription(elementDescription)
  .withIcon(Icon.FORMFIELD)
  .withParts(
    cx.part.formField
      .withId(elementPartId)
      .withLabel(elementPartLabel),
    cx.part.plainText
      .withId(formTextPartId)
      .withLabel(formTextPartLabel),
    cx.part.plainText
      .withId(errorRequiredPartId)
      .withLabel(errorRequiredPartLabel),
    cx.part.plainText
      .withId(errorInvalidPartId)
      .withLabel(errorInvalidPartLabel));