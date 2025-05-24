import { PanelsTopLeftIcon } from 'lucide-react';
import { defineField } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';
import { definePage } from '../../templates/page';

export default definePage({
  name: 'Blog_Page',
  title: 'Blog',
  icon: PanelsTopLeftIcon,
  additionalFields: [
    ...defineSlugForDocument({ slug: '/blog' }).map(field => ({ ...field, group: 'content' })),
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
  ],
});
