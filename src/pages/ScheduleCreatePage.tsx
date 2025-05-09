import useDB from '../hooks/useDB';
import { View, TextInput, Text, Button } from 'react-native';
import { useState } from 'react';


const ScheduleCreatePage = ({ navigation }: { navigation: any }) => {
  const db = useDB();

  const [name, setName] = useState<string>('');
  const [startHour, setStartHour] = useState<string>('');
  const [startMinute, setStartMinute] = useState<string>('');
  const [endHour, setEndHour] = useState<string>('');
  const [endMinute, setEndMinute] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const saveSchedule = async () => {
    const dateStr = new Date().toISOString().split('T')[0];
    if (db && name) {
      const query = 'INSERT INTO schedule (name, date, start_hour, start_minute, end_hour, end_minute, location, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const params = [name, dateStr, Number(startHour), Number(startMinute), Number(endHour), Number(endMinute), location, 'red'];

      try {
        await db.executeSql(query, params);
        navigation.navigate('SchedulePage');
      } catch (error: any) {
        setName(error.message);
      }
    }
  }

  return (
    <View>
      <Text>이름</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder='name' 
      />
      <Text>시작</Text>
      <TextInput
        keyboardType='number-pad'
        value={startHour}
        onChangeText={text => setStartHour(text)}
        placeholder='name' 
      />
      <TextInput
        keyboardType='number-pad'
        value={startMinute}
        onChangeText={text => setStartMinute(text)}
        placeholder='name' 
      />
      <Text>끝</Text>
      <TextInput
        keyboardType='number-pad'
        value={endHour}
        onChangeText={text => setEndHour(text)}
        placeholder='name' 
      />
      <TextInput
        keyboardType='number-pad'
        value={endMinute}
        onChangeText={text => setEndMinute(text)}
        placeholder='name' 
      />
      <Text>장소</Text>
      <TextInput
        value={location}
        onChangeText={text => setLocation(text)}
        placeholder='name' 
      />
      <Button title='저장' onPress={saveSchedule} />
    </View>
  );
};

export default ScheduleCreatePage;