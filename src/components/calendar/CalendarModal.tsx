import { View } from 'react-native';
import { CalendarDTO, Style } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { FlexCol } from '../../styles/style';
import { timeRangeToStr } from '../../utils/time';
import { colorCode } from '../../styles/color';

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
`;

const Body = styled(FlexCol)`
  gap: 12px;
`;

const EventWrapper = styled.Pressable<Style & { allDay: 0 | 1 }>`
  display: flex;
  flex-direction: row;
  gap: 15px;
  background-color: ${(props) => props.bg_color};
  padding-top: ${(props) => props.allDay ? '7px' : 0};
  padding-bottom: 11px;
  border-radius: 3px;
`;

const Marker = styled.View<Style>`
  width: 3px;
  background-color: ${(props) => props.bg_color};
`;

const Name = styled.Text<Style>`
  font-size: 14px;
  color: ${(props) => props.color};
`;

const Time = styled.Text`
  font-size: 11px;
  color: #A9A9A9;
`;

const CalendarModal = (
  { month, date, day, eventList }:
  {
    month: number;
    date: number;
    day: number;
    eventList: CalendarDTO[];
  }
) => {
  const dayNameList = ['월', '화', '수', '목', '금', '토', '일'];
  const navigation = useNavigation<any>();

  return (
    <View>
      <Title>
        {month}.{date} {dayNameList[day]}
      </Title>
      <Body>
        {eventList.map((event) => {
          const color = colorCode[event.color];

          return (
            <EventWrapper
              key={event.id}
              onPress={() => navigation.navigate('CalendarEditPage', { event: event })}
              bg_color={event.all_day ? `${color}25` : 'white'}
              allDay={event.all_day}
            >
              <Marker bg_color={event.all_day ? '' : color}>
              </Marker>
              <View>
                <Name color={color}>
                  {event.name}
                </Name>
                <Time>
                  {event.all_day ? 
                    `${event.start_month}.${event.start_date}` : 
                    `${timeRangeToStr(event.start_hour, event.start_minute, event.end_hour, event.end_minute)}`}
                  {event.location && `, ${event.location}`}
                </Time>
              </View>
            </EventWrapper>
          );
        })}
      </Body>
    </View>
  );
}

export default CalendarModal;