import selectDB from './db/selectDB';
import { TimeblockProps, CalendarProps, ScheduleDTO } from '../types/types';
import SQLite from 'react-native-sqlite-storage';

interface TimeTableFilter {
  day: number;
}

interface CalendarFilter {
  start_year: number;
  start_month: number;
  start_date: number;
}

const changeScheduleFormat = (schedule: TimeblockProps | CalendarProps) => {
  return {
    id: schedule.id,
    name: schedule.name,
    start_hour: schedule.start_hour,
    start_minute: schedule.start_minute,
    end_hour: schedule.end_hour,
    end_minute: schedule.end_minute,
    location: schedule.location,
    color: schedule.color,
    all_day: 'all_day' in schedule ? schedule.all_day : 0,
  };
}

const selectSchedule = async (
  { db, year, month, date }:
  {
    db: SQLite.SQLiteDatabase | null;
    year: number; 
    month: number; 
    date: number;
  }
) => {
  if (!db) return null;

  const scheduleList: ScheduleDTO[] = [];

  await selectDB<TimeTableFilter>({
    db: db,
    tableName: 'timetable',
    filter: {
      findFilter: { day: (new Date(year, month - 1, date).getDay() + 6) % 7 },
    },
  }).then((res) => {
    if (!res) return;
  
    for (const item of res) {
      scheduleList.push(changeScheduleFormat(item));
    }
  });

  await selectDB<CalendarFilter>({
    db: db,
    tableName: 'calendar',
    filter: {
      findFilter: {
        start_year: year,
        start_month: month,
        start_date: date,
      },
    },
  }).then((res) => {
    if (!res) return;

    for (const item of res) {
      scheduleList.push(changeScheduleFormat(item));
    }
  });

  scheduleList.sort((a, b) => {
    const startHourA = a.start_hour ?? -1;
    const startHourB = b.start_hour ?? -1;

    if (startHourA !== startHourB) {
      return startHourA - startHourB;
    }

    const startMinuteA = a.start_minute ?? -1;
    const startMinuteB = b.start_minute ?? -1;

    return startMinuteA - startMinuteB;
  });

  return scheduleList;
}

export default selectSchedule;