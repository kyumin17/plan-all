import useDB from '../hooks/useDB';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import LocationInput from '../components/create_form/LocationInput';
import TimeInput from '../components/create_form/TimeInput';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import colors from '../styles/color';
import { getRandom } from '../utils/random';
import TitleInput from '../components/create_form/TitleInput';

const ScheduleCreatePage = ({ navigation }: { navigation: any }) => {
  const db = useDB();
  const date = new Date();

  const [name, setName] = useState<string>('');
  const [startHour, setStartHour] = useState<number>(date.getHours());
  const [startMinute, setStartMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));
  const [endHour, setEndHour] = useState<number>(date.getHours());
  const [endMinute, setEndMinute] = useState<number>(5 * Math.floor(date.getMinutes() / 5));
  const [location, setLocation] = useState<string>('');

  const [color, setColor] = useState<string>(colors[getRandom(0, colors.length)]);

  const saveSchedule = async () => {
    const dateStr = new Date().toISOString().split('T')[0];
    if (db && name) {
      const query = 'INSERT INTO schedule (name, date, start_hour, start_minute, end_hour, end_minute, location, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const params = [name, dateStr, startHour, startMinute, endHour, endMinute, location, color];

      try {
        await db.executeSql(query, params);
        navigation.navigate('SchedulePage');
      } catch (error: any) {
        console.error(error.message);
      }
    } else {
      console.error('DB not initialized or name is empty');
    }
  }

  return (
    <View style={styles.page}>
      <TitleInput name={name} setName={setName} color={color} setColor={setColor} />
      <View style={styles.detail}>
        <TimeInput timeManage={{startHour, startMinute, endHour, endMinute, setStartHour, setStartMinute, setEndHour, setEndMinute}} />
        <LocationInput location={location} setLocation={setLocation} />
      </View>
      <Pressable 
        style={[styles.saveButton, { marginBottom: useBottomTabBarHeight() }]}
        onPress={saveSchedule} 
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          저장하기
        </Text>
      </Pressable>
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
  saveButton: {
    backgroundColor: '#3B3B3B',
    marginRight: '4%',
    marginLeft: '4%',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 5,
    width: '92%',
    position: 'absolute',
    bottom: -20,
  },
});

export default ScheduleCreatePage;