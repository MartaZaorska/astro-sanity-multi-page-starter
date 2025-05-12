import { BanIcon } from 'lucide-react';
import { Iframe, type IframeProps } from 'sanity-plugin-iframe-pane';
import { PREVIEW_DOMAIN } from '../constants';

export const Preview = ({ document }: { document: IframeProps['document'] }) => {
  const getPreviewInfo = (missing: 'slug' | 'domain') => {
    return (
      <div style={{ padding: '1rem', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <BanIcon size={18} /> Preview not available: The {missing} is missing
      </div>
    );
  };

  const slug = (document.displayed.slug as { current?: string })?.current;
  if (!slug) return getPreviewInfo('slug');
  if (!PREVIEW_DOMAIN) return getPreviewInfo('domain');
  return (
    <Iframe
      document={document}
      options={{ url: `${PREVIEW_DOMAIN}${slug}`, reload: { button: true } }}
    />
  );
};
