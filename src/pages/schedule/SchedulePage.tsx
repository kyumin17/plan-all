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

  // useEffect(() => {
  //   selectSchedule({
  //     db: db,
  //   }).then((res) => {
  //     if (res) setEventList(res);
  //   })
  // }, [db]);

  const dateToDateProps = (date: Date) => {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    }
  }

  const [data, setData] = useState<DateProps[]>([dateToDateProps(new Date())]);

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() - 100);

    let newData = [];

    for (let i = -100; i <= 100; i++) {
      date.setDate(date.getDate() + 1);
      newData.push(dateToDateProps(date));
    }

    setData(newData);
  }, []);

  return (
    <View>
      <ScheduleHeader 
        year={2025} 
        month={1} 
        date={1}
      />
      <Carousel
        data={data}
        startIndex={Math.floor(data.length / 2)}
        renderItem={({ item }) => 
          ScheduleItem({
            item: item, 
            eventList: eventList
          })}
      />
    </View>
  );
};

export default SchedulePage;