import { MessageCircleQuestionIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

export default defineType({
  name: 'Faq_Collection',
  title: 'FAQ',
  icon: MessageCircleQuestionIcon,
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
      title: question ? toPlainText(question) : 'FAQ Item',
      subtitle: answer ? toPlainText(answer) : '',
      icon: MessageCircleQuestionIcon,
    }),
  },
});
