export const getTimeSum = (hour: number, minute: number) => {
  return hour * 60 + minute;
};

/**
 * 오전/오후 HH:MM 변환
 */
export const timeToStr = (hour: number, minute: number) => {
  const isAm: boolean = hour < 12;

  if (hour > 12) hour -= 12;

  return `${isAm ? '오전' : '오후'} ${hour}:${String(minute).padStart(2, '0')}`;
};

/**
 * 오전/오후 HH:MM - HH:MM 변환
 */
export const timeRangeToStr = (
  startHour: number, 
  startMinute: number, 
  endHour: number, 
  endMinute: number
) => {
  const isStartAm: boolean = startHour < 12;
  const isEndAm: boolean = endHour < 12;

  if (endHour > 12) endHour -= 12;

  if (isStartAm === isEndAm) {
    const startStr = timeToStr(startHour, startMinute);
    const endStr = `${endHour}:${String(endMinute).padStart(2, '0')}`;

    return startStr + ' - ' + endStr;
  } else {
    return `${timeToStr(startHour, startMinute)} - ${timeToStr(endHour, endMinute)}`;
  }
}