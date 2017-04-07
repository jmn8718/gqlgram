import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import subDays from 'date-fns/sub_days';
import isBefore from 'date-fns/is_before';
import format from 'date-fns/format';

const options = {
  includeSeconds: true,
  addSuffix: true,
};

export const getTimeInWords = (time) => {
  const previousDate = subDays(new Date(), 1);
  if (isBefore(time, previousDate)) {
    return format(previousDate, 'MMMM D');
  }
  return distanceInWordsToNow(time, {includeSeconds: true, addSuffix: true});
}
