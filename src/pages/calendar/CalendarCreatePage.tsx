import TitleInput from '../../components/create_form/TitleInput';
import TimeInput from '../../components/create_form/TimeInput';
import LocationInput from '../../components/create_form/LocationInput';
import SaveButton from '../../components/create_form/SaveButton';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import colors from '../../styles/color';
import { getRandom } from '../../utils/random';
import DateInput from '../../components/create_form/DateInput';
import { useNavigation } from '@react-navigation/native';
import usePost from '../../hooks/usePost';

const CalendarCreatePage = () => {
  const date = new Date();
  const navigation = useNavigation<any>();

  const [name, setName] = useState<string>('');

  const [startYear, setStartYear] = useState<number>(date.getFullYear());
  const [startMonth, setStartMonth] = useState<number>(date.getMonth());
  const [startDate, setStartDate] = useState<number>(date.getDate());
  const [startHour, setStartHour] = useState<number>(date.getHours());
  const [startMinute, setStartMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));

  const [endYear, setEndYear] = useState<number>(date.getFullYear());
  const [endMonth, setEndMonth] = useState<number>(date.getMonth());
  const [endDate, setEndDate] = useState<number>(date.getDate());
  const [endHour, setEndHour] = useState<number>(date.getHours());
  const [endMinute, setEndMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));

  const [location, setLocation] = useState<string>('');
  const [color, setColor] = useState<string>(colors[getRandom(0, colors.length)]);

  const [isAllDay, setIsAllDay] = useState<boolean>(false);

  const insertData = usePost();

  const save = async () => {
    await insertData({ 
      tableName: 'calendar', 
      fieldNames: ['name', 'date', 'start_hour', 'start_minute', 'end_hour', 'end_minute', 'location', 'color', 'start_date', 'start_month', 'start_year', 'end_date', 'end_month', 'end_year', 'all_day'], 
      fieldValues: [name, new Date().toISOString().split('T')[0], startHour, startMinute, endHour, endMinute, location, color, startDate, startMonth, startYear, endDate, endMonth, endYear, isAllDay ? 1 : 0] }
    );

    navigation.navigate('CalendarPage');
  };

  return (
    <View style={styles.page}>
      <TitleInput name={name} setName={setName} color={color} setColor={setColor} />
      <View style={styles.detail}>
        <DateInput />
        {!isAllDay && <TimeInput timeManage={{startHour, startMinute, endHour, endMinute, setStartHour, setStartMinute, setEndHour, setEndMinute}} />}
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