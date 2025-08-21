import { DateProps } from '../../types/types';
import { ScheduleDTO } from '../../types/types';
import { View } from 'react-native';
import ScheduleAllday from './ScheduleAllday';
import ScheduleBody from './ScheduleBody';

const ScheduleItem = (
  { item, eventList }: 
  { 
    item: DateProps,
    eventList: ScheduleDTO[],
  }
) => {
    return (
      <View 
        style={{flex: 1}}
      >
        <ScheduleAllday
          eventList={eventList.filter((event) => event.all_day === 1)}
          month={item.month}
          date={item.date}
        />
        <ScheduleBody 
          eventList={eventList.filter((event) => event.all_day === 0)}
        />
      </View>
    );
  }

export default ScheduleItem;