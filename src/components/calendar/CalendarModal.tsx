import { View } from 'react-native';
import { CalendarProps, Style } from '../../types/types';
import { timeToStr } from '../../utils/time';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { FlexCol } from '../../styles/style';

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Body = styled(FlexCol)`
  gap: 15px;
`;

const EventWrapper = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 15px;
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
    eventList: CalendarProps[];
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
          return (
            <EventWrapper
              key={event.id}
              onPress={() => navigation.navigate('CalendarCreatePage')}
            >
              <Marker bg_color={event.color}>
              </Marker>
              <View>
                <Name color={event.color}>
                  {event.name}
                </Name>
                <Time>
                  {event.all_day ? 
                    '하루종일' : 
                    `${timeToStr(event.start_hour, event.start_minute)} - ${timeToStr(event.end_hour, event.end_minute)}`}
                  {event.location ?? `, ${event.location}`}
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