import TitleInput from '../../components/create_form/input/TitleInput';
import DayPicker from '../../components/create_form/picker/DayPicker';
import { Alert } from 'react-native';
import { useState } from 'react';
import colors from '../../styles/color';
import { getRandom } from '../../utils/random';
import DayTimeInput from '../../components/create_form/input/DayTimeInput';
import { TimeManageProps, TimeProps, TimetableDTO } from '../../types/types';
import Button from '../../components/create_form/button/Button';
import { useDB } from '../../components/common/DBProvider';
import execDB from '../../utils/db/execDB';
import LocationInput from '../../components/create_form/input/LocationInput';
import DescriptionInput from '../../components/create_form/input/DescriptionInput';
import Gap from '../../components/common/Gap';
import styled from 'styled-components/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CancelButton from '../../components/create_form/button/CancelButton';
import { useNavigation } from '@react-navigation/native';
import ColorInput from '../../components/create_form/input/ColorInput';

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

const DayTimeWrapper = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 25px;
`;

const TimeTableCreatePage = ({ route }: { route: any }) => {
  const { table }: { table: TimetableDTO } = route.params;

  const navigation = useNavigation<any>();

  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>(colors[getRandom(1, colors.length)]);
  const [selectDays, setSelectDays] = useState<number[]>([]);

  const initTimes: TimeProps = {hour: 12, minute: 0};

  const [location, setLocation] = useState<string>('');
  const [startTimes, setStartTimes] = useState<TimeProps[]>(Array.from({length: 7}, () => initTimes));
  const [endTimes, setEndTimes] = useState<TimeProps[]>(Array.from({length: 7}, () => initTimes));
  const [description, setDescription] = useState<string>('');

  const db = useDB();

  const validateInputs = () => {
    if (name.trim() === '') {
      Alert.alert('오류', '시간표 이름을 입력해주세요.');
      return false;
    }

    if (selectDays.length === 0) {
      Alert.alert('오류', '시간표에 포함할 요일을 선택해주세요.');
      return false;
    }

    for (let i = 0; i < selectDays.length; i++) {
      const day = selectDays[i];
      if (startTimes[day].hour > endTimes[day].hour || 
          (startTimes[day].hour === endTimes[day].hour && startTimes[day].minute >= endTimes[day].minute)) {
        Alert.alert('오류', `시작 시간은 종료 시간보다 빨라야 합니다. ${['월', '화', '수', '목', '금', '토', '일'][day]}요일을 확인해주세요.`);
        return false;
      }
    }

    return true;
  }

  const save = async () => {
    if (!validateInputs()) return;

    if (!db) {
      console.error('Database connection failed');
      return;
    }

    for (const i of selectDays) {
      const params = [name.trim(), table.id, i, startTimes[i].hour, startTimes[i].minute, endTimes[i].hour, endTimes[i].minute, location, color, description];

      try {
        await execDB({
          db: db,
          query: `INSERT INTO timetable (name, table_id, day, start_hour, start_minute, end_hour, end_minute, location, color, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          params: params
        });
      } catch (error) {
        console.error('Error inserting data:', error);
        return;
      }
    }

    navigation.navigate('TimeTablePage');
  };

  return (
    <Page>
      <TitleInput name={name} setName={setName} />

      <Content>
        <DayPicker 
          selectDays={selectDays} 
          setSelectDays={setSelectDays} 
        />

        <DayTimeWrapper>
          {selectDays.map((day) => {
            const timeManage: TimeManageProps = {
              startHour: startTimes[day].hour,
              startMinute: startTimes[day].minute,
              endHour: endTimes[day].hour,
              endMinute: endTimes[day].minute,
              setStartHour: (hour: number) => {setStartTimes([...startTimes.slice(0, day), {hour: hour, minute: startTimes[day].minute}, ...startTimes.slice(day + 1)])},
              setStartMinute: (minute: number) => {setStartTimes([...startTimes.slice(0, day), {hour: startTimes[day].hour, minute: minute}, ...startTimes.slice(day + 1)])},
              setEndHour: (hour: number) => {setEndTimes([...endTimes.slice(0, day), {hour: hour, minute: endTimes[day].minute}, ...endTimes.slice(day + 1)])},
              setEndMinute: (minute: number) => {setEndTimes([...endTimes.slice(0, day), {hour: endTimes[day].hour, minute: minute}, ...endTimes.slice(day + 1)])},
            };
            return (
              <DayTimeInput
                key={day}
                day={day}
                timeManage={timeManage}
              />
            );
          })}
        </DayTimeWrapper>
        
        {selectDays.length !== 0 && <LocationInput location={location} setLocation={setLocation} />}

        <Gap height={10} />

        {selectDays.length !== 0 && <DescriptionInput 
          description={description}
          setDescription={setDescription}
        />}

        <Gap height={20} />

        {selectDays.length !== 0 && <ColorInput
          color={color}
          setColor={setColor}
        />}
      </Content>
      
      <ButtonWrapper style={{ marginBottom: useBottomTabBarHeight() - 12 }}>
        <CancelButton />
        <Button
          label='저장하기'
          color='black'
          handlePress={save}
        />
      </ButtonWrapper>
    </Page>
  );
};

export default TimeTableCreatePage;