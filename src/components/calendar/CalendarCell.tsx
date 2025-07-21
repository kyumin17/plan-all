import CalendarBlock from './CalendarBlock';
import { CalendarProps, Style } from '../../types/types';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Cell = styled.Pressable`
  position: relative;
  flex: 1;
  padding-top: 7px;
`;

const DateText = styled.Text<Style & { is_today: boolean }>`
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
  const navigation = useNavigation<any>();

  const getDateColor = () => {
    if (day === 5) return '#1753b4';
    else if (day === 6) return '#db300e';
    else return '#3B3B3B';
  }

  const handlePress = () => {
    if (date && eventList.length !== 0) openModal(date, day, eventList);
    else navigation.navigate('CalendarCreatePage');
  }

  return (
    <Cell 
      onPress={handlePress}
    >
      <DateText 
        color={getDateColor()}
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