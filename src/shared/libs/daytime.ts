import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const isValidDate = ({
  date,
  strFormat = 'DD-MM-YYYY',
}: {
  date: string;
  strFormat?: 'DD-MM-YYYY' | 'YYYY-MM-DD';
}): boolean => {
  return dayjs(date, strFormat, true).isValid();
};

export default dayjs;
