import { LinkIcon } from 'lucide-react';
import { defineField } from 'sanity';
import { CustomInput } from './CustomInput';
import { isValidUrl } from '../../../utils/is-valid-url';
import { InternalLinkableTypes } from '../../../structure/internal-linkable-types';

type LinkTypes = 'external' | 'internal' | 'anchor';

type PortableTextPropsTypes = {
  name?: string;
  title?: string;
  allowHeadings?: boolean;
  useCustomInput?: boolean;
  linkTypes?: LinkTypes[];
  components?: any[];
  additionalFields?: Record<string, any>;
};

const generateDescription = (linkTypes: LinkTypes[]) => {
  const descriptions = {
    external: 'External (other websites)',
    internal: 'Internal (within your site)',
    anchor: 'Anchor (section on the same page)',
  };

  const filteredDescriptions = linkTypes.map(type => descriptions[type]).filter(Boolean);

  return <>{filteredDescriptions.join(', ')}</>;
};

export const PortableText = ({
  name,
  title,
  allowHeadings = false,
  useCustomInput = true,
  linkTypes = ['external', 'internal', 'anchor'],
  components = [],
  additionalFields = {},
}: PortableTextPropsTypes) =>
  defineField({
    name: name || 'PortableText',
    type: 'array',
    title: title || 'Portable Text',
    ...additionalFields,
    components: {
      // @ts-ignore
      input: useCustomInput ? CustomInput : null,
    },
    of: [
      defineField({
        type: 'block',
        name: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          ...(allowHeadings
            ? [
                {
                  title: 'Heading 2',
                  value: 'h2',
                  component: ({ children }: { children: React.ReactNode }) => (
                    <h2 style={{ fontSize: '1.7rem', fontWeight: 500, margin: 0 }}>{children}</h2>
                  ),
                },
                {
                  title: 'Heading 3',
                  value: 'h3',
                  component: ({ children }: { children: React.ReactNode }) => (
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 500, margin: 0 }}>{children}</h3>
                  ),
                },
              ]
            : []),
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' },
        ],
        marks: {
          decorators: [
            {
              title: 'Strong',
              value: 'strong',
              component: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
            },
            { title: 'Emphasis', value: 'em' },
          ],
          annotations: [
            defineField({
              name: 'link',
              type: 'object',
              title: 'Link',
              icon: () => <LinkIcon size={18} />,
              fields: [
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
                  description: 'Specify the full URL. Ensure it starts with "https://", "mailto:" or "tel:" protocol.',
                  hidden: ({ parent }) => parent?.linkType !== 'external',
                  validation: Rule =>
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
                      if (linkType === 'internal' && !value?._ref)
                        return 'You have to choose internal page to link to.';
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
            }),
          ],
        },
      }),
      ...components,
    ],
  });

export default PortableText({});
