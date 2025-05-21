import { PenLineIcon } from 'lucide-react';
import { defineField } from 'sanity';
import { sectionPreview } from '../../../utils/section-preview';
import { toPlainText } from '../../../utils/to-plain-text';

const name = 'Quote';
const title = 'Quote';
const icon = () => <PenLineIcon size={15} />;

export default defineField({
  name,
  title,
  type: 'object',
  ...sectionPreview({ imgUrl: `/static/blogPost/${name}.webp`, icon }),
  fields: [
    defineField({
      name: 'text',
      type: 'PortableText',
      title: 'Content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author (optional)',
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare: ({ text }) => ({
      title,
      subtitle: toPlainText(text),
      icon,
    }),
  },
});
