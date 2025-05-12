import { StickyNoteIcon, FileTextIcon, SearchIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';
import BlogPostContent from '../components/blogPost';

const name = 'BlogPost_Collection';
const title = 'Blog Post Collection';
const icon = StickyNoteIcon;

export default defineType({
  name,
  title,
  icon,
  type: 'document',
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
    ...defineSlugForDocument({ source: 'name', prefix: '/blog' }).map(field => ({ ...field, group: 'content' })),
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
      title: 'Article Introduction (optional)',
      group: 'content',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      group: 'content',
      options: {
        disableNew: true,
      },
      to: { type: 'BlogCategory_Collection' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'date',
      title: 'Publication Date (optional)',
      description: 'This field allows you to override the default publication date (_createdAt).',
      group: 'content',
    }),
    BlogPostContent,
    defineField({
      name: 'components',
      type: 'components',
      title: 'Page Components (optional)',
      description: 'Those components will be displayed after the content of the blog post.',
      group: 'content',
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
      media: 'image',
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
