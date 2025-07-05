export interface TimeProps {
  hour: number;
  minute: number;
}

export interface SchedulePropsA {
  id: number;
  name: string;
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  location: null | string;
  color: string;
  all_day: 0;
};

export interface SchedulePropsB {
  id: number;
  name: string;
  start_hour: null;
  start_minute: null;
  end_hour: null;
  end_minute: null;
  location: null | string;
  color: string;
  all_day: 1;
};

export type ScheduleProps = SchedulePropsA | SchedulePropsB;

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

export interface DateProps {
  year: number;
  month: number;
  date: number;
}