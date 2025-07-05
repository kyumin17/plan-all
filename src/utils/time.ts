export const getTimeSum = (hour: number, minute: number) => {
  return hour * 60 + minute;
};

export const timeToString = (hour: number, minute: number) => {
  let isAm: boolean = true;

  if (hour > 12) {
    hour -= 12;
    isAm = false;
  }

  let hourStr: string = hour < 10 ? '0' + hour : '' + hour;
  let minuteStr: string = minute < 10 ? '0' + minute: '' + minute;

  const timeStr: string = `${isAm ? '오전' : '오후'} ${hourStr}:${minuteStr}`;

  return timeStr;
};