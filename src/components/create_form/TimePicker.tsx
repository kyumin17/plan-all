import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import WheelPicker from 'react-native-wheely';

const TimePicker = ({ hour, minute, setHour, setMinute }
  : { hour: number; minute: number; setHour: React.Dispatch<React.SetStateAction<number>>; setMinute: React.Dispatch<React.SetStateAction<number>>}
) => {
  const [period, setPeriod] = useState<number>(hour < 12 ? 0: 1);

  const periods: string[] = ['오전', '오후'];
  const hours: string[] = Array.from({length: 12}, (_, i) => String(i + 1));
  const minutes: string[] = Array.from({length: 12}, (_, i) => String(i * 5));

  return (
    <View style={styles.timePicker}>
      <WheelPicker
        selectedIndex={period}
        options={periods}
        onChange={(index) => {
          setPeriod(index);
          setHour(hour % 12 + index * 12);
        }}
      />
      <WheelPicker
        selectedIndex={(hour + 11) % 12}
        options={hours}
        onChange={(index) => {setHour(index + period * 12)}}
      />
      <WheelPicker
        selectedIndex={Math.floor(minute / 5)}
        options={minutes}
        onChange={(index) => {setMinute(index * 5)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TimePicker;