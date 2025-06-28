import TitleInput from '../../components/create_form/TitleInput';
import TimeInput from '../../components/create_form/TimeInput';
import LocationInput from '../../components/create_form/LocationInput';
import SaveButton from '../../components/create_form/SaveButton';
import { View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import colors from '../../styles/color';
import { getRandom } from '../../utils/random';
import useDB from '../../hooks/useDB';
import DateInput from '../../components/create_form/DateInput';
import { useNavigation } from '@react-navigation/native';

const CalendarCreatePage = () => {
  const date = new Date();
  const db = useDB();
  const navigation = useNavigation<any>();

  const [name, setName] = useState<string>('');
  const [startHour, setStartHour] = useState<number>(date.getHours());
  const [startMinute, setStartMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));
  const [endHour, setEndHour] = useState<number>(date.getHours());
  const [endMinute, setEndMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));
  const [location, setLocation] = useState<string>('');
  const [color, setColor] = useState<string>(colors[getRandom(0, colors.length)]);

  const save = async () => {
    const query = 'INSERT INTO calendar (name, date, start_hour, start_minute, end_hour, end_minute, location, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [name, new Date().toISOString().split('T')[0], startHour, startMinute, endHour, endMinute, location, color];

    if (db) {
      try {
        await db.executeSql(query, params);
        navigation.navigate('CalendarPage');
      } catch (error: any) {
        console.error(error.message);
      }
    } else {
      console.error('DB not initialized');
    }
  };

  return (
    <View style={styles.page}>
      <TitleInput name={name} setName={setName} color={color} setColor={setColor} />
      <View style={styles.detail}>
        <DateInput />
        <TimeInput timeManage={{startHour, startMinute, endHour, endMinute, setStartHour, setStartMinute, setEndHour, setEndMinute}} />
        <LocationInput location={location} setLocation={setLocation} />
      </View>
      <SaveButton 
        save={save}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    marginTop: '10%',
    height: '100%',
  },
  detail: {
    marginLeft: '10%',
    marginRight: '10%',
  },
});

export default CalendarCreatePage;