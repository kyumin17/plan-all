import { HOLIDAY_KEY } from '../assets/data/key';
import execDB from './db/execDB';
import SQLite from 'react-native-sqlite-storage';
import { Query } from '../types/types';

interface HolidayAPIProps {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    },
    body: {
      items: '' | {
        item: HolidayDTO[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    }
  }
};

interface HolidayDTO {
  dateKind: string;
  dateName: string;
  isHoliday: 'Y' | 'N';
  locdate: number;
  seq: number;
};

const getHoliday = async ({ year }: { year: number }) => {
  const url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';

  try {
    const params = {
      solYear: String(year),
      ServiceKey: HOLIDAY_KEY,
      _type: 'json',
      numOfRows: '100',
    };

    const query = new URLSearchParams(params).toString();

    const res: Response = await fetch(`${url}?${query}`);

    if (res.ok) {
      const data: HolidayAPIProps = await res.json();
      return data.response.body.items !== '' ? data.response.body.items.item: null;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const saveHoliday = async () => {
  let queries: Query[] = [];
  const year = new Date().getFullYear();
  
  for (let i = year - 20; i <= year + 20; i++) {
    const holidayList: null | HolidayDTO[] = await getHoliday({year: i});
    if (!holidayList) continue;

    for (const holiday of holidayList) {
      const y = String(holiday.locdate).substring(0, 4);
      const m = String(holiday.locdate).substring(4, 6);
      const d = String(holiday.locdate).substring(6);

      queries.push({
        query: 'INSERT INTO calendar (name, location, color, start_date, start_month, start_year, end_date, end_month, end_year, all_day, description, holiday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        params: [holiday.dateName, '', 'holiday', d, m, y, d, m, y, 1, '', 1]
      })
    }
  }

  return queries;
}

export default saveHoliday;