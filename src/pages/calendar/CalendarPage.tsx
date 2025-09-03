import { View } from 'react-native';
import CreateButton from '../../components/create_form/button/CreateButton';
import Carousel from '../../components/common/Carousel';
import CalendarItem from '../../components/calendar/CalendarItem';
import { useEffect, useState } from 'react';
import { CalendarDTO, CalendarItemProps, Style } from '../../types/types';
import selectDB from '../../utils/db/selectDB';
import { useDB } from '../../components/common/DBProvider';
import CalendarHeader from '../../components/calendar/CalendarHeader';
import styled from 'styled-components/native';

const TableHeader = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #EFEFEF;
  height: 30px;
`;

const DayText = styled.Text<Style>`
  flex: 1;
  text-align: center;
  color: ${(props) => props.color};
`;

const CalendarPage = () => {
  const [data, setData] = useState<CalendarItemProps[]>([]);
  const [events, setEvents] = useState<CalendarDTO[]>([]);
  const [selectDate, setSelectDate] = useState<{year: number, month: number}>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const db = useDB();

  useEffect(() => {
    if (!db) return;

    const getData = async () => {
      const newEvents = await selectDB({
        db: db,
        tableName: 'calendar',
        filter: {
          orderFilter: ['start_year', 'start_month', 'start_date', 'start_hour', 'start_minute'],
        },
      });

      setEvents(newEvents ?? []);

      let newData: CalendarItemProps[] = [];

      const curYear = new Date().getFullYear();
      const curMonth = new Date().getMonth();

      const getEventTime = (event: CalendarDTO) => {
        return {
          start: new Date(event.start_year, event.start_month - 1, event.start_date, event.start_hour ?? 0, event.start_minute ?? 0).getTime(),
          end: new Date(event.end_year, event.end_month - 1, event.end_date, event.end_hour ?? 23, event.end_minute ?? 59).getTime(),
        }
      }

      for (let i = -36; i <= 36; i++) {
        const date = new Date(curYear, curMonth + i, 1);
        const calStartTime = date.getTime();
        const calEndTime = new Date(curYear, curMonth + i + 1, 0, 23, 59).getTime();

        newData.push({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          events: events.filter(event => 
            (getEventTime(event).start <= calEndTime && getEventTime(event).end >= calStartTime)
          ),
        });
      }

      setData(newData);
    }

    getData();
  }, [db]);

  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <View style={{ flex: 1 }}>
      <CalendarHeader
        year={selectDate.year}
        month={selectDate.month}
      />
      
      <TableHeader>
        {dayNameList.map((day: string) => (
          <DayText key={day} color={day === '일' ? '#db300e' : day === '토' ? '#1753b4' : '#3B3B3B'}>
            {day}
          </DayText>
        ))}
      </TableHeader>

      <Carousel 
        data={data}
        startIndex={Math.floor(data.length / 2)}
        renderItem={CalendarItem}
        onSnapToItem={(index: number) => {
          setSelectDate({
            year: data[index].year,
            month: data[index].month,
          });
        }}
      />
      <CreateButton link='CalendarCreatePage' />
    </View>
  );
};

export default CalendarPage;