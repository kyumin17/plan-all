export interface ScheduleDTO_A {
  id: number;
  name: string;
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  location: null | string;
  color: Color;
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
  color: Color;
  all_day: 1;
  description: string;
};

interface CalendarDTO_A {
  id: number;
  name: string;
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  location: null | string;
  color: Color;
  start_date: number;
  start_month: number;
  start_year: number;
  end_date: number;
  end_month: number;
  end_year: number;
  all_day: 0;
  description: string;
  holiday: 0 | 1;
};

interface CalendarDTO_B {
  id: number;
  name: string;
  start_hour: null;
  start_minute: null;
  end_hour: null;
  end_minute: null;
  location: null | string;
  color: Color;
  start_date: number;
  start_month: number;
  start_year: number;
  end_date: number;
  end_month: number;
  end_year: number;
  all_day: 1;
  description: string;
  holiday: 0 | 1;
};

export interface TodoDTO {
  id: number;
  name: string;
  year: number | null;
  month: number | null;
  date: number | null;
  hour: number | null;
  minute: number | null;
  color: Color;
  description: string;
  is_done: 0 | 1;
};

export type ScheduleDTO = ScheduleDTO_A | ScheduleDTO_B;

export interface TimetableDTO {
  id: number;
  name: string;
  is_default: 0 | 1;
};

export interface TimeblockDTO {
  id: number;
  table_id: number;
  name: string;
  day: number;
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  location: null | string;
  color: Color;
  description: string;
};

export type CalendarDTO = CalendarDTO_A | CalendarDTO_B;

export interface TimeProps {
  hour: number;
  minute: number;
};

export interface DateProps {
  year: number;
  month: number;
  date: number;
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
  orderFilter?: string[];
  findFilter?: T;
};

export interface Style {
  color?: string;
  bg_color?: string;
  height?: number;
  width?: number;
  top?: number;
  left?: number;
  right?: number;
  min_height?: number;
  bottom?: number;
  position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
};

export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'holiday';

export interface Query {
  query: string;
  params: (string | number)[]
};