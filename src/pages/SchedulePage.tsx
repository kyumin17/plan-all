import { View, StyleSheet } from 'react-native';
import ScheduleBlock from '../components/schedule/ScheduleBlock';
import { ScheduleProps, TimeProps } from '../types/types';
import { useState, useEffect } from 'react';

const SchedulePage = () => {
  const [currentTime, setCurrentTime] = useState<TimeProps>({
    hour: new Date().getHours(), 
    minute: new Date().getMinutes()
  });

  const scheduleList: ScheduleProps[] = [
    {id: '1', date: '09/10', start_at: {hour: 1, minute: 2}, end_at: {hour: 2, minute: 1}, location: 'D102', name: 'HELLO', color: '#53BF57'},
    {id: '2', date: '09/10', start_at: {hour: 10, minute: 0}, end_at: {hour: 11, minute: 0}, location: 'D102', name: '컴프 시험', color: '#3AAAFF'}
  ]; // test data

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