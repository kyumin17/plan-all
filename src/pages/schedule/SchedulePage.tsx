import { View, StyleSheet } from 'react-native';
import ScheduleBlock from '../../components/schedule/ScheduleBlock';
import { ScheduleProps, TimeProps } from '../../types/types';
import { useState, useEffect } from 'react';
import CreateButton from '../../components/create_form/CreateButton';
import useFetch from '../../hooks/useFetch';
import { scheduleCreateCommand } from '../../assets/data/db_creation';

const SchedulePage = () => {
  const [scheduleList, setScheduleList] = useState<ScheduleProps[]>([]);

  const { result, error } = useFetch(
    { 
      createCommand: scheduleCreateCommand, 
      dbName: 'schedule',
      filter: 'date = ?',
      params: [new Date().toISOString().split('T')[0]],
    }
  );

  const [currentTime, setCurrentTime] = useState<TimeProps>({
    hour: new Date().getHours(), 
    minute: new Date().getMinutes()
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }

    if (result) {
      const schedules: ScheduleProps[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        schedules.push(result.rows.item(i));
      }
      setScheduleList(schedules);
    }
  }, [result, error]);

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
    <View style={{flex: 1}}>
      <View style={styles.page}>
        {scheduleList.map((schedule) => {
          return <ScheduleBlock schedule={schedule} currentTime={currentTime} key={schedule.id} />;
        })}
      </View>
      <CreateButton link='ScheduleCreatePage' />
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