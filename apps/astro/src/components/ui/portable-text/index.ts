export { default, type PortableTextValue } from './index.astro';

export const PortableTextQuery = (name?: string) => `
  ${name ? `${name}[]{` : ''}
    ...,
    "markDefs": coalesce(markDefs[] {
      ...,
      _type == "link" => {
        _type,
        _key,
        "type": linkType,
        "href": select(linkType == "internal" => internal -> slug.current, linkType == "external" => external, linkType == "anchor" => anchor, "#"),
      }
    }, []),
  ${name ? `},` : ''}
`;
