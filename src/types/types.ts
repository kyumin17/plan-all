export interface TimeProps {
  hour: number;
  minute: number;
}

export interface ScheduleDTO_A {
  id: number;
  name: string;
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  location: null | string;
  color: string;
  all_day: 0;
  description: string;
};

export interface ScheduleDTO_B {
  id: number;
  name: string;
  start_hour: null;
  start_minute: null;
  end_hour: null;
  end_minute: null;
  location: null | string;
  color: string;
  all_day: 1;
  description: string;
};

export type ScheduleDTO = ScheduleDTO_A | ScheduleDTO_B;

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
  description: string;
};

export interface CalendarPropsA {
  id: number;
  name: string;
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  location: null | string;
  color: string;
  start_date: number;
  start_month: number;
  start_year: number;
  end_date: number;
  end_month: number;
  end_year: number;
  all_day: 0;
  description: string;
};

export interface CalendarPropsB {
  id: number;
  name: string;
  start_hour: null;
  start_minute: null;
  end_hour: null;
  end_minute: null;
  location: null | string;
  color: string;
  start_date: number;
  start_month: number;
  start_year: number;
  end_date: number;
  end_month: number;
  end_year: number;
  all_day: 1;
  description: string;
};

export type CalendarProps = CalendarPropsA | CalendarPropsB;

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

export interface Style {
  color?: string;
  bg_color?: string;
  height?: number;
  width?: number;
  top?: number;
  left?: number;
  right?: number;
  min_height?: number;
}