import { View, Text, StyleSheet } from 'react-native';

const CalendarHeader = (
  { year, setYear, month, setMonth }: 
  { year: number, 
    setYear: React.Dispatch<React.SetStateAction<number>>, 
    month: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>
  }
) => {
  return (
    <Text style={styles.title}>
      {month}월
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: 22,
    marginLeft: '7%',
    fontWeight: 600,
  },
});

export default CalendarHeader;