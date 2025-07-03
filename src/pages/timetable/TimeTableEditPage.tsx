import TitleInput from '../../components/create_form/TitleInput';
import DayPicker from '../../components/create_form/DayPicker';
import { View, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import DayTimeInput from '../../components/create_form/DayTimeInput';
import { TimeManageProps, TimeProps } from '../../types/types';
import SaveButton from '../../components/create_form/SaveButton';
import { useDB } from '../../components/common/DBProvider';
import execDB from '../../utils/db/execDB';
import LocationInput from '../../components/create_form/LocationInput';
import { TimeblockProps } from '../../types/types';

const TimeTableEditPage = ({ navigation, route }: 
  { 
    navigation: any, 
    route: any 
  }) => {
  const { timeblock } = route.params;

  const [name, setName] = useState<string>(timeblock.name);
  const [color, setColor] = useState<string>(timeblock.color);
  const [selectDays, setSelectDays] = useState<number[]>([]);

  const initTimes: TimeProps = {hour: 12, minute: 0};

  const [location, setLocation] = useState<string>(timeblock.location ? timeblock.location : '');
  const [startTimes, setStartTimes] = useState<TimeProps[]>(Array.from({length: 7}, () => initTimes));
  const [endTimes, setEndTimes] = useState<TimeProps[]>(Array.from({length: 7}, () => initTimes));

  const db = useDB();

  useEffect(() => {
    const fetchTimeblocks = async () => {
      if (!db) {
        console.error('Database connection failed');
        return;
      }
      
      try {
        const { data, error } = await execDB({
          db: db,
          query: 'SELECT * FROM timetable WHERE name = ?',
          params: [timeblock.name]
        });

        if (error) {
          console.error('Error fetching timetable:', error);
          return;
        }

        if (!data) return;

        const timetables: TimeblockProps[] = [];
        for (let i = 0; i < data.rows.length; i++) {
          const block: TimeblockProps = data.rows.item(i);
          setSelectDays([...selectDays, block.day]);
          setStartTimes(prev => {
            const newStartTimes = [...prev];
            newStartTimes[block.day] = {hour: block.start_hour, minute: block.start_minute};
            return newStartTimes;
          });
          setEndTimes(prev => {
            const newEndTimes = [...prev];
            newEndTimes[block.day] = {hour: block.end_hour, minute: block.end_minute};
            return newEndTimes;
          });
          timetables.push(block);
        }
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimeblocks();
  }, [timeblock]);

  function validateInputs() {
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
      const params = [name.trim(), i, startTimes[i].hour, startTimes[i].minute, endTimes[i].hour, endTimes[i].minute, location, color];

      try {
        await execDB({
          db: db,
          query: `INSERT INTO timetable (name, day, start_hour, start_minute, end_hour, end_minute, location, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
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
    <View style={styles.page}>
      <TitleInput name={name} setName={setName} color={color} setColor={setColor} />
      <View style={styles.detail}>
        <DayPicker selectDays={selectDays} setSelectDays={setSelectDays} />
        <View style={styles.dayTimeWrapper}>
          {selectDays.map((day) => {
            const timeManage: TimeManageProps = {
              startHour: startTimes[day].hour,
              startMinute: startTimes[day].minute,
              endHour: endTimes[day].hour,
              endMinute: endTimes[day].minute,
              setStartHour: (hour: number) => {setStartTimes([...startTimes.slice(0, day), {hour: hour, minute: startTimes[day].minute}, ...startTimes.slice(day + 1)])},
              setStartMinute: (minute: number) => {setStartTimes([...startTimes.slice(0, day), {hour: startTimes[day].hour, minute: minute}, ...startTimes.slice(day + 1)])},
              setEndHour: (hour: number) => {setEndTimes([...endTimes.slice(0, day), {hour: hour, minute: endTimes[day].minute}, ...endTimes.slice(day + 1)])},
              setEndMinute: (minute: number) => {setStartTimes([...endTimes.slice(0, day), {hour: endTimes[day].hour, minute: minute}, ...endTimes.slice(day + 1)])},
            };
            return (
              <DayTimeInput
                key={day}
                day={day}
                timeManage={timeManage}
              />
            );
          })}
        </View>
        {selectDays.length !== 0 && <LocationInput location={location} setLocation={setLocation} />}
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
  dayTimeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 25,
  },
});

export default TimeTableEditPage;