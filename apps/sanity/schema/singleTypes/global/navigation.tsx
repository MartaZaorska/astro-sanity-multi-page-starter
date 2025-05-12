import { LinkIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { InternalLinkableTypes } from '../../../structure/internal-linkable-types';
import { filterReferences } from '../../../utils/filter-references';

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
          if (linkType === 'anchor' && !value) return 'You must define a title for the anchor link.';
          return true;
        }),
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Type',
      description: (
        <>
          <em>Internal</em> (within your site), or <em>Anchor</em> (section on same page)
        </>
      ),
      options: {
        list: ['internal', 'anchor'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'internal',
      type: 'reference',
      title: 'Internal reference to page',
      description: 'Select an internal page to link to.',
      to: InternalLinkableTypes,
      options: {
        disableNew: true,
        filter: 'defined(slug.current)',
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: Rule =>
        Rule.custom((value, { parent }) => {
          const linkType = (parent as { linkType?: string })?.linkType;
          if (linkType === 'internal' && !value?._ref) return 'You have to choose internal page to link to.';
          return true;
        }),
    }),
    defineField({
      name: 'anchor',
      type: 'string',
      title: 'Anchor ID',
      description: 'Enter the ID of the section to scroll to (with the # symbol)',
      hidden: ({ parent }) => parent?.linkType !== 'anchor',
      validation: Rule =>
        Rule.custom((value, { parent }) => {
          const linkType = (parent as { linkType?: string })?.linkType;
          if (linkType !== 'anchor') return true;
          if (!value) return 'Anchor ID is required';
          if (!value.startsWith('#')) return 'Include the # symbol';
          if (!/^#[a-zA-Z0-9_-]+$/.test(value))
            return 'Anchor ID should only contain letters, numbers, hyphens or underscores';

          return true;
        }),
    }),
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
        subtitle: linkType == 'internal' ? `${internal}` : `${anchor}`,
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
              filter: filterReferences({ additionalFilter: 'defined(slug.current) && !isSubPage', checkUnique: true }),
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
              filter: filterReferences({ additionalFilter: 'defined(slug.current) && !isSubPage', checkUnique: true }),
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
