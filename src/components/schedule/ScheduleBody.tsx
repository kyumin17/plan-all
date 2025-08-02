import { useEffect, useState } from 'react';
import { useDB } from '../common/DBProvider';
import { ScheduleDTO } from '../../types/types';
import selectSchedule from '../../utils/selectSchedule';
import ScheduleBlock from './ScheduleBlock';
import styled from 'styled-components/native';
import TimeAxis from '../common/TimeAxis';
import { FlexRow } from '../../styles/style';

const EventWrapper = styled.View`
  left: 8%;
  width: 91%;
  position: absolute;
  flex: 1;
`;

const ScheduleBody = (
  { year, month, date }: 
  { 
    year: number; 
    month: number; 
    date: number;
  }
) => {
  const db = useDB();

  const [eventList, setEventList] = useState<ScheduleDTO[]>([]);

  const [startTime, setStartTime] = useState<number>(10);
  const [endTime, setEndTime] = useState<number>(20);

  const setTimeRange = (eventList: ScheduleDTO[]) => {
    const newStartTime = Math.min(...eventList.map(block => block.start_hour ?? 24));
    const newEndTime = Math.max(...eventList.map(block => block.end_hour ?? 0)) + 1;
    
    setStartTime(Math.min(startTime, newStartTime));
    setEndTime(Math.max(endTime, newEndTime));
  }

  useEffect(() => {
    selectSchedule({
      db: db,
      year: year,
      month: month,
      date: date,
    }).then((res) => {
      if (res) {
        setEventList(res);
        setTimeRange(res);
      }
    })
  }, [db, year, month, date]);

  return (
    <FlexRow>
      <TimeAxis 
        startTime={startTime}
        endTime={endTime}
        gap={75}
      />

      <EventWrapper>
        {eventList.map((schedule: ScheduleDTO) => {
          return (
            <ScheduleBlock 
              key={schedule.id} 
              event={schedule}
              startTime={startTime}
              gap={75}
            />
          );
        })}
      </EventWrapper>
    </FlexRow>
  );
}

export default ScheduleBody;