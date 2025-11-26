export const formatDateLabel = (date: string) => {
  const d = new Date(date);

  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
};
