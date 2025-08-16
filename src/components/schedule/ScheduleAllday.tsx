import styled from 'styled-components/native';
import { ScheduleDTO_B } from '../../types/types';
import ScheduleBlock from './ScheduleBlock';

const Body = styled.View`
  display: flex;
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: #EFEFEF;
  border-bottom-width: 1px;
  border-bottom-color: #EFEFEF;
`;

const TimeLabel = styled.View`
  width: 8%;
`;

const TimeText = styled.Text`
  box-sizing: border-box;
  text-align: center;
  padding-top: 3px;
  color: #767676;
`;

const EventWrapper = styled.View`
  width: 91%;
`;

const ScheduleAllday = (
  { eventList, month, date }: 
  { 
    eventList: ScheduleDTO_B[],
    month: number,
    date: number,
  }
) => {
  if (eventList.length === 0) return <></>;

  return (
    <Body>
      <TimeLabel>
        <TimeText>
          ~
        </TimeText>
      </TimeLabel>

      <EventWrapper>
        {eventList.map((event: ScheduleDTO_B) => (
          <ScheduleBlock
            key={event.id}
            event={event}
            time={`${month}.${date}`}
          />
        ))}
      </EventWrapper>
    </Body>
  );
}

export default ScheduleAllday;