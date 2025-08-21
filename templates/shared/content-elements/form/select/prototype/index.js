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
  elementId = 'select-iOtV1m',
  elementLabel = 'Dropdown',
  elementPartId = 'select-part-XNh1St',
  elementPartLabel = 'Dropdown',
  formTextPartId = 'select-part-text-hSNRfA',
  /*formTextPartLabel = 'Info text',*/
  formTextPartLabel = 'Info Text',
  errorRequiredPartId = 'select-part-error-required-6sq4M6',
  /*errorRequiredPartLabel = 'Required error message'*/
  errorRequiredPartLabel = 'Fehlermeldung bei leerem Pflichtfeld'
) => cx
  .contentElement
  .withFile(template)
  .withElementId(elementId)
  .withLabel(elementLabel)
  .withIcon(Icon.DROPDOWN)
  .withStyleConfigs(
    require('../../../../configs/styles/form-select-placeholder'))
  .withParts(
    cx.part.formSelect
      .withId(elementPartId)
      .withLabel(elementPartLabel),
    cx.part.plainText
      .withId(formTextPartId)
      .withLabel(formTextPartLabel),
    cx.part.plainText
      .withId(errorRequiredPartId)
      .withLabel(errorRequiredPartLabel));