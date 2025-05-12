import { CircleCheckIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

const name = 'formStates';
const title = 'Form States';
const icon = CircleCheckIcon;

export default defineType({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'success',
      type: 'object',
      title: 'Success State',
      options: {
        collapsed: true,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Heading',
          validation: Rule => Rule.required(),
          initialValue: [
            {
              _type: 'block',
              style: 'normal',
              children: [{ _type: 'span', text: 'Pomyślnie wysłano wiadomość' }],
            },
          ],
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Message Content',
          validation: Rule => Rule.required(),
          initialValue: [
            {
              _type: 'block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Odpowiemy najszybciej jak to będzie możliwe.',
                },
              ],
            },
          ],
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'error',
      type: 'object',
      title: 'Error State',
      options: {
        collapsed: true,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Heading',
          validation: Rule => Rule.required(),
          initialValue: [
            {
              _type: 'block',
              style: 'normal',
              children: [{ _type: 'span', text: 'Wiadomość nie została wysłana' }],
            },
          ],
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Message Content',
          validation: Rule => Rule.required(),
          initialValue: [
            {
              _type: 'block',
              style: 'normal',
              children: [{ _type: 'span', text: 'Spróbuj ponownie lub skontaktuj się z nami telefonicznie.' }],
            },
          ],
        }),
      ],
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({
      title,
      icon,
    }),
  },
});
