import { CalendarDTO, CalendarEventInfo, CalendarOverflowInfo } from '../types/types';

export const getCalEventInfo = (
  { date, eventList, height }:
  {
    date: { year: number, month: number },
    eventList: CalendarDTO[],
    height: number,
  }
) => {
  const dateNum: number = new Date(date.year, date.month, 0).getDate();
  const startDay: number = (new Date(date.year, date.month - 1, 1).getDay() - 1) % 7;

  const eventInfoList: CalendarEventInfo[] = [];
  const overflowList: CalendarOverflowInfo[] = [];
  const dateEventList: CalendarDTO[][] = Array.from({ length: dateNum + 1 }, () => new Array(0));
  const topList: number[][] = Array.from({ length: dateNum + 1 }, () => new Array(height).fill(0));
  const overflowDate = new Set<number>();

  for (const event of eventList) {
    let top = 0;
    
    const s = event.start_year == date.year && event.start_month == date.month ? event.start_date : 1;
    const e = event.end_year == date.year && event.end_month == date.month ? event.end_date : dateNum;

    for (let i = s; i <= e; i++) {
      dateEventList[i].push(event);

      const day = (i + startDay - 1) % 7;

      if (i === s || day === 0) {
        top = height-1;
        for (let j = 0; j < height; j++) {
          if (topList[i][j] == 0) {
            top = j;
            break;
          }
        }
      }

      topList[i][top] += 1;

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

  for (let i = 1; i <= dateNum; i++) {
    if (topList[i][height-1] > 1) {
      overflowDate.add(i);

      overflowList.push({
        eventNum: topList[i][height-1],
        top: height-1,
        start: i,
      });
    }
  }

  const eventNum = eventInfoList.length;

  for (let i = 0; i < eventNum; i++) {
    const info = eventInfoList[i];
    if (info.top !== height-1) continue;

    const event = info.event;
    const s = event.start_year === date.year && event.start_month === date.month ? event.start_date : 1;
    const e = event.end_year === date.year && event.end_month === date.month ? event.end_date : dateNum;

    for (let j = s; j <= e; j++) {
      if (overflowDate.has(j)) {
        const curStart = eventInfoList[i].start;

        if (j !== curStart) {
            eventInfoList.push({
            event: event,
            width: j - curStart,
            top: info.top,
            start: curStart,
          });
        }

        eventInfoList[i].start = j + 1;
        eventInfoList[i].width -= j - curStart + 1;
      }
    }
  }

  return {
    eventInfoList: eventInfoList.filter((event) => event.width !== 0),
    overflowList: overflowList,
    dateEventList: dateEventList,
  };
}