import { defineField } from 'sanity';
import { InternalLinkableTypes } from '../../structure/internal-linkable-types';
import { isValidUrl } from '../../utils/is-valid-url';

export type LinkTypes = 'external' | 'internal' | 'anchor';

const generateDescription = (linkTypes: LinkTypes[]) => {
  const descriptions = {
    external: 'External (other websites)',
    internal: 'Internal (within your site)',
    anchor: 'Anchor (section on the same page)',
  };

  const filteredDescriptions = linkTypes.map(type => descriptions[type]).filter(Boolean);

  return <>{filteredDescriptions.join(', ')}</>;
};

export const getLinkFields = ({
  linkTypes = ['external', 'internal', 'anchor'],
  allowInternalWithAnchor = false,
}: {
  linkTypes?: LinkTypes[];
  allowInternalWithAnchor?: boolean;
}) => [
  defineField({
    name: 'linkType',
    type: 'string',
    title: 'Type',
    description: generateDescription(linkTypes),
    options: {
      list: linkTypes,
      layout: 'radio',
      direction: 'horizontal',
    },
    initialValue: linkTypes[0],
    validation: Rule => Rule.required(),
  }),
  defineField({
    name: 'external',
    type: 'string',
    title: 'URL',
    description:
      'Specify the full URL. Ensure it starts with "https://", "mailto:" or "tel:" protocol.',
    hidden: ({ parent }) => parent?.linkType !== 'external',
    validation: Rule => [
      Rule.custom((value, { parent }) => {
        const linkType = (parent as { linkType?: string })?.linkType;
        if (linkType === 'external') {
          if (!value) return 'URL is required';
          if (
            !value.startsWith('https://') &&
            !value.startsWith('mailto:') &&
            !value.startsWith('tel:')
          ) {
            return 'External link must start with the "https://", "mailto:" or "tel:" protocol';
          }
          if (!isValidUrl(value)) return 'Invalid URL';
        }
        return true;
      }),
    ],
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
    validation: rule => [
      rule.custom((value, { parent }) => {
        const type = (parent as { linkType?: string })?.linkType;
        if (type === 'internal' && !value?._ref)
          return 'You have to choose internal page to link to.';
        return true;
      }),
    ],
  }),
  defineField({
    name: 'anchor',
    type: 'string',
    title: 'Anchor ID',
    description: 'Enter the ID of the section to scroll to (with the # symbol)',
    hidden: ({ parent }) =>
      allowInternalWithAnchor ? parent?.linkType === 'external' : parent?.linkType !== 'anchor',
    validation: Rule =>
      Rule.custom((value, { parent }) => {
        const linkType = (parent as { linkType?: string })?.linkType;
        if (
          linkType === 'external' ||
          (!allowInternalWithAnchor && linkType === 'internal') ||
          (allowInternalWithAnchor && linkType === 'internal' && !value)
        )
          return true;

        if (!value) return 'Anchor ID is required';
        if (!value.startsWith('#')) return 'Include the # symbol';
        if (!/^#[a-zA-Z0-9_-]+$/.test(value))
          return 'Anchor ID should only contain letters, numbers, hyphens or underscores';
        return true;
      }),
  }),
];
