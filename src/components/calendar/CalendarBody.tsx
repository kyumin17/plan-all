import CalendarCell from './CalendarCell';
import { CalendarDTO } from '../../types/types';
import { useState } from 'react';
import styled from 'styled-components/native';
import CalendarModal from './CalendarModal';
import { getCalEventInfo } from '../../utils/getCalEventInfo';

const Body = styled.View`
  position: relative;
  box-sizing: border-box;
  flex: 1;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #EFEFEF;
  box-sizing: border-box;
  flex: 1;
`;

interface ModalItem {
  date: number;
  day: number;
  events: CalendarDTO[];
}

const CalendarBody = (
  { year, month, eventList }: 
  { 
    year: number,
    month: number,
    eventList: CalendarDTO[],
  }
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [modalItem, setModalItem] = useState<null | ModalItem>(null);

  const startDay: number = (new Date(year, month - 1, 1).getDay() + 6) % 7; // mon: 0
  const dateNum: number = new Date(year, month, 0).getDate();
  const rowNum: number = startDay + dateNum <= 34 ? 5 : 6;
  const { eventInfoList, overflowList, dateEventList } = getCalEventInfo({
    eventList: eventList,
    date: { year: year, month: month },
    height: rowNum === 6 ? 4 : 6,
  });

  const openModal = (date: number) => {
    if (dateEventList[date].length === 0) {

    } else {
      setIsOpen(true);
      setModalItem({
        date: date,
        day: (new Date(year, month - 1, date).getDay() + 6) % 7,
        events: dateEventList[date],
      });
    }
  }

  return (
    <Body>
      {Array.from({ length: rowNum }, (_, i) => i).map((week: number) => {
        return (
          <Row key={week}>
            {Array.from({ length: 7 }, (_, i) => i).map((day: number) => {
              const date: number = day - startDay + week * 7 + 1;
              const info = eventInfoList.filter((info) => info.start == date);
              const overflow = overflowList.filter((info) => info.start == date);
              
              return (
                <CalendarCell 
                  key={date}
                  date={0 < date && date <= dateNum ? date : null} 
                  day={day} 
                  eventInfoList={info}
                  overflowInfoList={overflow}
                  isToday={date === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear()}
                  handlePress={openModal}
                />
              );
            })}
          </Row>
        );
      })}

      {modalItem && 
        <CalendarModal 
          month={month}
          date={modalItem.date}
          day={modalItem.day}
          eventList={modalItem.events}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      }
    </Body>
  );
}

export default CalendarBody;