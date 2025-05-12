import { View, Text, StyleSheet } from 'react-native';
import { CalendarProps } from '../../types/types';

const CalendarEventBlock = ({ event }: { event: CalendarProps }) => {
  const eventColor = event.color;

  return (
    <View style={[styles.block]}>
      <Text style={[styles.name]}>
        {event.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    backgroundColor: 'black',
  },
  name: {
    fontSize: 11,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 2,
  },
});

export default CalendarEventBlock;