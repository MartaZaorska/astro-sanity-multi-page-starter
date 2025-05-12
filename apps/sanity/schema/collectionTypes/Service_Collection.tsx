import { PencilRulerIcon, FileTextIcon, SearchIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';
import { filterReferences } from '../../utils/filter-references';

const name = 'Service_Collection';
const title = 'Services';
const icon = PencilRulerIcon;

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  options: { documentPreview: true },
  fields: [
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
        filter: filterReferences({ checkSelfReference: true, additionalFilter: 'defined(slug.current) && !isSubPage' }),
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
    defineField({
      name: 'components',
      type: 'components',
      title: 'Page Components',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: () => <FileTextIcon size={18} />,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: () => <SearchIcon size={18} />,
    },
  ],
  preview: {
    select: {
      name: 'name',
      slug: 'slug.current',
      image: 'image',
    },
    prepare: ({ name, slug, image }) => ({
      title: name,
      subtitle: slug,
      media: image,
      icon,
    }),
  },
});
