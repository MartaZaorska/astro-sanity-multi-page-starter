import { LinkIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { filterReferences } from '../../../utils/filter-references';
import { getLinkFields } from '../../ui/link';

const LinkField = defineField({
  name: 'link',
  type: 'object',
  title: 'Link',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Link Title',
      validation: Rule =>
        Rule.custom((value, { parent }) => {
          const linkType = (parent as { linkType?: string })?.linkType;
          if (linkType === 'anchor' && !value)
            return 'You must define a title for the anchor link.';
          return true;
        }),
    }),
    ...getLinkFields({ linkTypes: ['internal', 'anchor'], allowInternalWithAnchor: true }),
  ],
  preview: {
    select: {
      title: 'title',
      internalName: 'internal.name',
      linkType: 'linkType',
      internal: 'internal.slug.current',
      anchor: 'anchor',
    },
    prepare({ title, linkType, internal, internalName, anchor }) {
      return {
        title: title ? `${title}` : `${internalName}`,
        subtitle: linkType == 'internal' ? `${internal}${anchor ? anchor : ''}` : `${anchor}`,
        icon: LinkIcon,
      };
    },
  },
});

export const getNavigationFields = ({ isRequired = true }: { isRequired?: boolean }) => [
  defineField({
    name: 'header',
    type: 'object',
    title: 'Navigation',
    options: { collapsible: true },
    fields: [
      defineField({
        name: 'annotation',
        type: 'object',
        title: 'Annotation (optional)',
        fields: [
          defineField({
            name: 'icon',
            type: 'image',
            title: 'Icon (optional)',
            description: 'Only SVG files are supported.',
            options: {
              accept: '.svg',
            },
          }),
          defineField({
            name: 'text',
            type: 'string',
            title: 'Text',
            validation: Rule => Rule.required(),
          }),
        ],
      }),
      defineField({
        name: 'services',
        type: 'array',
        title: 'Services (optional)',
        description: 'If this field remains empty, the first service will be displayed.',
        of: [
          defineField({
            name: 'service',
            type: 'reference',
            title: 'Service',
            to: [{ type: 'Service_Collection' }],
            options: {
              disableNew: true,
              filter: filterReferences({
                additionalFilter: 'defined(slug.current) && !isSubPage',
                checkUnique: true,
              }),
            },
            validation: Rule => Rule.required(),
          }),
        ],
      }),
      defineField({
        name: 'links',
        type: 'array',
        title: 'Links',
        of: [LinkField],
        validation: Rule => Rule.min(1).max(3).unique(),
      }),
    ],
    validation: Rule =>
      Rule.custom(value => {
        if (!value && isRequired) return 'Required';
        return true;
      }),
  }),
  defineField({
    name: 'footer',
    type: 'object',
    title: 'Footer',
    options: { collapsible: true },
    fields: [
      defineField({
        name: 'services',
        type: 'array',
        title: 'Services (optional)',
        description: 'If this field remains empty, the first service will be displayed.',
        of: [
          defineField({
            name: 'service',
            type: 'reference',
            title: 'Service',
            to: [{ type: 'Service_Collection' }],
            options: {
              disableNew: true,
              filter: filterReferences({
                additionalFilter: 'defined(slug.current) && !isSubPage',
                checkUnique: true,
              }),
            },
            validation: Rule => Rule.required(),
          }),
        ],
      }),
      defineField({
        name: 'links',
        type: 'array',
        title: 'Links',
        of: [LinkField],
        validation: Rule => Rule.min(1).max(3).unique(),
      }),
    ],
    validation: Rule =>
      Rule.custom(value => {
        if (!value && isRequired) return 'Required';
        return true;
      }),
  }),
];

export default defineType({
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  icon: LinkIcon,
  fields: getNavigationFields({ isRequired: true }),
});
