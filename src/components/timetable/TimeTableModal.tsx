import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TimeblockProps } from '../../types/types';
import { useEffect, useState } from 'react';
import { useDB } from '../common/DBProvider';
import execDB from '../../utils/db/execDB';
import TrashSvg from '../../assets/image/trash.svg';
import EditSvg from '../../assets/image/edit.svg';

const TimeTableModal = (
  { timeblock, setTimeblock, navigation }:
  { 
    timeblock: TimeblockProps,
    setTimeblock: React.Dispatch<React.SetStateAction<TimeblockProps | null>>,
    navigation: any
  }
) => {
  const [timeblockList, setTimeblockList] = useState<TimeblockProps[]>([]);
  const db = useDB();

  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];

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
          timetables.push(block);
        }
        setTimeblockList(timetables);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimeblocks();
  }, [timeblock]);

  const handleDelete = async () => {
    if (!db) {
      console.error('Database connection failed');
      return;
    }

    try {
      await execDB({
        db: db,
        query: 'DELETE FROM timetable WHERE name = ?',
        params: [timeblock.name]
      });
      setTimeblock(null);
      navigation.replace('TimeTablePage');
    } catch (error) {
      console.error('Error deleting timetable:', error);
    }
  }

  return (
    <Pressable 
      style={styles.background}
      onPress={() => setTimeblock(null)}
    >
      <Pressable
        onPress={(e) => e.stopPropagation()} 
        style={[styles.modal, {display: timeblock ? 'flex' : 'none'}]}
      >
        <Text style={styles.name}>
          {timeblock.name}
        </Text>
        <Text>
          {timeblockList && timeblockList.map((block, index) => {
            return (
              <Text 
                key={block.id}
                style={styles.day}
              >
                {`${dayNameList[block.day]}  ${String(block.start_hour).padStart(2, '0')}:${String(block.start_minute).padStart(2, '0')} - ${String(block.end_hour).padStart(2, '0')}:${String(block.end_minute).padStart(2, '0')}`}
                {index < timeblockList.length - 1 ? ', ' : ''}
              </Text>
            )
          })}
        </Text>
        {timeblock.location && 
        <Text style={styles.location}>
          {timeblock.location}
        </Text>}
        <Pressable 
          style={[styles.modal_button, {marginBottom: 15, marginTop: 15}]}
          onPress={() => {navigation.navigate('TimeTableEditPage', { timeblock: timeblock })}}
        >
          <EditSvg width={20} height={20} />
          <Text style={{color: '#5D5D5D'}}>
            수정하기
          </Text>
        </Pressable>
        <Pressable 
          style={styles.modal_button}
          onPress={handleDelete}
        >
          <TrashSvg width={22} height={22} />
          <Text style={{color: '#FF2A00'}}>
            삭제하기
          </Text>
        </Pressable>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    zIndex: 5,
    position: 'absolute',
  },
  modal: {
    position: 'absolute',
    backgroundColor: 'white',
    right: '50%',
    top: '50%',
    transform: [{ translateX: '50%' }, { translateY: '-50%' }],
    zIndex: 6,
    width: '70%',
    borderRadius: 10,
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 30,
    paddingLeft: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    marginRight: 10,
    marginBottom: 7,
  },
  location: {
    marginTop: 5,
    fontSize: 13,
    color: '#A9A9A9',
  },
  day: {
    fontSize: 13,
    color: '#A9A9A9',
  },
  modal_button: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  }
});

export default TimeTableModal;