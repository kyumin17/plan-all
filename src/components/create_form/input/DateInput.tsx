import { View, Pressable, Text, StyleSheet } from 'react-native';
import ArrowRightSvg from '../../../assets/image/arrow-right.svg';
import CalendarSvg from '../../../assets/image/calendar.svg';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { DateProps } from '../../../types/types';

const DateInput = (
  { startDate, endDate }:
  {
    startDate: DateProps,
    endDate: DateProps,
  }
) => {
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const [isEndOpen, setIsEndOpen] = useState<boolean>(false);
  const [isAllDay, setIsAllDay] = useState<boolean>(true);

  return (
    <View>
      <View style={styles.dateInput}>
        <CalendarSvg width={18} height={18} stroke='#5D5D5D' strokeWidth={2} />
        <View style={styles.dateBlock}>
          {/* start button */}
          <Pressable
            style={[styles.dateSelectButton, isStartOpen ? styles.dateSelectActivate : {}]}
            onPress={() => {
              setIsStartOpen(!isStartOpen);
              setIsEndOpen(false);
            }}
          >
            <Text style={styles.date}>
              {String(startDate.month).padStart(2, '0')}월 {String(startDate.date).padStart(2, '0')}일
            </Text>
          </Pressable>
          <ArrowRightSvg 
            style={[styles.arrow, { display: isAllDay ? 'flex' : 'none' }]} 
            width={20} 
            height={20} 
            stroke='#5D5D5D' 
            strokeWidth={2} 
          />
          
          {/* end button */}
          <Pressable
            style={[
              styles.dateSelectButton, 
              styles.dateSelectRightButton, 
              isEndOpen ? styles.dateSelectActivate : {},
              { display: isAllDay ? 'flex' : 'none' }
            ]}
            onPress={() => {
              setIsEndOpen(!isEndOpen);
              setIsStartOpen(false);
            }}
          >
            <Text style={[styles.date]}>
              {String(endDate.month).padStart(2, '0')}월 {String(endDate.date).padStart(2, '0')}일
            </Text>
          </Pressable>
        </View>
      </View>
      {/* date picker */}
      <View style={[styles.datePickerWrapper, { display: !isStartOpen && !isEndOpen ? 'none' : 'flex' }]}>
        <DatePicker date={new Date()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  dateBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateSelectButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 5,
  },
  dateSelectRightButton: {
    position: 'absolute',
    left: 190,
  },
  dateSelectActivate: {
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
  },
  date: {
    fontSize: 16,
  },
  datePickerWrapper: {
    marginRight: '10%',
    marginLeft: '10%',
  },
  arrow: {
    position: 'absolute',
    left: 135,
  }
});

export default DateInput;