import { View, StyleSheet } from 'react-native';
import ScheduleBlock from '../../components/schedule/ScheduleBlock';
import { ScheduleProps, TimeProps } from '../../types/types';
import { useState, useEffect } from 'react';
import { useDB } from '../../components/common/DBProvider';
import selectDB from '../../utils/db/selectDB';

const SchedulePage = () => {
  const [scheduleList, setScheduleList] = useState<ScheduleProps[]>([]);

  const [currentTime, setCurrentTime] = useState<TimeProps>({
    hour: new Date().getHours(), 
    minute: new Date().getMinutes()
  });

  const db = useDB();

  useEffect(() => {
    // selectDB<null>({
    //   db: db,
    //   tableName: 'schedule',
    //   filter: {
    //     orderFilter: ['start_hour', 'start_minute'],
    //   },
    // }).then((res) => {
    //   if (res) {
    //     setScheduleList(res);
    //   }
    // }
    // );
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