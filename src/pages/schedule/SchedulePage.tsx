import { View, StyleSheet } from 'react-native';
import ScheduleBlock from '../../components/schedule/ScheduleBlock';
import { ScheduleProps, TimeProps } from '../../types/types';
import { useState, useEffect } from 'react';
import { useDB } from '../../components/common/DBProvider';
import execDB from '../../utils/db/execDB';

const SchedulePage = () => {
  const [scheduleList, setScheduleList] = useState<ScheduleProps[]>([]);

  const [currentTime, setCurrentTime] = useState<TimeProps>({
    hour: new Date().getHours(), 
    minute: new Date().getMinutes()
  });

  const db = useDB();

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!db) {
        console.error('Database connection failed');
        return;
      }

      try {
        const { data, error } = await execDB({
          db: db,
          query: 'SELECT * FROM schedule WHERE date = ? ORDER BY start_hour, start_minute',
          params: [new Date().toISOString().split('T')[0]],
        });

        if (error) {
          console.error('Error fetching schedules:', error);
          return;
        }

        if (!data) return;

        const schedules: ScheduleProps[] = [];
        for (let i = 0; i < data.rows.length; i++) {
          schedules.push(data.rows.item(i));
        }
        setScheduleList(schedules);
      } catch (err) {
        console.error('Error executing query:', err);
      }
    }

    fetchSchedules();
  }, []);

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