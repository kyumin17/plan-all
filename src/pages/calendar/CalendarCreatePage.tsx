import TitleInput from '../../components/create_form/TitleInput';
import TimeInput from '../../components/create_form/TimeInput';
import LocationInput from '../../components/create_form/LocationInput';
import SaveButton from '../../components/create_form/SaveButton';
import { View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import colors from '../../styles/color';
import { getRandom } from '../../utils/random';
import DateInput from '../../components/create_form/DateInput';
import { useNavigation } from '@react-navigation/native';
import execDB from '../../utils/db/execDB';
import { useDB } from '../../components/common/DBProvider';
import { getTimeSum } from '../../utils/time';
import { DateProps } from '../../types/types';

const CalendarCreatePage = () => {
  const date = new Date();
  const navigation = useNavigation<any>();

  const [name, setName] = useState<string>('');

  const [startYear, setStartYear] = useState<number>(date.getFullYear());
  const [startMonth, setStartMonth] = useState<number>(date.getMonth() + 1);
  const [startDate, setStartDate] = useState<number>(date.getDate());
  const [startHour, setStartHour] = useState<number>(date.getHours());
  const [startMinute, setStartMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));

  const [endYear, setEndYear] = useState<number>(date.getFullYear());
  const [endMonth, setEndMonth] = useState<number>(date.getMonth() + 1);
  const [endDate, setEndDate] = useState<number>(date.getDate());
  const [endHour, setEndHour] = useState<number>(date.getHours());
  const [endMinute, setEndMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));

  const [location, setLocation] = useState<string>('');
  const [color, setColor] = useState<string>(colors[getRandom(0, colors.length)]);

  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  
  const db = useDB();

  const save = async () => {
    if (!db) {
      console.error('Database connection failed');
      return;
    }

    if (!validateInputs()) return;

    try {
      await execDB({
        db: db,
        query: 'INSERT INTO calendar (name, start_hour, start_minute, end_hour, end_minute, location, color, start_date, start_month, start_year, end_date, end_month, end_year, all_day) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        params: [name.trim(), startHour, startMinute, endHour, endMinute, location, color, startDate, startMonth, startYear, endDate, endMonth, endYear, isAllDay ? 1 : 0]
      });
    } catch (error) {
      console.error('Error executing query:', error);
      return;
    }

    navigation.navigate('CalendarPage');
  };

  const validateInputs = () => {
    if (name.trim() === '') {
      Alert.alert('오류', '시간표 이름을 입력해주세요.');
      return false;
    }

    if (getTimeSum(startHour, startMinute) >= getTimeSum(endHour, endMinute)) {
      Alert.alert('오류', '시작 시간은 종료 시간보다 빨라야 합니다.');
      return false;
    }

    return true;
  }

  const startYMD: DateProps = {
    year: startYear,
    month: startMonth,
    date: startDate
  }

  const endYMD: DateProps = {
    year: endYear,
    month: endMonth,
    date: endDate
  }

  return (
    <View style={styles.page}>
      <TitleInput name={name} setName={setName} color={color} setColor={setColor} />
      <View style={styles.detail}>
        <DateInput startDate={startYMD} endDate={endYMD} />
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