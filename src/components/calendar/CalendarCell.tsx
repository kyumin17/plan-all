import CalendarBlock from './CalendarBlock';
import { CalendarProps, Style } from '../../types/types';
import styled from 'styled-components/native';
import { View } from 'react-native';

const Cell = styled.Pressable`
  position: relative;
  flex: 1;
  padding-top: 32px;
`;

const DateText = styled.Text<Style & { is_today: boolean }>`
  position: absolute;
  right: 7px;
  top: 5px;
  font-size: 13px;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 20px;
  font-weight: 400;
  margin-right: 6px;
  color: ${(props) => props.color};

  ${(props) => 
    props.is_today &&
    {
      backgroundColor: '#F93827',
      color: 'white',
      borderRadius: 20,
    }
  }
`

const CalendarCell = (
  { date, day, eventList, isToday, openModal }: 
  { 
    date: number | null,
    day: number,
    eventList: CalendarProps[],
    isToday: boolean,
    openModal: (date: number, day: number, eventList: CalendarProps[]) => void,
  }
) => {
  const isWeekend: boolean = day === 5 || day === 6;

  return (
    <Cell 
      onPress={()=>{date && openModal(date, day, eventList)}}
    >
      <DateText 
        color={isWeekend ? '#FF2A00' : '#3B3B3B'}
        is_today={isToday}
      >
        {date}
      </DateText>

      <View>
        {eventList.map((event: CalendarProps) => {
          return <CalendarBlock event={event} date={date} key={event.id} />;
        })}
      </View>
    </Cell>
  );
};

export default CalendarCell;