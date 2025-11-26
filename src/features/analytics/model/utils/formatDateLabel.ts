export const formatDateLabel = (date: string) => {
  if (date.match(/[A-Za-z]+\s+\d+-[A-Za-z]+\s+\d+/)) {
    return date.split('-')[0].trim();
  }

  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleDateString('en-US', { month: 'short' });

  return `${month} ${day}`;
};
