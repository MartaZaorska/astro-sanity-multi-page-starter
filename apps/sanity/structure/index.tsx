import { Settings2Icon, BookOpenTextIcon } from 'lucide-react';
import type { StructureResolver } from 'sanity/structure';
import { createSingleton } from '../utils/create-singleton';
import { createCollection } from '../utils/create-collection';

export const structure: StructureResolver = S =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Configuration')
        .icon(Settings2Icon)
        .child(
          S.list()
            .title('Configuration')
            .items([
              createSingleton(S, 'global'),
              createSingleton(S, 'navigation'),
              createSingleton(S, 'socials'),
              createSingleton(S, 'redirects'),
            ])
        ),
      S.divider(),
      createSingleton(S, 'Index_Page'),
      createSingleton(S, 'PrivacyPolicy_Page'),
      createSingleton(S, 'NotFound_Page'),
      S.divider(),
      S.listItem()
        .icon(BookOpenTextIcon)
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              createSingleton(S, 'Blog_Page'),
              S.divider(),
              createCollection(S, 'BlogCategory_Collection'),
              createCollection(S, 'BlogPost_Collection'),
            ])
        ),
      S.divider(),
      createCollection(S, 'Service_Collection'),
      S.divider(),
      createCollection(S, 'Faq_Collection'),
    ]);
