import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export const getDifference = (createdAt: Date) => {
  return formatDistanceToNow(
    new Date(createdAt),
    { locale: ru }
  );
};
