import { View, Button, StyleSheet } from 'react-native';
import ScheduleBlock from '../components/schedule/ScheduleBlock';
import { ScheduleProps, TimeProps } from '../types/types';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import useDB from '../hooks/useDB';

const SchedulePage = () => {
  const navigation = useNavigation<any>();
  const db = useDB();
  
  const [scheduleList, setScheduleList] = useState<ScheduleProps[]>([]);

  const fetchSchedule = async () => {
    const dateStr = new Date().toISOString().split('T')[0];

    db?.transaction((tx) => {
      tx.executeSql('SELECT * FROM schedule WHERE date = ?', [dateStr], (tx, results) => {
        const schedules: ScheduleProps[] = [];
        for (let i = 0; i < results.rows.length; i++) {
          schedules.push(results.rows.item(i));
        }
        setScheduleList(schedules);
      }, (error) => {
        console.error('Error fetching schedules:', error);
      });
    });
  }

  const [currentTime, setCurrentTime] = useState<TimeProps>({
    hour: new Date().getHours(), 
    minute: new Date().getMinutes()
  });

  useEffect(() => {
    if (db) {
      fetchSchedule();
    }
  }, [db]);

  useEffect(() => {
    const getDate = setInterval(() => {
      setCurrentTime({
        hour: new Date().getHours(), 
        minute: new Date().getMinutes()
      });
    }, 2000);

    return () => clearInterval(getDate);
  }, []);

  return (
    <View style={styles.page}>
      {scheduleList.map((schedule) => {
        return <ScheduleBlock schedule={schedule} currentTime={currentTime} key={schedule.id} />;
      })}
      <Button title='Create Schedule' onPress={() => navigation.navigate('ScheduleCreatePage')} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingTop: '10%',
    paddingLeft: 16,
    paddingRight: 16,
  }
});

export default SchedulePage;