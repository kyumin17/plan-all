import { View } from 'react-native';
import { TimeblockDTO, TimetableDTO } from '../../types/types';
import { useState, useEffect } from 'react';
import { useDB } from '../common/DBProvider';
import selectDB from '../../utils/db/selectDB';
import TimeTableBlock from './TimeTableBlock';
import TimeAxis from '../common/TimeAxis';
import styled from 'styled-components/native';
import { FlexCol, FlexRow } from '../../styles/style';
import Modal from '../common/Modal';
import TimeTableModal from './TimeTableModal';

const TableHeader = styled.View`
  height: 25px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const DayText = styled.Text`
  flex: 1;
  text-align: center;
`;

const EventWrapper = styled(FlexRow)`
  position: absolute;
  left: 8%;
  width: 91%;
`;

const EventCol = styled.View`
  position: relative;
  flex: 1;
`;

const TimeTable = ({ table }: { table: TimetableDTO }) => {
  const db = useDB();

  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [startTime, setStartTime] = useState<number>(10);
  const [endTime, setEndTime] = useState<number>(20);
  
  const [eventList, setEventList] = useState<TimeblockDTO[]>([]);

  const [modalName, setModalName] = useState<null | string>(null);

  const setTimeRange = (eventList: TimeblockDTO[]) => {
    const newStartTime = Math.min(...eventList.map(block => block.start_hour));
    const newEndTime = Math.max(...eventList.map(block => block.end_hour));
    
    setStartTime(Math.min(startTime, newStartTime));
    setEndTime(Math.max(endTime, newEndTime + 1));
  }

  useEffect(() => {
    selectDB<{ table_id: number }>({
        db: db,
        tableName: 'timetable',
        filter: {
          findFilter: { table_id: table.id },
          orderFilter: ['day', 'start_hour', 'start_minute'],
        },
      }).then((res) => {
        if (res) {
          setEventList(res);
          setTimeRange(res);
        }
      });
  }, [db]);

  const openModal = (name: string) => {
    setModalName(name);
    setIsOpen(true);
  }

  return (
    <FlexCol>
      <TableHeader>
        <View style={{ width: '7%' }}></View>
        {dayNameList.map((day: string) => (
          <DayText key={day}>
            {day}
          </DayText>
        ))}
      </TableHeader>
      
      <View>
        <TimeAxis 
          startTime={startTime}
          endTime={endTime}
          gap={75}
        />

        <EventWrapper>
          {dayNameList.map((day: string, idx: number) => {
            const dayEventList: TimeblockDTO[] = eventList.filter((event) => event.day === idx);

            return (
              <EventCol key={day}>
                {dayEventList.map((event) => {
                  return (
                    <TimeTableBlock 
                      key={event.id} 
                      event={event} 
                      startTime={startTime} 
                      openModal={openModal}
                      gap={75}
                    />
                  );
                })}
              </EventCol>
            );
          })}
        </EventWrapper>
      </View>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <TimeTableModal
          timeblockList={eventList.filter((event) => event.name === modalName)}
        />
      </Modal>
    </FlexCol>
  );
};

export default TimeTable;