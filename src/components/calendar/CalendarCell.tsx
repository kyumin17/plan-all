import { View, Text, StyleSheet, Pressable } from 'react-native';
import CalendarBlock from './CalendarBlock';
import { CalendarProps } from '../../types/types';
import CalendarModal from './CalendarModal';

const CalendarCell = (
  { date, day, eventList, isToday, setSelectDate, setEventModalList }: 
  { 
    date: number | null;
    day: number;
    eventList: CalendarProps[];
    isToday: boolean; 
    setSelectDate: React.Dispatch<React.SetStateAction<number>>;
    setEventModalList: React.Dispatch<React.SetStateAction<CalendarProps[]>>;
  }
) => {
  const isWeekend: boolean = day === 5 || day === 6;

  return (
    <Pressable 
      style={styles.cell}
      onPress={()=>{
        date && setSelectDate(date);
        setEventModalList(eventList);
      }}
    >
      <Text style={[styles.date, {color: isWeekend ? '#FF2A00' : '#3B3B3B'}, isToday ? styles.today : {}]}>
        {date}
      </Text>
      <View>
        {eventList.map((event: CalendarProps) => {
          return <CalendarBlock event={event} key={event.id} />;
        })}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    position: 'relative',
    flex: 1,
    paddingTop: 32,
  },
  date: {
    position: 'absolute',
    right: 7,
    top: 5,
    fontSize: 13,
    height: 20,
    width: 20,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: 400,
    marginRight: 6,
  },
  today: {
    backgroundColor: '#F93827',
    color: 'white',
    borderRadius: 20,
  },
});

export default CalendarCell;