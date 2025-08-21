const {cx} = require('@bsi-cx/design-build');


module.exports = (
    template = require('../template.twig'),
    elementId = 'listItemElement-ad97e5',
    elementLabel = 'Listeneintrag',
  ) => cx
  .contentElement
  .withFile(template)
  .withElementId(elementId)
  .withLabel(elementLabel)
  .withParts(
    cx.part.plainText
    .withId("itemLabel")
    .withLabel("Label")
  );