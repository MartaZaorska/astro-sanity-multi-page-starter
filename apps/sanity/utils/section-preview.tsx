import type { LucideIcon } from 'lucide-react';
import { Tooltip, Box } from '@sanity/ui';

export const sectionPreview = ({
  imgUrl,
  icon,
}: {
  imgUrl: string;
  icon: LucideIcon | React.FC | string;
}) => {
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
      <span style={{ cursor: 'zoom-in' }}>{typeof icon === 'string' ? icon : <Icon />}</span>
    </Tooltip>
  );

  return {
    media: Preview,
    icon: Preview,
  };
};
