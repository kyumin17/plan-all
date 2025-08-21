import { View } from 'react-native';
import CreateButton from '../../components/create_form/button/CreateButton';
import Carousel from '../../components/common/Carousel';
import CalendarItem from '../../components/calendar/CalendarItem';
import { useEffect, useState } from 'react';
import { CalendarItemProps } from '../../types/types';

const CalendarPage = () => {
  const [data, setData] = useState<CalendarItemProps[]>([]);

  useEffect(() => {
    let newData: CalendarItemProps[] = [];

    for (let i = -100; i <= 100; i++) {
      
    }

    setData(newData);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Carousel 
        data={data}
        startIndex={0}
        renderItem={CalendarItem}
      />
      <CreateButton link='CalendarCreatePage' />
    </View>
  );
};

export default CalendarPage;