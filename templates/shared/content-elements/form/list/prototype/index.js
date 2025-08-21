const {cx} = require('@bsi-cx/design-build');


module.exports = (
    template = require('../template.twig'),
    elementId = 'listElement-d5c652',
    elementLabel = 'Sortierbare Liste',
    elementPartId = 'listGroupItems',
    elementPartLabel = 'This just change the Id',
    dropzoneContentId = 'list-dropzone-content-a03084'
  ) => cx
  .contentElement
  .withFile(template)
  .withElementId(elementId)
  .withLabel(elementLabel)
  .withParts(
    cx.part.formField
      .withId(elementPartId)
      .withLabel(elementPartLabel))
  .withDropzones(
    cx.dropzone
    .withDropzone(dropzoneContentId)
    .withAllowedElements(
      require('../../list-item')));