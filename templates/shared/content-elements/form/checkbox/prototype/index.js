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
  elementId = 'checkbox-24CNSe',
  elementLabel = 'Checkbox',
  elementPartId = 'checkbox-part-Nls88s',
  elementPartLabel = 'Checkbox',
  formTextPartId = 'checkbox-part-text-6ycJm4',
  /*formTextPartLabel = 'Info text',*/
  formTextPartLabel = 'Info Text',
  errorRequiredPartId = 'checkbox-part-error-required-iYG8Ss',
  /*errorRequiredPartLabel = 'Required error message'*/
  errorRequiredPartLabel = 'Fehlermeldung bei leerem Pflichtfeld'
) => cx
  .contentElement
  .withFile(template)
  .withElementId(elementId)
  .withLabel(elementLabel)
  .withIcon(Icon.CHECKBOX)
  .withStyleConfigs(
    require('../../../../configs/styles/form-checkbox-switch'),
    require('../../../../configs/styles/form-checkbox-margin'))
  .withParts(
    cx.part.formCheckbox
      .withId(elementPartId)
      .withLabel(elementPartLabel),
    cx.part.plainText
      .withId(formTextPartId)
      .withLabel(formTextPartLabel),
    cx.part.plainText
      .withId(errorRequiredPartId)
      .withLabel(errorRequiredPartLabel));