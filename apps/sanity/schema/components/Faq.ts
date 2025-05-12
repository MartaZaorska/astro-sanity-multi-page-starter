import { CircleHelpIcon } from 'lucide-react';
import { defineField } from 'sanity';
import { sectionPreview } from '../../utils/section-preview';
import { toPlainText } from '../../utils/to-plain-text';
import { filterReferences } from '../../utils/filter-references';
import sectionId from '../ui/sectionId';

const name = 'Faq';
const title = 'FAQ';
const icon = CircleHelpIcon;

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
      name: 'faqItems',
      type: 'array',
      title: 'FAQ Items',
      of: [
        defineField({
          name: 'item',
          title: 'FAQ',
          type: 'reference',
          to: [{ type: 'Faq_Collection' }],
          options: {
            filter: filterReferences({ checkUnique: true }),
          },
        }),
      ],
      validation: Rule => Rule.required().min(3).max(10).unique(),
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
