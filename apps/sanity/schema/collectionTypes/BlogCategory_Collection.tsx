import { TagIcon, FileTextIcon, SearchIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'BlogCategory_Collection';
const title = 'Blog Category Collection';
const icon = TagIcon;

export default defineType({
  name,
  title,
  icon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Category Name',
      description: 'Enter the category name that will represent a group of related blog posts.',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    ...defineSlugForDocument({ source: 'name', prefix: '/blog/kategoria' }).map(field => ({
      ...field,
      group: 'content',
    })),
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
      description: 'Enter text that will serve as a short introduction for this category.',
      group: 'content',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      icon: 'icon',
    },
  },
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
});
