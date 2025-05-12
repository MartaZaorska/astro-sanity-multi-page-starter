// Single Types
import global from '../schema/singleTypes/global/settings';
import redirects from '../schema/singleTypes/global/redirects';
import navigation from '../schema/singleTypes/global/navigation';
import socialMedia from '../schema/singleTypes/global/socialMedia';
import Index_Page from '../schema/singleTypes/Index_Page';
import Blog_Page from '../schema/singleTypes/Blog_Page';
import NotFound_Page from '../schema/singleTypes/NotFound_Page';
import PrivacyPolicy_Page from '../schema/singleTypes/PrivacyPolicy_Page';

const singleTypes = [
  global,
  redirects,
  navigation,
  socialMedia,
  Index_Page,
  Blog_Page,
  NotFound_Page,
  PrivacyPolicy_Page,
];

// Collections Types
import Faq_Collection from '../schema/collectionTypes/Faq_Collection';
import BlogCategory_Collection from '../schema/collectionTypes/BlogCategory_Collection';
import BlogPost_Collection from '../schema/collectionTypes/BlogPost_Collection';
import Service_Collection from '../schema/collectionTypes/Service_Collection';

const collectionTypes = [Faq_Collection, BlogCategory_Collection, BlogPost_Collection, Service_Collection];

// Components
import Components from '../schema/Components';

const components = [Components];

// UI Components
import cta from '../schema/ui/cta';
import PortableText from '../schema/ui/PortableText';
import Heading from '../schema/ui/PortableText/Heading';
import seo from '../schema/ui/seo';
import formStates from '../schema/ui/formStates';

const ui = [cta, seo, formStates, PortableText, Heading];

export const schemaTypes = [...singleTypes, ...collectionTypes, ...components, ...ui];

export const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
export const singletonTypes = new Set(singleTypes.map(type => type.name as string));
