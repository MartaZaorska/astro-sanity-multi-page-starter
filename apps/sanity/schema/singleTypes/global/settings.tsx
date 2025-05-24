import {
  SettingsIcon,
  MapPinIcon,
  FileTextIcon,
  Building2Icon,
  ChartSplineIcon,
} from 'lucide-react';
import { defineField, defineType } from 'sanity';
import Navigation from './navigation';
import { validateTime } from '../../../utils/validate-time';

export default defineType({
  name: 'global',
  type: 'document',
  title: 'Site Settings',
  icon: SettingsIcon,
  fields: [
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      group: 'contact',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'tel',
      type: 'string',
      title: 'Phone number (optional)',
      group: 'contact',
      validation: Rule =>
        Rule.regex(
          /^(?:\+(?:\d{1,3}))?(?:[ -]?\(?\d{1,4}\)?[ -]?\d{1,5}[ -]?\d{1,5}[ -]?\d{1,6})$/
        ).error('Invalid phone number'),
    }),
    defineField({
      name: 'openHours',
      type: 'object',
      options: { collapsible: true },
      title: 'Open hours',
      description: 'Enter time in HH:MM format',
      group: 'contact',
      fields: [
        defineField({
          name: 'weekdays',
          type: 'object',
          title: 'Monday - Friday',
          options: { collapsible: true },
          fields: [
            defineField({
              name: 'from',
              type: 'string',
              title: 'From',
              fieldset: 'time',
              validation: Rule => Rule.custom(validateTime),
            }),
            defineField({
              name: 'to',
              type: 'string',
              title: 'To',
              fieldset: 'time',
              validation: Rule => Rule.custom(validateTime),
            }),
          ],
          fieldsets: [
            {
              name: 'time',
              title: 'Time',
              description: 'Leave the fields blank if closed on weekdays',
              options: { columns: 2 },
            },
          ],
        }),
        defineField({
          name: 'saturday',
          type: 'object',
          title: 'Saturday',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: 'from',
              type: 'string',
              title: 'From',
              fieldset: 'time',
              validation: Rule => Rule.custom(validateTime),
            }),
            defineField({
              name: 'to',
              type: 'string',
              title: 'To',
              fieldset: 'time',
              validation: Rule => Rule.custom(validateTime),
            }),
          ],
          fieldsets: [
            {
              name: 'time',
              title: 'Time',
              description: 'Leave the fields blank if closed on Saturday',
              options: { columns: 2 },
            },
          ],
        }),
        defineField({
          name: 'sunday',
          type: 'object',
          title: 'Sunday',
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: 'from',
              type: 'string',
              title: 'From',
              fieldset: 'time',
              validation: Rule => Rule.custom(validateTime),
            }),
            defineField({
              name: 'to',
              type: 'string',
              title: 'To',
              fieldset: 'time',
              validation: Rule => Rule.custom(validateTime),
            }),
          ],
          fieldsets: [
            {
              name: 'time',
              title: 'Time',
              description: 'Leave the fields blank if closed on Sunday',
              options: { columns: 2 },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'address',
      type: 'object',
      title: 'Address',
      group: 'contact',
      options: { collapsible: true },
      fields: [
        defineField({
          name: 'street',
          type: 'string',
          title: 'Street',
          validation: Rule => Rule.required(),
          fieldset: 'addressDetails',
        }),
        defineField({
          name: 'city',
          type: 'string',
          title: 'City',
          validation: Rule => Rule.required(),
          fieldset: 'addressDetails',
        }),
        defineField({
          name: 'postalCode',
          type: 'string',
          title: 'Postal Code',
          validation: Rule => Rule.required(),
          fieldset: 'addressDetails',
        }),
        defineField({
          name: 'country',
          type: 'string',
          title: 'Country Code',
          description: 'Use uppercase ISO 3166-1 country code (e.g., PL or POL)',
          validation: Rule =>
            Rule.required()
              .uppercase()
              .custom(value => {
                if (!value) return true;
                if (!/^[A-Z]{2,3}$/.test(value)) {
                  return 'Country code must be 2 or 3 uppercase letters (ISO 3166-1 Alpha-2 or Alpha-3)';
                }
                return true;
              }),
          fieldset: 'addressDetails',
        }),
        defineField({
          name: 'mapLink',
          type: 'url',
          title: 'Map link',
          validation: Rule => Rule.uri({ scheme: 'https' }).required(),
        }),
      ],
      fieldsets: [
        {
          name: 'addressDetails',
          title: 'Address Details',
          options: { columns: 2 },
        },
      ],
    }),
    defineField({
      name: 'googleData',
      type: 'object',
      title: 'Google Data',
      options: { collapsible: true },
      group: 'google',
      fields: [
        defineField({
          name: 'rating',
          type: 'number',
          title: 'Rating (1.0 - 5.0)',
          validation: Rule => Rule.required().max(5).min(1),
          fieldset: 'rating',
        }),
        defineField({
          name: 'user_ratings_total',
          type: 'number',
          title: 'Number of reviews',
          validation: Rule => Rule.min(1).integer().required(),
          fieldset: 'rating',
        }),
      ],
      fieldsets: [
        {
          name: 'rating',
          title: 'Rating (Optional)',
          options: { columns: 2 },
        },
      ],
    }),
    defineField({
      name: 'organizationSchema',
      type: 'object',
      title: 'Organization structured data',
      group: 'organization',
      description: (
        <>
          Learn more about{' '}
          <a
            href='https://developers.google.com/search/docs/appearance/structured-data/organization?hl=en'
            target='_blank'
            rel='noreferrer'
          >
            Organization structured data
          </a>
        </>
      ),
      options: { collapsible: true },
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Name',
          description:
            'Enter the name of your organization as you want it to appear in search results.',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'text',
          rows: 3,
          title: 'Description',
          description:
            'A brief description of your organization that will appear in search results.',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'businessDetails',
          type: 'object',
          title: 'Business Details (optional)',
          description:
            "Additional business information that enhances your organization's visibility in search results and builds trust with potential customers. While optional, providing these details can significantly improve your SEO ranking.",
          options: { collapsible: true },
          fields: [
            defineField({
              name: 'vatID',
              type: 'string',
              title: 'VAT ID (NIP)',
              validation: Rule => Rule.regex(/^[0-9]{10}$/, 'NIP must be 10 digits'),
            }),
            defineField({
              name: 'regon',
              type: 'string',
              title: 'REGON',
              validation: Rule => Rule.regex(/^[0-9]{9}$/, 'REGON must be 9 digits'),
            }),
            defineField({
              name: 'legalName',
              type: 'string',
              title: 'Legal Company Name',
            }),
            defineField({
              name: 'foundingDate',
              type: 'date',
              title: 'Company Founding Date',
            }),
            defineField({
              name: 'founder',
              type: 'string',
              title: 'Founder (Full Name)',
            }),
            defineField({
              name: 'priceRange',
              type: 'number',
              title: 'Price Range',
              description: 'Select a price range from 1 ($) to 4 ($$$$)',
              validation: Rule => Rule.min(1).max(4).integer(),
              options: {
                list: [
                  { title: '$ - Budget', value: 1 },
                  { title: '$$ - Moderate', value: 2 },
                  { title: '$$$ - Expensive', value: 3 },
                  { title: '$$$$ - Luxury', value: 4 },
                ],
              },
            }),
          ],
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'Global SEO',
      group: 'seo-analytics',
      fields: [
        defineField({
          name: 'img',
          type: 'image',
          title: 'Social Share Image',
          description:
            'Social Share Image is visible when sharing website on social media. The dimensions of the image should be 1200x630px. For maximum compatibility, use JPG or PNG formats, as WebP may not be supported everywhere.',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      group: 'seo-analytics',
      options: { collapsible: true },
      description:
        'Configure analytics tracking tools to monitor page performance and user behavior. Leave fields empty to disable tracking.',
      fields: [
        defineField({
          name: 'gtmId',
          type: 'string',
          title: 'Google Tag Manager ID',
          description:
            'Format: GTM-XXXXXX. Container ID for managing analytics tools (GA4, Facebook Pixel, etc.).',
          validation: Rule =>
            Rule.custom(value => {
              if (!value) return true;
              if (!/^GTM-[A-Z0-9]{6,}$/.test(value)) {
                return 'GTM ID must be in format GTM-XXXXXX';
              }
              return true;
            }),
        }),
        defineField({
          name: 'metaPixelId',
          type: 'string',
          title: 'Meta (Facebook) Pixel ID',
          description: 'Format: XXXXXXXXXX. Used for Meta Pixel and Conversion API tracking.',
          validation: Rule =>
            Rule.custom(value => {
              if (!value) return true;
              if (!/^\d{15,16}$/.test(value)) {
                return 'Meta Pixel ID must be a 15-16 digit number';
              }
              return true;
            }),
        }),
        defineField({
          name: 'metaConversionToken',
          type: 'string',
          title: 'Meta Conversion API Token',
          description: 'Secret token for server-side Meta Conversion API tracking.',
        }),
      ],
    }),
  ],
  groups: [
    {
      name: 'contact',
      title: 'Contact Details',
      icon: () => <MapPinIcon size={18} />,
    },
    {
      name: 'google',
      title: 'Google Data',
      icon: () => <FileTextIcon size={18} />,
    },
    {
      name: 'seo-analytics',
      title: 'SEO & Analytics',
      icon: () => <ChartSplineIcon size={18} />,
    },
    {
      name: 'organization',
      title: 'Organization',
      icon: () => <Building2Icon size={18} />,
    },
  ],
});
