import { ComponentsQuery, type ComponentsProps } from '@/components/Components.astro';
import sanityFetch from '@/utils/sanity.fetch';
import metadataFetch from '@/utils/metadata.fetch';

export type QueryProps = {
  name: string;
  slug: string;
  _type: string;
  components?: ComponentsProps;
};

export default async function pageFetch<AdditionalQueryProps>({
  slug,
  metadataSlug,
  additionalQuery = '',
}: {
  slug: string;
  metadataSlug?: string;
  additionalQuery?: string;
}) {
  const page = await sanityFetch<AdditionalQueryProps & QueryProps>({
    query: `
      *[slug.current == $slug][0]{
        name,
        "slug": slug.current,
        _type,
        ${ComponentsQuery}
        ${additionalQuery}
      }
    `,
    params: { slug },
  });

  if (!page) return null;

  const metadata = await metadataFetch(metadataSlug || page.slug);

  return {
    page,
    metadata,
  };
}
