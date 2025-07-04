export interface TimeProps {
  hour: number;
  minute: number;
}

export interface DateProps {
  year: number;
  month: number;
  date: number;
  time: TimeProps;
};

export interface ScheduleProps {
  id: number;
  name: string;
  date: string;
  start_hour: null | number;
  start_minute: null | number;
  end_hour: null | number;
  end_minute: null | number;
  location: null | string;
  color: string;
  month: number;
  year: number;
  all_day: 1 | 0;
};

export interface TimeblockProps {
  id: number;
  name: string;
  day: number;
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  location: null | string;
  color: string;
};

export interface CalendarProps {
  id: number;
  name: string;
  start_hour: null | number;
  start_minute: null | number;
  end_hour: null | number;
  end_minute: null | number;
  location: null | string;
  color: string;
  start_date: number;
  start_month: number;
  start_year: number;
  end_date: number;
  end_month: number;
  end_year: number;
  all_day: 1 | 0;
};

export interface TimeManageProps {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  setStartHour: any;
  setStartMinute: any;
  setEndHour: any;
  setEndMinute: any;
};

export interface Filter<T> {
  orderFilter?: string[],
  findFilter?: T,
}