import { CalendarDTO, CalendarEventInfo, DateProps } from '../types/types';

export const getCalEventInfo = (
  { date, eventList }:
  {
    date: { year: number, month: number },
    eventList: CalendarDTO[],
  }
) => {
  const dateNum: number = new Date(date.year, date.month - 1, 0).getDate();
  const startDay: number = (new Date(date.year, date.month - 1, 1).getDay() - 1) % 7;

  let eventInfoList: CalendarEventInfo[] = [];
  let topList: number[][] = Array.from({ length: dateNum + 1 }, () => new Array(4).fill(0));

  for (const event of eventList) {
    let top = 0;
    
    const s = event.start_year == date.year && event.start_month == date.month ? event.start_date : 1;
    const e = event.end_year == date.year && event.end_month == date.month ? event.end_date : dateNum;

    for (let i = s; i <= e; i++) {
      const day = (i + startDay - 1) % 7;

      if (i === s || day === 0) {
        top = 3;
        for (let j = 0; j < 4; j++) {
          if (topList[i][j] == 0) {
            top = j;
            break;
          }
        }
      }

      topList[i][top] = 1;

      if (i === e) {
        let day = (i + startDay - 1) % 7 + 1;
  
        eventInfoList.push({
          event: event,
          width: Math.min(e - s + 1, day),
          top: top,
          start: Math.max(s, e - day + 1),
        });
      } else if (day === 6) {
        eventInfoList.push({
          event: event,
          width: Math.min(i - s + 1, 7),
          top: top,
          start: Math.max(s, i - 6),
        });
      }
    }
  }

  return eventInfoList;
}