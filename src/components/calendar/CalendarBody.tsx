import { View } from 'react-native';
import CalendarCell from './CalendarCell';
import { CalendarProps } from '../../types/types';
import { useState, useEffect } from 'react';
import { useDB } from '../common/DBProvider';
import selectDB from '../../utils/db/selectDB';
import styled from 'styled-components/native';
import CalendarModal from './CalendarModal';
import Modal from '../common/Modal';

const TableHeader = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #EFEFEF;
  height: 30px;
`;

const DayText = styled.Text`
  flex: 1;
  text-align: center;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #EFEFEF;
  height: 15.3%;
`;

interface FindFilter {
  start_year: number;
  start_month: number;
}

interface ModalItem {
  date: number;
  day: number;
  events: CalendarProps[];
}

const CalendarBody = (
  { year, month }: 
  { 
    year: number,
    month: number,
  }
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState<null | ModalItem>(null);

  const startDay: number = (new Date(year, month - 1, 1).getDay() - 1) % 7; // mon: 0
  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const dateNum: number = new Date(year, month - 1, 0).getDate();
  const rowNum: number = 6;

  const [eventList, setEventList] = useState<CalendarProps[]>([]);

  const db = useDB();

  useEffect(() => {
    selectDB<FindFilter>({
      db: db,
      tableName: 'calendar',
      filter: {
        findFilter: { start_year: year, start_month: month },
        orderFilter: ['start_date'],
      },
    }).then((res) => {
      if (res) setEventList(res);
    });
  }, [db, year, month]);

  const openModal = (date: number, day: number, eventList: CalendarProps[]) => {
    if (eventList.length !== 0) {
      setModalItem({
        date: date,
        day: day,
        events: eventList,
      }); 
      setIsOpen(true);
    } else {
      setModalItem(null);
    }
  }

  return (
    <View>
      <TableHeader>
        {dayNameList.map((day: string) => (
          <DayText key={day}>
            {day}
          </DayText>
        ))}
      </TableHeader>

      {Array.from({ length: rowNum }, (_, i) => i).map((week: number) => {
        return (
          <Row key={week}>
            {Array.from({ length: 7 }, (_, i) => i).map((day: number) => {
              const date: number = day - startDay + week * 7 + 1;
              const data = eventList.filter((event) => event.start_date <= date && date <= event.end_date);
              
              return (
                <CalendarCell 
                  key={date}
                  date={0 < date && date <= dateNum ? date : null} 
                  day={day} 
                  eventList={data}
                  isToday={date === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear()}
                  openModal={openModal}
                />
              );
            })}
          </Row>
        );
      })}

      {modalItem && <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        minHeight={27}
      >
        <CalendarModal 
          month={month}
          date={modalItem.date}
          day={modalItem.day}
          eventList={modalItem.events}
        />
      </Modal>}
    </View>
  );
}

export default CalendarBody;