import ScheduleItem from '../../components/schedule/ScheduleItem';
import Carousel from '../../components/common/Carousel';
import { useEffect, useState } from 'react';
import { DateProps, ScheduleDTO } from '../../types/types';
import { useDB } from '../../components/common/DBProvider';
import selectSchedule from '../../utils/selectSchedule';
import { View } from 'react-native';
import ScheduleHeader from '../../components/schedule/ScheduleHeader';

const SchedulePage = () => {
  const db = useDB();

  const [eventList, setEventList] = useState<ScheduleDTO[]>([]);
  const [selectDate, setSelectDate] = useState<DateProps>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  });

  const dateToDateProps = (date: Date) => {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    }
  }

  const [data, setData] = useState<DateProps[]>([]);

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() - 36);

    let newData = [];

    for (let i = -36; i <= 36; i++) {
      date.setDate(date.getDate() + 1);
      newData.push(dateToDateProps(date));
    }

    setData(newData);
  }, []);

  return (
    <View>
      <ScheduleHeader 
        year={selectDate.year} 
        month={selectDate.month}
        date={selectDate.date}
      />
      <Carousel
        data={data}
        startIndex={Math.floor(data.length / 2)}
        renderItem={({ item }) => 
          ScheduleItem({
            item: item, 
            eventList: eventList
          })}
        onSnapToItem={(index: number) => setSelectDate(data[index-1])}
      />
    </View>
  );
};

export default SchedulePage;