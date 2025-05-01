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
  id: string;
  name: string;
  date: string;
  start_at: TimeProps;
  end_at: TimeProps;
  location?: string;
  color: string;
};

export interface TimeblockProps {
  id: string;
  name: string;
  day: number;
  start_at: TimeProps;
  end_at: TimeProps;
  color: string;
  location?: string;
};

export interface CalendarProps {
  id: string;
  name: string;
  start_date: DateProps;
  end_date: DateProps;
  color: string;
  location?: string;
};