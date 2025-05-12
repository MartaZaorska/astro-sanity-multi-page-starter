import { MessageCircleQuestionIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'Faq_Collection';
const title = 'FAQ';
const icon = MessageCircleQuestionIcon;

export default defineType({
  name,
  title,
  icon,
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      type: 'Heading',
      title: 'Question',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'PortableText',
      title: 'Answer',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      question: 'question',
      answer: 'answer',
    },
    prepare: ({ question, answer }) => ({
      title: toPlainText(question),
      subtitle: toPlainText(answer),
      icon,
    }),
  },
});
