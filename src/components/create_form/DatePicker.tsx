import DatePicker from 'react-native-date-picker';

const DatePickerBox = () => {
  return (
    <DatePicker
      mode="date"
      date={new Date()}
      onDateChange={(date) => console.log(date)}
      style={{ width: '100%' }}
    />
  );
};

export default DatePickerBox;