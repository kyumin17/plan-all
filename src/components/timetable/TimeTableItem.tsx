import { View } from 'react-native';
import { TimetableItemProps } from '../../types/types';
import TimeTableHeader from './TimeTableHeader';
import TimeTable from './TimeTable';

const TimeTableItem = ({ item }: { item: TimetableItemProps }) => {
  return (
    <View 
      style={{ flex: 1 }}
    >
      <TimeTableHeader 
        table={item.table}
      />
      <TimeTable 
        table={item.table}
      />
    </View>
  );
}

export default TimeTableItem;