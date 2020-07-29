import S from '@sanity/desk-tool/structure-builder';
import FaCompass from 'react-icons/lib/fa/compass';

const hiddenDocuments = (document) =>
  !['info'].includes(document.getId());

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Info')
        .child(S.document().schemaType('info').documentId('info'))
        .icon(FaCompass),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocuments),
    ]);
