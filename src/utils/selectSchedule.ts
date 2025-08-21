import selectDB from './db/selectDB';
import { TimeblockDTO, CalendarDTO, ScheduleDTO, DateProps } from '../types/types';
import SQLite from 'react-native-sqlite-storage';

interface TimeTableFilter {
  day: number;
}

interface CalendarFilter {
  start_year: number;
  start_month: number;
  start_date: number;
}

// const timeblockToSchedule = (schedule: TimeblockDTO) => {
//   return {
//     id: schedule.id,
//     year: schedule.year,
//     month: number,
//     date: number,
//     name: schedule.name,
//     start_hour: schedule.start_hour,
//     start_minute: schedule.start_minute,
//     end_hour: schedule.end_hour,
//     end_minute: schedule.end_minute,
//     location: schedule.location,
//     color: schedule.color,
//     all_day: 0,
//   };
// }

// const calendarToSchedule = (event: CalendarDTO) => {
//   return {
//     id: event.id,
//     year: event.start_year,
//     month: event.start_month,
//     date: event.start_date,
//     name: event.name,
//     start_hour: event.start_hour,
//     start_minute: event.start_minute,
//     end_hour: event.end_hour,
//     end_minute: event.end_minute,
//     location: event.location,
//     color: event.color,
//     all_day: event.all_day,
//     description: event.description,
//   };
// }

// const changeScheduleFormat = (schedule: TimeblockDTO | CalendarDTO) => {
//   return {
//     id: schedule.id,
//     year: schedule.,
//     month: number,
//     date: number,
//     name: schedule.name,
//     start_hour: schedule.start_hour,
//     start_minute: schedule.start_minute,
//     end_hour: schedule.end_hour,
//     end_minute: schedule.end_minute,
//     location: schedule.location,
//     color: schedule.color,
//     all_day: 'all_day' in schedule ? schedule.all_day : 0,
//   };
// }

const selectSchedule = async (
  { db, date }:
  {
    db: SQLite.SQLiteDatabase | null,
    date?: DateProps,
  }
) => {
  if (!db) return null;

  const scheduleList: ScheduleDTO[] = [];

  // await selectDB<TimeTableFilter>({
  //   db: db,
  //   tableName: 'timetable',
  //   filter: {
  //     findFilter: date ? { 
  //       day: (new Date(date.year, date.month - 1, date.date).getDay() + 6) % 7
  //     } : undefined,
  //   },
  // }).then((res) => {
  //   if (!res) return;
  
  //   for (const item of res) {
  //     scheduleList.push(changeScheduleFormat(item));
  //   }
  // });

  // await selectDB<CalendarFilter>({
  //   db: db,
  //   tableName: 'calendar',
  //   filter: {
  //     findFilter: date ? {
  //       start_year: date.year,
  //       start_month: date.month,
  //       start_date: date.date,
  //     } : undefined,
  //   },
  // }).then((res) => {
  //   if (!res) return;

  //   for (const item of res) {
  //     scheduleList.push(calendarToSchedule(item));
  //   }
  // });

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