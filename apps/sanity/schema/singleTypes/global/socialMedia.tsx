import { UsersRoundIcon } from 'lucide-react';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'socials',
  type: 'document',
  title: 'Social Media',
  icon: UsersRoundIcon,
  fields: [
    defineField({
      name: 'instagram',
      type: 'url',
      title: 'Instagram',
      validation: Rule => Rule.uri({ scheme: ['https'] }).error('Provide a valid URL (starting with https://)'),
    }),
    defineField({
      name: 'facebook',
      type: 'url',
      title: 'Facebook',
      validation: Rule => Rule.uri({ scheme: ['https'] }).error('Provide a valid URL (starting with https://)'),
    }),
    defineField({
      name: 'tiktok',
      type: 'url',
      title: 'TikTok',
      validation: Rule => Rule.uri({ scheme: ['https'] }).error('Provide a valid URL (starting with https://)'),
    }),
    defineField({
      name: 'linkedin',
      type: 'url',
      title: 'LinkedIn',
      validation: Rule => Rule.uri({ scheme: ['https'] }).error('Provide a valid URL (starting with https://)'),
    }),
  ],
  //validation: Rule => Rule.required(),
});
