export const daysShort = [
  { value: 0, label: 'L' },
  { value: 1, label: 'M' },
  { value: 2, label: 'M' },
  { value: 3, label: 'J' },
  { value: 4, label: 'V' },
  { value: 5, label: 'S' },
  { value: 6, label: 'D' },
];

export const diffDays = (date1, date2) => {

  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2);

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);

}