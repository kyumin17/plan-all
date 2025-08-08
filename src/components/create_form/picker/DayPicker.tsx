import CalendarSvg from '../../../assets/image/calendar.svg';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const DayPicker = ({ selectDays, setSelectDays }: { selectDays: number[], setSelectDays: React.Dispatch<React.SetStateAction<number[]>>}) => {
  const dayList: string[] = ['월', '화', '수', '목', '금', '토', '일'];

  const handleDayButton = (index: number) => {
    if (selectDays.includes(index)) {
      setSelectDays(selectDays.filter((day) => day !== index));
    } else {
      let newArr = [...selectDays, index];
      newArr.sort();
      setSelectDays(newArr);
    }
  };

  return (
    <View style={styles.dayPicker}>
      <CalendarSvg width={19} height={19} strokeWidth={1.2} stroke='black' />
      <View style={styles.dayButtonWrapper}>
        {dayList.map((day: string, index: number) => {
          return (
            <Pressable key={day} onPress={() => {handleDayButton(index)}}>
              <Text 
                style={[styles.dayButton, selectDays.includes(index) ? styles.dayButtonSelected : {}]}
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayPicker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  dayButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  dayButton: {
    width: 30,
    height: 30,
    color: '#A9A9A9',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 27,
    marginRight: 7,
    marginLeft: 7,
  },
  dayButtonSelected: {
    borderRadius: 20,
    borderWidth: 1,
    color: 'black',
  },
});

export default DayPicker;