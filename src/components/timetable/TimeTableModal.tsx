import { Text, View } from 'react-native';
import { TimeblockDTO } from '../../types/types';
import { useDB } from '../common/DBProvider';
import execDB from '../../utils/db/execDB';
import TrashSvg from '../../assets/image/trash.svg';
import EditSvg from '../../assets/image/edit.svg';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const Name = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
  margin-bottom: 7px;
`;

const Detail = styled.Text`
  font-size: 13px;
  color: #A9A9A9;
`;

const Button = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const TimeTableModal = ({ timeblockList }: { timeblockList: TimeblockDTO[] }) => {
  const navigation = useNavigation<any>();

  const db = useDB();

  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const name = timeblockList[0].name;
  const location = timeblockList[0].location;

  const handleDelete = async () => {
    if (!db) {
      console.error('Database connection failed');
      return;
    }

    try {
      await execDB({
        db: db,
        query: 'DELETE FROM timetable WHERE name = ?',
        params: [name]
      });
      navigation.replace('TimeTablePage');
    } catch (error) {
      console.error('Error deleting timetable:', error);
    }
  }

  const handleEdit = () => {
    navigation.replace('TimeTablePage');
    navigation.navigate('TimeTableEditPage', { timeblockList: timeblockList});
  }

  return (
    <View>
      <Name>
        {name}
      </Name>

      <Text>
        {timeblockList && timeblockList.map((block, index) => {
          return (
            <Detail 
              key={block.id}
            >
              {`${dayNameList[block.day]}  ${String(block.start_hour).padStart(2, '0')}:${String(block.start_minute).padStart(2, '0')} - ${String(block.end_hour).padStart(2, '0')}:${String(block.end_minute).padStart(2, '0')}`}
              {index < timeblockList.length - 1 ? ', ' : ''}
            </Detail>
          )
        })}
      </Text>

      {location && 
      <Detail style={{ marginTop: 4 }}>
        {location}
      </Detail>}

      <Button 
        style={{marginBottom: 15, marginTop: 15}}
        onPress={handleEdit}
      >
        <EditSvg width={20} height={20} />
      </Button>

      <Button 
        onPress={handleDelete}
      >
        <TrashSvg width={22} height={22} />
      </Button>
    </View>
  )
}

export default TimeTableModal;