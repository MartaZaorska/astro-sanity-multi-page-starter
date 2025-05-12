import { PanelsTopLeftIcon, FileTextIcon, SearchIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'Blog_Page';
const title = 'Blog Page';
const slug = '/blog';

export default defineType({
  name,
  title,
  icon: PanelsTopLeftIcon,
  type: 'document',
  options: { documentPreview: true },
  fields: [
    ...defineSlugForDocument({ slug }).map(field => ({ ...field, group: 'content' })),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Heading',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraph',
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
    prepare: () => ({
      title,
      subtitle: slug,
    }),
  },
});
