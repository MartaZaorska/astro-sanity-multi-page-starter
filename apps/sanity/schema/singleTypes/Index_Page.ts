import { HomeIcon } from 'lucide-react';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';
import { definePage } from '../../templates/page';

export default definePage({
  name: 'Index_Page',
  title: 'Homepage',
  icon: HomeIcon,
  additionalFields: [
    ...defineSlugForDocument({ slug: '/' }).map(field => ({ ...field, group: 'content' })),
  ],
});
