import { CalendarDTO } from '../../types/types';
import styled from 'styled-components/native';
import Modal from '../common/Modal';
import CalendarModalBlock from './CalendarModalBlock';
import { ScrollView } from 'react-native-gesture-handler';

const Body = styled.View`
  padding: 25px 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
  padding: 0 20px;
`;

const DayLabel = styled.Text`
  font-size: 18px;
`;

const EventWrapper = styled.View`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
`;

const CalendarModal = (
  { month, date, day, eventList, isOpen, setIsOpen }:
  {
    month: number,
    date: number,
    day: number,
    eventList: CalendarDTO[],
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  }
) => {
  const dayNameList = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      bottom={5}
    >
      <Body>
        <Title>
          {month}.{date} <DayLabel>{dayNameList[day]}요일</DayLabel>
        </Title>
        <ScrollView style={{ maxHeight: 420 }}>
          <EventWrapper>
            {eventList.map((event) => {
              return (
                <CalendarModalBlock
                  key={event.id}
                  event={event}
                />
              );
            })}
          </EventWrapper>
        </ScrollView>
      </Body>
    </Modal>
  );
}

export default CalendarModal;