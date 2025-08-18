import { HOLIDAY_KEY } from '../assets/data/key';
import execDB from './db/execDB';
import SQLite from 'react-native-sqlite-storage';

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

const saveHoliday = async ({ db }: { db: SQLite.SQLiteDatabase }) => {
  const year = new Date().getFullYear();

  for (let i = year - 0; i <= year + 0; i++) {
    const holidayList: null | HolidayDTO[] = await getHoliday({year: i});
    if (!holidayList) continue;

    for (const holiday of holidayList) {
      const year = String(holiday.locdate).substring(0, 4);
      const month = String(holiday.locdate).substring(4, 6);
      const date = String(holiday.locdate).substring(6);

      execDB({
        db: db,
        query: 'INSERT INTO calendar (name, location, color, start_date, start_month, start_year, end_date, end_month, end_year, all_day, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        params: [holiday.dateName, '', '#FF2A00', date, month, year, date, month, year, 1, '']
      });
    }
  }
}

export default saveHoliday;