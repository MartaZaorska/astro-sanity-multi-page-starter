import { PointerIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { Tooltip, Box, Text } from '@sanity/ui';
import { getLinkFields } from './link';

const name = 'cta';
const title = 'Call To Action (CTA)';
const icon = PointerIcon;

export default defineType({
  name,
  title,
  icon,
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Text',
      description: 'The text that will be displayed on the button.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'theme',
      type: 'string',
      title: 'Theme',
      description: (
        <>
          <em>Primary</em> (main button) or <em>Secondary</em> (less important)
        </>
      ),
      options: {
        list: ['primary', 'secondary'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'primary',
      validation: Rule => Rule.required(),
    }),
    ...getLinkFields({ allowInternalWithAnchor: true }),
  ],
  preview: {
    select: {
      title: 'text',
      theme: 'theme',
      linkType: 'linkType',
      external: 'external',
      internal: 'internal.slug.current',
      anchor: 'anchor',
    },
    prepare({ title, theme, linkType, external, internal, anchor }) {
      let subtitle = '';
      if (linkType === 'external') subtitle = external;
      else if (linkType === 'internal') subtitle = `${internal}${anchor ? anchor : ''}`;
      else if (linkType === 'anchor') subtitle = anchor;

      return {
        title: `${title}`,
        subtitle,
        media: () => (
          <Tooltip
            content={
              <Box padding={1}>
                <Text size={1}>{theme === 'primary' ? 'Primary button' : 'Secondary button'}</Text>
              </Box>
            }
            placement='top'
            portal
          >
            <span>
              <PointerIcon size={18} />
            </span>
          </Tooltip>
        ),
      };
    },
  },
});
