import { View, Text, StyleSheet } from 'react-native';
import { CalendarProps } from '../../types/types';

const CalendarBlock = ({ event }: { event: CalendarProps }) => {
  return (
    <View style={[styles.block]}>
      <View style={[styles.marker, {backgroundColor: event.all_day ? `${event.color}25` : event.color}]}>

      </View>
      <Text 
        style={[styles.name, { color: event.color, backgroundColor: event.all_day ? `${event.color}25` : 'white' }]}
        numberOfLines={1}
      >
        {event.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  marker: {
    width: 3,
  },
  name: {
    fontSize: 10,
    paddingLeft: 6,
    paddingRight: 6,
  },
});

export default CalendarBlock;