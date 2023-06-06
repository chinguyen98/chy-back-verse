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

export const getDateFromStr = (strDate: string, strFormat = 'DD-MM-YYYY'): Date => {
  return dayjs(strDate, strFormat).toDate();
};

export const getUnixtimeFromStr = (strDate: string, strFormat = 'DD-MM-YYYY') => {
  return dayjs(strDate, strFormat).unix();
};

export default dayjs;
