import { View, Text, StyleSheet, Pressable } from 'react-native';

const ScheduleHeader = (
  { year, month, date }: 
  { 
    year: number; 
    month: number; 
    date: number;
  }
) => {
  return (
    <View>
      <Text style={styles.title}>
        일정
      </Text>
      <Pressable>
        <Text style={styles.time}>
          {year}년 {month}월 {date}일
        </Text>
      </Pressable>
    </View>
  )
}

export default ScheduleHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 30,
  },
  time: {
    textAlign: 'center',
    marginBottom: 25,
    color: '#5D5D5D',
  }
});