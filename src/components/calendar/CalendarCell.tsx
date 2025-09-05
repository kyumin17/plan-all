import CalendarBlock from './CalendarBlock';
import { CalendarEventInfo, CalendarOverflowInfo, Style } from '../../types/types';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CalendarOverflowBlock from './CalendarOverflowBlock';

const Cell = styled.Pressable`
  position: relative;
  flex: 1;
  padding-top: 7px;
`;

const DateText = styled.Text<Style & { isToday: boolean }>`
  margin: 0 auto;
  width: 20px;
  display: block;
  font-size: 13px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-weight: 400;
  margin-bottom: 6px;
  color: ${(props) => props.color};

  ${(props) => 
    props.isToday &&
    {
      backgroundColor: '#F93827',
      color: 'white',
      borderRadius: 20,
    }
  }
`;

const CalendarCell = (
  { date, day, eventInfoList, overflowInfoList, isToday, handlePress }: 
  { 
    date: number | null,
    day: number,
    eventInfoList: CalendarEventInfo[],
    overflowInfoList: CalendarOverflowInfo[],
    isToday: boolean,
    handlePress: (date: number) => void,
  }
) => {
  const getDateColor = () => {
    if (day === 5) return '#1753b4';
    else if (day === 6) return '#db300e';
    else return '#3B3B3B';
  }

  return (
    <Cell 
      onPress={() => {date && handlePress(date)}}
    >
      <DateText 
        color={getDateColor()}
        isToday={isToday}
      >
        {date}
      </DateText>

      <View>
        {eventInfoList.map((info: CalendarEventInfo) => {
          return (
            <CalendarBlock 
              key={`${info.event.id}-${info.start}-${info.top}`} 
              event={info.event} 
              width={info.width}
              top={info.top}
            />
          );
        })}
        {overflowInfoList.map((info: CalendarOverflowInfo) => {
          return (
            <CalendarOverflowBlock
              key={info.start}
              overflow={info}
            />
          );
        })}
      </View>
    </Cell>
  );
};

export default CalendarCell;