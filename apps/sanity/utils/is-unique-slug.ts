import type { SlugIsUniqueValidator } from 'sanity';
import { API_VERSION } from '../constants';

export const isUniqueSlug: SlugIsUniqueValidator = async (slug, { document, getClient }) => {
  const client = getClient({ apiVersion: API_VERSION });
  const id = document?._id.replace(/^drafts\./, '');
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  const params = { draft: `drafts.${id}`, published: id, slug };
  const result = await client.fetch<boolean>(query, params);
  return result;
};
