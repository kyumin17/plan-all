import { useEffect, useState } from 'react';
import { ScheduleDTO_A } from '../../types/types';
import ScheduleBlock from './ScheduleBlock';
import styled from 'styled-components/native';
import TimeAxis from '../common/TimeAxis';

import { ScrollView } from 'react-native';
import { timeRangeToStr } from '../../utils/time';

const EventWrapper = styled.View`
  left: 8%;
  width: 91%;
  position: absolute;
  flex: 1;
`;

const ScheduleBody = ({ eventList }: { eventList: ScheduleDTO_A[] }) => {
  const [startTime, setStartTime] = useState<number>(10);
  const [endTime, setEndTime] = useState<number>(20);

  useEffect(() => {
    const newStartTime = Math.min(...eventList.map(block => block.start_hour));
    const newEndTime = Math.max(...eventList.map(block => block.end_hour)) + 1;
    
    setStartTime(Math.min(startTime, newStartTime));
    setEndTime(Math.max(endTime, newEndTime));
  }, [eventList]);

  return (
    <ScrollView
      style={{ flex: 1 }}
    >
      <TimeAxis 
        startTime={startTime}
        endTime={endTime}
        gap={75}
      />

      <EventWrapper>
        {eventList.map((event: ScheduleDTO_A) => {
          const startSum = 60 * event.start_hour + event.start_minute;
          const endSum = 60 * event.end_hour + event.end_minute;

          const height = 75 * (endSum - startSum) / 60;
          const top = startTime ? 75 * (startSum - startTime * 60) / 60: 0;

          return (
            <ScheduleBlock 
              key={event.id} 
              event={event}
              height={height}
              top={top}
              time={timeRangeToStr(event.start_hour, event.start_minute, event.end_hour, event.end_minute)}
            />
          );
        })}
      </EventWrapper>
    </ScrollView>
  );
}

export default ScheduleBody;