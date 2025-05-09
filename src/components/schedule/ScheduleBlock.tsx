import { View, Text, StyleSheet } from 'react-native';
import { ScheduleProps, TimeProps } from '../../types/types';
import theme from '../../styles/theme';

const ScheduleBlock = ({ schedule, currentTime } : { schedule: ScheduleProps, currentTime: TimeProps }) => {
  const getTimeSum = (hour: number, minute: number) => {
    return hour * 60 + minute;
  };

  const isFinished = () => {
    const curSum = getTimeSum(currentTime.hour, currentTime.minute);
    const endSum = getTimeSum(schedule.end_hour, schedule.end_minute);

    return endSum < curSum;
  };

  const timeToString = (hour: number, minute: number) => {
    const hourStr: string = hour <= 9 ? '0' + hour : '' + hour;
    const minStr: string = minute <= 9 ? '0' + minute : '' + minute;
    return hourStr + ':' + minStr;
  };

  return (
    <View style={[styles.block, isFinished() && styles.blockInactive]}>
      <View style={[styles.icon, {backgroundColor: isFinished() ? '#AAAAAA' : schedule.color}]}>
      </View>
      <View>
        <Text style={[styles.time, isFinished() && styles.textInactive]}>
          {timeToString(schedule.start_hour, schedule.start_minute)} - {timeToString(schedule.end_hour, schedule.end_minute)}
        </Text>
        <View style={styles.body}>
          <Text style={[styles.name, isFinished() && styles.textInactive]}>
            {schedule.name}
          </Text>
          <Text style={styles.location}>
            {schedule.location}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    paddingTop: 18,
    paddingBottom: 24,
    paddingLeft: 12,
    paddingRight: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  blockInactive: {
    backgroundColor: '#EFEFEF',
  },
  icon: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  time: {
    marginBottom: 10,
    color: '#686C76',
    fontSize: theme.fontSize.sm,
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: theme.fontSize.md,
  },
  textInactive: {
    color: '#8E8E8E',
  },
  location: {
    fontSize: theme.fontSize.md,
    color: '#A9A9A9',
  },
});

export default ScheduleBlock;