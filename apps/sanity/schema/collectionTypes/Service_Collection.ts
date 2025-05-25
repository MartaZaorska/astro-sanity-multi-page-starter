import { PencilRulerIcon } from 'lucide-react';
import { defineField } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';
import { filterReferences } from '../../utils/filter-references';
import { definePage } from '../../templates/page';

export default definePage({
  name: 'Service_Collection',
  title: 'Services',
  icon: PencilRulerIcon,
  additionalFields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Name will be displayed in breadcrumb and in schemas for Google',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isSubPage',
      type: 'boolean',
      title: 'Is the service part of another service?',
      description: 'Check this if the service is part of another main service.',
      validation: Rule => Rule.required(),
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'parentPage',
      type: 'reference',
      title: 'Parent page (main service)',
      description:
        'Select the parent page (main service) that this subpage is linked to. Once selected, this page will be considered a subpage.',
      to: [{ type: 'Service_Collection' }],
      options: {
        disableNew: true,
        filter: filterReferences({
          checkSelfReference: true,
          additionalFilter: 'defined(slug.current) && !isSubPage',
        }),
      },
      group: 'content',
      hidden: ({ parent }) => !parent?.isSubPage,
      validation: Rule =>
        Rule.custom((value, context) => {
          const isSubPage = (context.parent as { isSubPage: boolean })?.isSubPage;
          if (isSubPage && !value) return 'The parent page is required.';
          return true;
        }),
    }),
    ...defineSlugForDocument({
      source: 'name',
      prefix: '',
      hasPrefixSourceField: 'isSubPage',
      prefixSource: 'parentPage',
    }).map(field => ({ ...field, group: 'content' })),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
  ],
});
