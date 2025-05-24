import { type FieldDefinition, defineType, defineField } from 'sanity';
import { FileTextIcon, SearchIcon, type LucideIcon } from 'lucide-react';

type Page =
  | 'Index_Page'
  | 'Blog_Page'
  | 'PrivacyPolicy_Page'
  | 'NotFound_Page'
  | 'BlogCategory_Collection'
  | 'BlogPost_Collection'
  | 'Service_Collection';

type Props = {
  name: Page;
  title: string;
  icon: LucideIcon | React.FC | string;
  withComponents?: boolean;
  additionalFields?: FieldDefinition<
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'array'
    | 'block'
    | 'date'
    | 'datetime'
    | 'document'
    | 'file'
    | 'geopoint'
    | 'image'
    | 'reference'
    | 'crossDatasetReference'
    | 'globalDocumentReference'
    | 'slug'
    | 'text'
    | 'url'
    | 'email',
    undefined
  >[];
};

export const definePage = ({
  name,
  title,
  icon,
  withComponents = true,
  additionalFields = [],
}: Props) =>
  defineType({
    type: 'document',
    name,
    title,
    icon,
    options: { documentPreview: true },
    fields: [
      ...additionalFields,
      ...(withComponents
        ? [
            defineField({
              name: 'components',
              type: 'components',
              title: 'Page Components',
              group: 'content',
            }),
          ]
        : []),
      defineField({
        name: 'seo',
        type: 'seo',
        title: 'SEO',
        group: 'seo',
      }),
    ],
    groups: [
      {
        name: 'content',
        title: 'Content',
        icon: () => <FileTextIcon size={18} />,
      },
      {
        name: 'seo',
        title: 'SEO',
        icon: () => <SearchIcon size={18} />,
      },
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'slug.current',
        media: 'image',
        icon: 'icon',
      },
    },
  });
