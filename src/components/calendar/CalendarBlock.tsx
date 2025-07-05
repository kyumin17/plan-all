import { View, Text, StyleSheet } from 'react-native';
import { CalendarProps } from '../../types/types';

const CalendarBlock = ({ event }: { event: CalendarProps }) => {
  return (
    <View style={[styles.block]}>
      <Text 
        style={[styles.name, { color: event.color, backgroundColor: `${event.color}25` }]}
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
  },
  name: {
    fontSize: 11,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 2,
  },
});

export default CalendarBlock;