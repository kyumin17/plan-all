import TitleInput from '../../components/create_form/TitleInput';
import DayPicker from '../../components/create_form/DayPicker';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import colors from '../../styles/color';
import { getRandom } from '../../utils/random';
import DayTimeInput from '../../components/create_form/DayTimeInput';
import { TimeManageProps, TimeProps } from '../../types/types';
import SaveButton from '../../components/create_form/SaveButton';
import usePost from '../../hooks/usePost';

const TimeTableCreatePage = ({ navigation }: { navigation: any }) => {
  const insertData = usePost();

  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>(colors[getRandom(1, colors.length)]);
  const [selectDays, setSelectDays] = useState<number[]>([]);

  const date = new Date();
  const initTimes: TimeProps = {hour: date.getHours(), minute: 5 * Math.floor(date.getMinutes() / 5)};

  const [locations, setLocations] = useState<string[]>(Array.from({length: 7}, () => ''));
  const [startTimes, setStartTimes] = useState<TimeProps[]>(Array.from({length: 7}, () => initTimes));
  const [endTimes, setEndTimes] = useState<TimeProps[]>(Array.from({length: 7}, () => initTimes));

  const save = async () => {
    const fieldNames = ['name', 'day', 'start_hour', 'start_minute', 'end_hour', 'end_minute', 'location', 'color'];

    for (const i of selectDays) {
      const fieldValues = [name, i, startTimes[i].hour, startTimes[i].minute, endTimes[i].hour, endTimes[i].minute, locations[i], color];
      
      await insertData({ 
        tableName: 'timetable', 
        fieldNames: fieldNames, 
        fieldValues: fieldValues
      });
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
                location={locations[day]}
                setLocation={(location: string) => {
                  setLocations([...locations.slice(0, day), location, ...locations.slice(day + 1)])
                }}
              />
            );
          })}
        </View>
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
    marginTop: 25,
  },
});

export default TimeTableCreatePage;