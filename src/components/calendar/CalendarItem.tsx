import CalendarBody from './CalendarBody';
import { CalendarItemProps } from '../../types/types';

const CalendarItem = ({ item }: { item: CalendarItemProps }) => {
  return (
    <CalendarBody 
      year={item.year} 
      month={item.month} 
      eventList={item.events}
    />
  );
}

export default CalendarItem;