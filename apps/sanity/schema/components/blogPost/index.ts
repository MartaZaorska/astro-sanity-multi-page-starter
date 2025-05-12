import { PortableText } from '../../ui/PortableText';

import Quote from './Quote';
import Image from './Image';

export default PortableText({
  name: 'content',
  title: 'Article Content',
  allowHeadings: true,
  useCustomInput: false,
  linkTypes: ['external', 'internal'],
  components: [Quote, Image],
});
