export const formatDate = (date: Date | string) => {
  const dateObject = new Date(date);
  if (!dateObject) return null;
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObject);
};
