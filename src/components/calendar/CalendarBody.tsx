import CalendarCell from './CalendarCell';
import { CalendarDTO } from '../../types/types';
import { useState } from 'react';
import styled from 'styled-components/native';
import CalendarModal from './CalendarModal';
import Modal from '../common/Modal';
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

  const startDay: number = (new Date(year, month - 1, 1).getDay() - 1) % 7; // mon: 0
  const dateNum: number = new Date(year, month - 1, 0).getDate();
  const rowNum: number = 6;
  const eventInfoList = getCalEventInfo({
    eventList: eventList,
    date: { year: year, month: month },
  });

  const openModal = (date: number, day: number, eventList: CalendarDTO[]) => {
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
    <Body>
      {Array.from({ length: rowNum }, (_, i) => i).map((week: number) => {
        return (
          <Row key={week}>
            {Array.from({ length: 7 }, (_, i) => i).map((day: number) => {
              const date: number = day - startDay + week * 7 + 1;
              const data = eventInfoList.filter((info) => info.start == date);
              
              return (
                <CalendarCell 
                  key={date}
                  date={0 < date && date <= dateNum ? date : null} 
                  day={day} 
                  eventInfoList={data}
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
        bottom={5}
      >
        <CalendarModal 
          month={month}
          date={modalItem.date}
          day={modalItem.day}
          eventList={modalItem.events}
        />
      </Modal>}
    </Body>
  );
}

export default CalendarBody;