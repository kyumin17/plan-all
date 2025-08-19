import TitleInput from '../../components/create_form/input/TitleInput';
import TimeInput from '../../components/create_form/input/TimeInput';
import LocationInput from '../../components/create_form/input/LocationInput';
import { Alert } from 'react-native';
import { useState } from 'react';
import DateInput from '../../components/create_form/input/DateInput';
import { useNavigation } from '@react-navigation/native';
import execDB from '../../utils/db/execDB';
import { useDB } from '../../components/common/DBProvider';
import { getTimeSum } from '../../utils/time';
import { CalendarDTO, DateProps } from '../../types/types';
import DescriptionInput from '../../components/create_form/input/DescriptionInput';
import Gap from '../../components/common/Gap';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import Button from '../../components/create_form/button/Button';
import CancelButton from '../../components/create_form/button/CancelButton';
import { getRandomColor } from '../../utils/random';

const Page = styled.View`
  margin-top: 10%;
  height: 100%;
`;

const Content = styled.View`
  margin-left: 10%;
  margin-right: 10%;
`;

const ButtonWrapper = styled.View`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  gap: 10px;
  padding-left: 5%;
  padding-right: 5%;
`;

const CalendarEditPage = ({ route }: { route: any }) => {
  const { event }: { event: CalendarDTO } = route.params;

  const navigation = useNavigation<any>();

  const [name, setName] = useState<string>(event.name);

  const [startDate, setStartDate] = useState<DateProps>({
    year: event.start_year,
    month: event.start_month,
    date: event.start_date,
  });

  const [endDate, setEndDate] = useState<DateProps>({
    year: event.end_year,
    month: event.end_month,
    date: event.end_date,
  });

  const [startHour, setStartHour] = useState<number>(event.start_hour ?? 12);
  const [startMinute, setStartMinute] = useState<number>(event.start_minute ?? 0);

  const [endHour, setEndHour] = useState<number>(event.end_hour ?? 12);
  const [endMinute, setEndMinute] = useState<number>(event.end_minute ?? 0);

  const [location, setLocation] = useState<string>(event.location ?? '');
  const [description, setDescription] = useState<string>(event.description);
  const [color, setColor] = useState<string>(event.color);

  const [isAllDay, setIsAllDay] = useState<boolean>(event.all_day ? true : false);
  
  const db = useDB();

  const edit = async () => {
    if (!validateInputs()) return;

    if (!db) {
      console.error('Database connection failed');
      return;
    }

    try {
      await execDB({
        db: db,
        query: 'DELETE FROM calendar WHERE name = ?',
        params: [event.name]
      });
    } catch (error) {
      console.error('Error deleting calendar:', error);
    }

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
    <Page>
      <TitleInput name={name} setName={setName} />

      <Content>
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
      </Content>

      <ButtonWrapper style={{ marginBottom: useBottomTabBarHeight() - 12 }}> 
        <CancelButton />
        <Button
          label='수정하기'
          color='black'
          handlePress={edit}
        />
      </ButtonWrapper>
    </Page>
  );
};

export default CalendarEditPage;