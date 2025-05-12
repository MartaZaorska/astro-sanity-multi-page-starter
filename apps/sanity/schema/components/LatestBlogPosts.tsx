import { BookIcon } from 'lucide-react';
import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';
import { filterReferences } from '../../utils/filter-references';
import sectionId from '../ui/sectionId';

const name = 'LatestBlogPosts';
const title = 'Latest Blog Posts';
const icon = BookIcon;

export default defineField({
  name,
  title,
  icon,
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Heading',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraph (optional)',
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Call To Action (optional)',
    }),
    defineField({
      name: 'posts',
      type: 'array',
      title: 'Posts (optional)',
      validation: Rule => Rule.length(3).error('You must add three blog posts'),
      description: (
        <>
          If you do not add articles in this section, the three most recent posts from the{' '}
          <a
            href='/structure/BlogPost_Collection'
            target='_blank'
            rel='noopener'
          >
            blog post collection
          </a>{' '}
          will be displayed automatically.
        </>
      ),
      of: [
        defineField({
          name: 'item',
          type: 'reference',
          title: 'Blog Post',
          to: [{ type: 'BlogPost_Collection' }],
          options: {
            disableNew: true,
            filter: filterReferences({ checkUnique: true }),
          },
        }),
      ],
    }),
    ...sectionId,
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title,
      subtitle: toPlainText(heading),
      ...sectionPreview({ imgUrl: `/static/components/${name}.webp`, icon }),
    }),
  },
});
