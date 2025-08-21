const {cx, Icon} = require('@bsi-cx/design-build');

const {titleElements} = require('../../../base');
const {formElements} = require('../../index');

/**
 * @param {string} template
 * @param {string} elementId
 * @param {string} elementLabel
 * @param {string} dropzoneId
 * @returns {ContentElement}
 */
module.exports = (
  template = require('../template.twig'),
  elementId = 'multi-column-VxWXpr',
  /*elementLabel = 'Multiple columns within form',*/
  elementLabel = 'Mehrspaltiges Formularelement',
  dropzoneId = 'multi-column-dropzone-olNcOu'
) => cx
  .contentElement
  .withFile(template)
  .withElementId(elementId)
  .withLabel(elementLabel)
  .withIcon(Icon.TWO_COLUMNS)
  .withStyleConfigs(
    require('../../../../configs/styles/form-columns'),
    require('../../../../configs/styles/form-columns-layout'))
  .withDropzones(
    cx.dropzone
      .withDropzone(dropzoneId)
      .withAllowedElements(
        ...formElements,
        ...titleElements,
        require('../../../base/text'),
        require('../../../base/figure')));