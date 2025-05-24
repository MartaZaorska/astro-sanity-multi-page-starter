export function validateTime(value: any) {
  if (!value) return 'Time is required';
  if (value && !value.match(/^\d{2}:\d{2}$/)) return 'Time must be in the format HH:MM';
  const [h, m] = value.split(':').map(Number);
  if (h > 24 || m > 60)
    return 'Time must be in format HH:MM, with hours from 00 to 23 and minutes from 00 to 59';
  return true;
}
