import { View, Text, StyleSheet } from 'react-native';
import CalendarCell from './CalendarCell';
import { CalendarProps } from '../../types/types';
import { useState, useEffect } from 'react';
import { useDB } from '../common/DBProvider';
import selectDB from '../../utils/db/selectDB';

interface FindFilter {
  start_year: number;
  start_month: number;
}

const CalendarBody = ({ year, month }: { year: number, month: number }) => {
  const startDay: number = (new Date(year, month - 1, 1).getDay() - 1) % 7; // mon: 0
  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const dateNum: number = new Date(year, month - 1, 0).getDate();
  const rowNum: number = 6;

  const [eventList, setEventList] = useState<CalendarProps[]>([]);

  const db = useDB();

  useEffect(() => {
    selectDB<FindFilter>({
      db: db,
      tableName: 'calendar',
      filter: {
        findFilter: { start_year: year, start_month: month },
        orderFilter: ['start_date'],
      },
    }).then((res) => {
      if (res) setEventList(res);
    });
  }, [db, year, month]);

  return (
    <View>
      {/* calendar header */}
      <View style={styles.th}>
        {dayNameList.map((day: string) => {
          return <Text key={day} style={styles.th_cell}>{day}</Text>;
        })}
      </View>

      {/* calendar body */}
      {Array.from({ length: rowNum }, (_, i) => i).map((week: number) => {
        return (
          <View key={week} style={styles.row}>
            {Array.from({ length: 7 }, (_, i) => i).map((day: number) => {
              const date: number = day - startDay + week * 7 + 1;
              const data = eventList.filter((event) => event.start_date === date);
              
              return (
                <CalendarCell 
                  key={date}
                  date={0 < date && date <= dateNum ? date : null} 
                  day={day} 
                  data={data}
                  isToday={date === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear()}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  th: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    height: 30,
  },
  th_cell: {
    flex: 1,
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    height: '15.2%',
  },
});

export default CalendarBody;