require('./styles.scss');
const {cx, Icon} = require('@bsi-cx/design-build');

const element = cx.contentElement;

/**
 * @returns {ContentElement}
 */
module.exports = element;
element.withFile(require('./template.twig'))
  .withElementId('form-container-pin-384aa4d6')
  /*.withLabel('Form')*/
  .withLabel('Pin-Element')
  .withIcon(Icon.ONE_COLUMN)
  .withStyleConfigs(
    require('../../../configs/styles/form-width'),
    require('../../../configs/styles/form-layout'),
    require('../../../configs/styles/form-color'),
    require('../../../configs/styles/pin-label'),
    require('../../../configs/styles/pin-auto-submit'))
  .withParts(
    cx.part.formField
      .withId('form-field-part-eefc3ac5')
      .withLabel('Formularfeld'),
    cx.part.plainText
      .withId('form-field-part-text-cc1a1c62')
      .withLabel('Info Text'),
    cx.part.plainText
      .withId('form-field-part-error-required-f3cf3728')
      .withLabel('Fehlermeldung bei leerem Pflichtfeld'));