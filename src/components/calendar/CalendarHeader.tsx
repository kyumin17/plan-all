import { View, Text, StyleSheet } from 'react-native';

const CalendarHeader = (
  { year, setYear, month, setMonth }: 
  { year: number, 
    setYear: React.Dispatch<React.SetStateAction<number>>, 
    month: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>
  }
) => {
  const currentYear = new Date().getFullYear();
  return (
    <Text style={styles.title}>
      {year !== currentYear ? `${year}년 ` : ''}{month}월
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default CalendarHeader;