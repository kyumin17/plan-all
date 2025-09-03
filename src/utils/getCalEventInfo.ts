import { CalendarDTO, CalendarEventInfo } from '../types/types';

export const getCalEventInfo = (
  { eventList, startDay, dateNum }:
  {
    eventList: CalendarDTO[],
    startDay: number,
    dateNum: number,
  }
) => {
  let eventInfoList: CalendarEventInfo[] = [];
  let topList: number[][] = Array.from({ length: dateNum + 1 }, () => new Array(4).fill(0));

  for (const event of eventList) {
    let top = 0;

    for (let i = event.start_date; i <= event.end_date; i++) {
      if (i == event.start_date || (i - startDay) % 7 == 1) {
        for (let j = 0; j < 4; j++) {
          if (topList[event.start_date][j] == 0) {
            top = j;
            break;
          }
        }
      }

      topList[i][top] = 1;

      if (i == event.end_date) {
        let day = (i + startDay - 1) % 7 + 1;
  
        eventInfoList.push({
          event: event,
          width: Math.min(event.end_date - event.start_date + 1, day),
          top: top,
          start: Math.max(event.start_date, event.end_date - day + 1),
        });
      } else if ((i - startDay) % 7 == 0) {
        eventInfoList.push({
          event: event,
          width: Math.min(i - event.start_date + 1, 7),
          top: top,
          start: Math.max(event.start_date, i - 6),
        });
      }
    }
  }

  return eventInfoList;
}