import { View, StyleSheet, Pressable, Text } from 'react-native';
import { CalendarProps } from '../../types/types';
import { timeToString } from '../../utils/time';
import { useNavigation } from '@react-navigation/native';

const CalendarModal = (
  { month, date, day, eventList, setEventList }:
  {
    month: number;
    date: number;
    day: number;
    eventList: CalendarProps[];
    setEventList: React.Dispatch<React.SetStateAction<CalendarProps[]>>;
  }
) => {
  const dayNameList = ['월', '화', '수', '목', '금', '토', '일'];
  const navigation = useNavigation<any>();

  return (
    <Pressable 
      style={styles.background}
      onPress={() => {setEventList([])}}
    >
      <Pressable 
        style={styles.modal}
        onPress={(e) => e.stopPropagation()} 
      >
        <Text style={styles.title}>
          {month}.{date} {dayNameList[day]}
        </Text>
        <View style={styles.content}>
          {eventList.map((event) => {
            return (
              <Pressable 
                key={event.id}
                style={styles.event}
                onPress={() => navigation.navigate('CalendarEditPage')}
              >
                <View style={[styles.marker, {backgroundColor: event.color}]}>
                </View>
                <View>
                  <Text style={[styles.name, {color: event.color}]}>
                    {event.name}
                  </Text>
                  <Text style={styles.time}>
                    {event.all_day ? 
                      '하루종일' : 
                      `${timeToString(event.start_hour, event.start_minute)} - ${timeToString(event.end_hour, event.end_minute)}`}
                    {event.location ?? `, ${event.location}`}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    zIndex: 10,
    position: 'absolute',
  },
  modal: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'white',
    right: '50%',
    top: '50%',
    width: '70%',
    borderRadius: 10,
    transform: [{ translateX: '50%' }, { translateY: '-50%' }],
    paddingTop: 25,
    paddingBottom: 30,
    paddingRight: 30,
    paddingLeft: 30,
    minHeight: '28%',
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  event: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  marker: {
    width: 3,
  },
  name: {
    fontSize: 14,
  },
  time: {
    fontSize: 11,
    color: '#A9A9A9',
  }
});

export default CalendarModal;