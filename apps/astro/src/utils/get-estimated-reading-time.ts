import type { PortableTextProps } from 'astro-portabletext/types';
import type { PortableTextBlock } from '@portabletext/types';
import { toPlainText } from 'astro-portabletext';

export function getEstimatedReadingTime(content: PortableTextProps['value']) {
  function getTextFromCustomBlock(block: any) {
    if (block?._type === 'Quote') {
      const text = toPlainText(block.text as PortableTextBlock).trim();
      return `${text} ${block.author || ''}`;
    }

    return '';
  }

  const contentArray = Array.isArray(content) ? content : [content];
  if (contentArray.length === 0) return '0 minut czytania';

  const plainText = contentArray
    .map(block => {
      if (block?._type === 'block') return toPlainText(block as PortableTextBlock).trim();
      return getTextFromCustomBlock(block);
    })
    .join(' ');

  if (plainText === '') return '0 minut czytania';

  const readingTime = (text: string) => {
    const countWords = (text: string) => {
      const trimmedText = text.trim();
      if (trimmedText === '') return 0;
      const words = trimmedText.split(/\s+/);
      return words.length;
    };
    const words = countWords(text);
    const averageReadingSpeedWordsPerMinute = 200;
    const readingTime = Math.ceil(words / averageReadingSpeedWordsPerMinute);
    return readingTime;
  };

  const getMinuteText = (minutes: number) => {
    if (minutes === 1) return 'minuta';
    if (minutes >= 2 && minutes <= 4) return 'minuty';
    return 'minut';
  };

  const estimatedReadingTime = readingTime(plainText);
  return `${estimatedReadingTime} ${getMinuteText(estimatedReadingTime)} czytania`;
}
