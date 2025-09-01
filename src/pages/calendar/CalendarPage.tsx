import { View } from 'react-native';
import CreateButton from '../../components/create_form/button/CreateButton';
import Carousel from '../../components/common/Carousel';
import CalendarItem from '../../components/calendar/CalendarItem';
import { useEffect, useState } from 'react';
import { CalendarDTO, CalendarItemProps } from '../../types/types';
import selectDB from '../../utils/db/selectDB';
import { useDB } from '../../components/common/DBProvider';

const CalendarPage = () => {
  const [data, setData] = useState<CalendarItemProps[]>([]);
  const [events, setEvents] = useState<CalendarDTO[]>([]);
  const db = useDB();

  useEffect(() => {
    if (!db) return;

    const getData = async () => {
      await selectDB({
        db: db,
        tableName: 'calendar',
        filter: {
          orderFilter: ['start_year', 'start_month', 'start_date', 'start_hour', 'start_minute'],
        },
      }).then(res => setEvents(res ?? []));

      let newData: CalendarItemProps[] = [];

      const curYear = new Date().getFullYear();
      const curMonth = new Date().getMonth() + 1;

      const getEventTime = (event: CalendarDTO) => {
        return {
          start: new Date(event.start_year, event.start_month, event.start_date, event.start_hour ?? 0, event.start_minute ?? 0).getTime(),
          end: new Date(event.end_year, event.end_month, event.end_date, event.end_hour ?? 23, event.end_minute ?? 59).getTime(),
        }
      }

      for (let i = -36; i <= 36; i++) {
        const date = new Date(curYear, curMonth + i, 1);
        const calStartTime = date.getTime();
        const calEndTime = new Date(curYear, curMonth + i + 1, 0, 23, 59).getTime();

        newData.push({
          year: date.getFullYear(),
          month: date.getMonth(),
          events: events.filter(event => 
            (getEventTime(event).start <= calEndTime && getEventTime(event).end >= calStartTime)
          ),
        });
      }

      setData(newData);
    }

    getData();
  }, [db]);

  return (
    <View style={{ flex: 1 }}>
      <Carousel 
        data={data}
        startIndex={Math.floor(data.length / 2)}
        renderItem={CalendarItem}
      />
      <CreateButton link='CalendarCreatePage' />
    </View>
  );
};

export default CalendarPage;