import TitleInput from '../../components/create_form/input/TitleInput';
import TimeInput from '../../components/create_form/input/TimeInput';
import LocationInput from '../../components/create_form/input/LocationInput';
import SaveButton from '../../components/create_form/button/SaveButton';
import { View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import colors from '../../styles/color';
import { getRandom } from '../../utils/random';
import DateInput from '../../components/create_form/input/DateInput';
import { useNavigation } from '@react-navigation/native';
import execDB from '../../utils/db/execDB';
import { useDB } from '../../components/common/DBProvider';
import { getTimeSum } from '../../utils/time';
import { DateProps } from '../../types/types';
import DescriptionInput from '../../components/create_form/input/DescriptionInput';
import Gap from '../../components/common/Gap';

const CalendarCreatePage = () => {
  const date = new Date();
  const navigation = useNavigation<any>();

  const [name, setName] = useState<string>('');

  const [startDate, setStartDate] = useState<DateProps>({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  });

  const [endDate, setEndDate] = useState<DateProps>({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  });

  const [startHour, setStartHour] = useState<number>(date.getHours());
  const [startMinute, setStartMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));

  const [endHour, setEndHour] = useState<number>(date.getHours());
  const [endMinute, setEndMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));

  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('')
  const [color, setColor] = useState<string>(colors[4]);

  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  
  const db = useDB();

  const save = async () => {
    if (!db) {
      console.error('Database connection failed');
      return;
    }

    if (!validateInputs()) return;

    try {
      if (isAllDay) {
        await execDB({
          db: db,
          query: 'INSERT INTO calendar (name, location, color, start_date, start_month, start_year, end_date, end_month, end_year, all_day, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          params: [name.trim(), location, color, startDate.date, startDate.month, startDate.year, endDate.date, endDate.month, endDate.year, 1, description]
        });
      } else {
        await execDB({
          db: db,
          query: 'INSERT INTO calendar (name, start_hour, start_minute, end_hour, end_minute, location, color, start_date, start_month, start_year, end_date, end_month, end_year, all_day, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          params: [name.trim(), startHour, startMinute, endHour, endMinute, location, color, startDate.date, startDate.month, startDate.year, endDate.date, endDate.month, endDate.year, 0, description]
        });
      }
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

    if (!isAllDay && getTimeSum(startHour, startMinute) >= getTimeSum(endHour, endMinute)) {
      Alert.alert('오류', '시작 시간은 종료 시간보다 빨라야 합니다.');
      return false;
    }

    return true;
  }

  return (
    <View style={styles.page}>
      <TitleInput name={name} setName={setName} color={color} setColor={setColor} />
      <View style={styles.detail}>
        <DateInput 
          startDate={startDate} 
          endDate={endDate} 
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <Gap height={30} />

        <TimeInput 
          timeManage={{startHour, startMinute, endHour, endMinute, setStartHour, setStartMinute, setEndHour, setEndMinute}} 
          isAllDay={isAllDay}
          setIsAllDay={setIsAllDay}
        />
        <Gap height={20} />

        <LocationInput 
          location={location} 
          setLocation={setLocation} 
        />
        <Gap height={10} />

        <DescriptionInput 
          description={description}
          setDescription={setDescription}
        />
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