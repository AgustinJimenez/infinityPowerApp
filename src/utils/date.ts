import { format } from 'date-fns';
// Require Esperanto locale
import { es } from 'date-fns/locale';

function capitalizeTheFirstLetter(dateString: string) {
  return dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

export const formatMonthDayYear = (date: string) => {
  const dateString = format(new Date(date), 'MMMM d, yyyy', { locale: es });
  return capitalizeTheFirstLetter(dateString);
};

export const formatYearDayMonth = (date: Date) => {
  return format(date, 'yyyy-dd-MM');
};
