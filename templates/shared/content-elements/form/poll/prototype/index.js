const {cx, Icon} = require('@bsi-cx/design-build');

/**
 * @param {string} template
 * @param {string} elementId
 * @param {string} elementLabel
 * @param {string} elementPartId
 * @param {string} elementPartLabel
 * @param {string} leftPartId
 * @param {string} leftPartLabel
 * @param {string} rightPartId
 * @param {string} rightPartLabel
 * @param {string} formTextPartId
 * @param {string} formTextPartLabel
 * @param {string} errorRequiredPartId
 * @param {string} errorRequiredPartLabel
 * @returns {ContentElement}
 */
module.exports = (
  template = require('../template.twig'),
  elementId = 'poll-wni8em',
  /*elementLabel = 'Poll',*/
  elementLabel = 'Umfrage',
  elementPartId = 'poll-part-diJBU7',
  /*elementPartLabel = 'Poll',*/
  elementPartLabel = 'Umfrage',
  leftPartId = 'poll-part-left-fw2gb8',
  /*leftPartLabel = 'Label on the left',*/
  leftPartLabel = 'Label auf der linken Seite',
  rightPartId = 'poll-part-right-Cz7PuT',
  /*rightPartLabel = 'Label on the right',*/
  rightPartLabel = 'Label auf der rechten Seite',
  formTextPartId = 'poll-part-text-Xi7bOp',
  /*formTextPartLabel = 'Info text',*/
  formTextPartLabel = 'Info Text',
  errorRequiredPartId = 'poll-part-error-required-lL6aMT',
  /*errorRequiredPartLabel = 'Required error message'*/
  errorRequiredPartLabel = 'Fehlermeldung bei leerem Pflichtfeld'
) => cx
  .contentElement
  .withFile(template)
  .withElementId(elementId)
  .withLabel(elementLabel)
  .withIcon(Icon.RADIOBUTTON)
  .withStyleConfigs(
    require('../../../../configs/styles/form-poll'))
  .withParts(
    cx.part.formField
      .withId(elementPartId)
      .withLabel(elementPartLabel),
    cx.part.plainText
      .withId(leftPartId)
      .withLabel(leftPartLabel),
    cx.part.plainText
      .withId(rightPartId)
      .withLabel(rightPartLabel),
    cx.part.plainText
      .withId(formTextPartId)
      .withLabel(formTextPartLabel),
    cx.part.plainText
      .withId(errorRequiredPartId)
      .withLabel(errorRequiredPartLabel));