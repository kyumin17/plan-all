import { View, StyleSheet, Text } from 'react-native';
import { ScheduleProps } from '../../types/types';
import { getTimeSum, timeToString } from '../../utils/time';

const ScheduleBlock = (
  { schedule, startTime }:
  { 
    schedule: ScheduleProps,
    startTime: number,
  }
) => {
  if (schedule.all_day) {
    return <></>;
  }

  const startSum = getTimeSum(schedule.start_hour, schedule.start_minute);
  const endSum = getTimeSum(schedule.end_hour, schedule.end_minute);
  const height = 70 * (endSum - startSum) / 60;
  const top = 70 * (startSum - startTime * 60) / 60;

  return (
    <View 
      style={[
        styles.block, 
        { backgroundColor: schedule.color, height: height, top: top }
      ]}>
        <Text style={styles.name}>
          {schedule.name}
        </Text>
        <Text style={styles.detail}>
          {timeToString(schedule.start_hour, schedule.start_minute)}
          {' - '}
          {timeToString(schedule.end_hour, schedule.end_minute)}
        </Text>
        <Text style={styles.detail}>
          {schedule.location}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    boxSizing: 'border-box',
    width: '100%',
    height: 70,
    borderRadius: 4,
    zIndex: 1,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: 'white',
    borderWidth: 0.5,
  },
  name: {
    color: 'white',
    fontWeight: 500,
  },
  detail: {
    color: 'white',
    fontSize: 13,
  }
});

export default ScheduleBlock;