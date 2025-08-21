import { View } from 'react-native';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { CalendarItemProps } from '../../types/types';

const CalendarItem = ({ item }: { item: CalendarItemProps }) => {
  return (
    <View style={{flex: 1}}>
      <CalendarHeader year={item.year} month={item.month} />
      <CalendarBody 
        year={item.year} 
        month={item.month} 
      />
    </View>
  );
}

export default CalendarItem;