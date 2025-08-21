const {cx, Icon} = require('@bsi-cx/design-build');

/**
 * @param {string} template
 * @param {string} elementId
 * @param {string} elementLabel
 * @param {string} elementPartId
 * @param {string} elementPartLabel
 * @returns {ContentElement}
 */
module.exports = (
  template = require('../template.twig'),
  elementId = 'recaptcha-es8WAZ',
  elementLabel = 'reCAPTCHA',
  elementPartId = 'recaptcha-part-xMHmU5',
  elementPartLabel = 'reCAPTCHA',
  elementDescription = 'NUR für Login-Formulare'
) => cx
  .contentElement
  .withFile(template)
  .withElementId(elementId)
  .withLabel(elementLabel)
  .withIcon(Icon.FORMFIELD)
  .withDescription(elementDescription)
  .withParts(
    cx.part.formField
      .withId(elementPartId)
      .withLabel(elementPartLabel));