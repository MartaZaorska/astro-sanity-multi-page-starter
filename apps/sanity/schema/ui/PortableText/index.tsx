import { LinkIcon } from 'lucide-react';
import { defineField } from 'sanity';
import { CustomInput } from './CustomInput';
import { getLinkFields, type LinkTypes } from '../link';

type PortableTextPropsTypes = {
  name?: string;
  title?: string;
  allowHeadings?: boolean;
  useCustomInput?: boolean;
  linkTypes?: LinkTypes[];
  components?: any[];
  additionalFields?: Record<string, any>;
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
              icon: () => <LinkIcon size={15} />,
              fields: getLinkFields({ allowInternalWithAnchor: true, linkTypes }),
            }),
          ],
        },
      }),
      ...components,
    ],
  });

export default PortableText({});
