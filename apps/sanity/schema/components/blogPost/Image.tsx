import { ImageIcon } from 'lucide-react';
import { defineField } from 'sanity';

const name = 'Image';
const title = 'Image';
const icon = () => <ImageIcon size={15} />;

export default defineField({
  name,
  type: 'image',
  title,
  icon,
  validation: Rule => Rule.required(),
});
