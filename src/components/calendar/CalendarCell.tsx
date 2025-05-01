import { View, Text, StyleSheet } from 'react-native';
import CalendarEventBlock from './CalendarEventBlock';
import { CalendarProps } from '../../types/types';

const CalendarCell = ({ date, day, data }: { date: number | null, day: number, data: CalendarProps[] }) => {
  const isWeekend: boolean = day === 5 || day === 6;

  return (
    <View 
      style={[styles.cell, {backgroundColor: day % 2 === 0 ? 'white' : '#FCFCFC'}]}
    >
      <Text style={[styles.date, {color: isWeekend ? '#FF2A00' : '#3B3B3B'}]}>
        {date}
      </Text>
      <View>
        {data.map((event) => {
          return <CalendarEventBlock event={event} key={event.id} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    position: 'relative',
    flex: 1,
    paddingTop: 4,
  },
  date: {
    textAlign: 'right',
    paddingRight: 7,
    fontSize: 13,
    marginBottom: 4,
  },
});

export default CalendarCell;