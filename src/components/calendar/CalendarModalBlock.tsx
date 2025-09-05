import styled from 'styled-components/native';
import { CalendarDTO, Style } from '../../types/types';
import { colorCode } from '../../styles/color';
import TrashSvg from '../../assets/image/trash.svg';
import WriteSvg from '../../assets/image/write.svg';
import { timeRangeToStr, timeToStr } from '../../utils/time';
import { Pressable, View } from 'react-native';
import execDB from '../../utils/db/execDB';
import { useDB } from '../common/DBProvider';
import { useNavigation } from '@react-navigation/native';

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Marker = styled.View<Style & { allDay: 1 | 0 }>`
  height: 10px;
  width: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.allDay ? props.color : 'white'};
  border: 1px solid ${(props) => props.color};
  margin-right: 12px;
`;

const Name = styled.Text<Style>`
  font-size: 16px;
  color: ${(props) => props.color};
`;

const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
  position: absolute;
  right: 0;
`;

const InfoWrapper = styled.View`
  margin-left: 22px;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Info = styled.Text`
  font-size: 14px;
  color: #767676;
`;

const CalendarModalBlock = ({ event }: { event: CalendarDTO }) => {
  const color = colorCode[event.color];
  const db = useDB();
  const navigation = useNavigation<any>();

  const getEventTime = () => {
    if (event.start_year === event.end_year &&
      event.start_month === event.end_month &&
      event.start_date === event.end_date
    ) {
      if (event.all_day) {
        return `${event.start_month}.${event.start_date}`;
      } else {
        return timeRangeToStr(
          event.start_hour,
          event.start_minute,
          event.end_hour,
          event.end_minute
        );
      }
    } else {
      if (event.all_day) {
        return `${event.start_month}.${event.start_date} - ${event.end_month}.${event.end_date}`;
      } else {
        return `${event.start_month}.${event.start_date} ${timeToStr(event.start_hour, event.start_minute)} - ${event.end_month}.${event.end_date} ${timeToStr(event.end_hour, event.end_minute)}`;
      }
    }
  }

  const handleEdit = () => {
    navigation.replace('CalendarPage');
    navigation.navigate('CalendarEditPage', { event: event });
  }

  const handleDelete = async () => {
    if (!db) {
      console.error('Database connection failed');
      return;
    }

    try {
      await execDB({
        db: db,
        query: 'DELETE FROM calendar WHERE id = ?',
        params: [event.id],
      });
      navigation.replace('CalendarPage');
    } catch (error) {
      console.error('Error deleting timetable:', error);
    }
  }

  return (
    <View>
      <Header>
        <Marker
          color={color}
          allDay={event.all_day || !(event.start_year === event.end_year &&
            event.start_month === event.end_month &&
            event.start_date === event.end_date) ? 1 : 0
          }
        >
        </Marker>
        <Name
          color={color}
        >
          {event.name}
        </Name>
        <ButtonWrapper>
          <Pressable
            onPress={handleEdit}
          >
            <WriteSvg width={18} height={18} />
          </Pressable>

          <Pressable
            onPress={handleDelete}
          >
            <TrashSvg width={19} height={19} />
          </Pressable>
        </ButtonWrapper>
      </Header>

      <InfoWrapper>
        <Info>
          {getEventTime()}
        </Info>
        {event.description && <Info>
          {event.description}
        </Info>}
        {event.location && <Info>
          {event.location}
        </Info>}
      </InfoWrapper>
    </View>
  );
}

export default CalendarModalBlock;