import { View, Text, Pressable, StyleSheet } from 'react-native';
import ClockSvg from '../../../assets/image/clock.svg';
import ArrowRightSvg from '../../../assets/image/arrow-right.svg';
import { timeToStr } from '../../../utils/time';
import { TimeManageProps } from '../../../types/types';
import TimePicker from '../picker/TimePicker';
import { useState } from 'react';

const TimeInput = ({ timeManage }: { timeManage: TimeManageProps }) => {
  const { startHour, startMinute, endHour, endMinute, setStartHour, setStartMinute, setEndHour, setEndMinute } = timeManage;
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const [isEndOpen, setIsEndOpen] = useState<boolean>(false);

  return (
    <View>
      <View style={styles.timeInput}>
        <ClockSvg width={18} height={18} stroke='#5D5D5D' strokeWidth={2} />
        <View style={styles.timeBlock}>
          {/* start button */}
          <Pressable
            style={[styles.timeSelectButton, isStartOpen ? styles.timeSelectActivate : {}]}
            onPress={() => {
              setIsStartOpen(!isStartOpen)
              setIsEndOpen(false);
            }}
          >
            <Text style={styles.time}>
              {timeToStr(startHour, startMinute)}
            </Text>
          </Pressable>
          <ArrowRightSvg style={styles.arrow} width={20} height={20} stroke='#5D5D5D' strokeWidth={2} />
          {/* end button */}
          <Pressable
            style={[styles.timeSelectButton, styles.timeSelectRightButton, isEndOpen ? styles.timeSelectActivate : {}]}
            onPress={() => {
              setIsEndOpen(!isEndOpen);
              setIsStartOpen(false);
            }}
          >
            <Text style={styles.time}>
              {timeToStr(endHour, endMinute)}
            </Text>
          </Pressable>
        </View>
      </View>
      {/* time picker */}
      <View style={[styles.timePickerWrapper, { display: !isStartOpen && !isEndOpen ? 'none' : 'flex' }]}>
        <TimePicker 
          hour={isStartOpen ? startHour : endHour} 
          minute={isStartOpen ? startMinute : endMinute}
          setHour={isStartOpen ? setStartHour : setEndHour}
          setMinute={isStartOpen ? setStartMinute : setEndMinute}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeInput: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  timeBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSelectButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 5,
  },
  timeSelectRightButton: {
    position: 'absolute',
    left: 190,
  },
  timeSelectActivate: {
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
  },
  time: {
    fontSize: 16,
  },
  timePickerWrapper: {
    marginRight: '10%',
    marginLeft: '10%',
  },
  arrow: {
    position: 'absolute',
    left: 135,
  }
});

export default TimeInput;