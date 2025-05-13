export default async function imageToInlineSvg(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('image/svg+xml')) return null;
    return await response.text();
  } catch (error) {
    throw new Error(`Error fetching SVG: ${error}`);
  }
}
