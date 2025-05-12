import type { LucideIcon } from 'lucide-react';
import { Tooltip, Box } from '@sanity/ui';

export const sectionPreview = ({ imgUrl, icon }: { imgUrl: string; icon: LucideIcon | string }) => {
  const Icon = icon;
  const Preview = () => (
    <Tooltip
      animate
      placement='top'
      portal
      content={
        <Box padding={2}>
          <img
            src={imgUrl}
            width={610}
            alt=''
            style={{ maxWidth: '100%' }}
          />
        </Box>
      }
    >
      <span
        style={{
          width: '2rem',
          height: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'zoom-in',
          margin: '-0.75rem',
        }}
      >
        {typeof icon === 'string' ? icon : <Icon />}
      </span>
    </Tooltip>
  );

  return {
    media: Preview,
    icon: Preview,
  };
};
