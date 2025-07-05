import { View, Text, StyleSheet } from 'react-native';
import CalendarBlock from './CalendarBlock';
import { CalendarProps } from '../../types/types';

const CalendarCell = ({ date, day, data, isToday }
  : { date: number | null, day: number, data: CalendarProps[], isToday: boolean }
) => {
  const isWeekend: boolean = day === 5 || day === 6;

  return (
    <View 
      style={styles.cell}
    >
      <Text style={[styles.date, {color: isWeekend ? '#FF2A00' : '#3B3B3B'}, isToday ? styles.today : {}]}>
        {date}
      </Text>
      <View>
        {data.map((event) => {
          return <CalendarBlock event={event} key={event.id} />;
        })}
      </View>
    </View>
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