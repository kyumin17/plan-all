export interface TimeProps {
  hour: number;
  minute: number;
}

export interface ScheduleProps {
  id: string;
  name: string;
  date: string;
  start_at: TimeProps;
  end_at: TimeProps;
  location?: string;
  color: string;
};