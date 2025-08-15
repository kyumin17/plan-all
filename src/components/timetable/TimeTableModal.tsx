import { Text } from 'react-native';
import { TimeblockDTO, TimetableDTO } from '../../types/types';
import { useDB } from '../common/DBProvider';
import execDB from '../../utils/db/execDB';
import TrashSvg from '../../assets/image/trash.svg';
import WriteSvg from '../../assets/image/write.svg';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Modal from '../common/Modal';

const Body = styled.View`
  padding: 25px 30px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  margin-bottom: 12px;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

const DetailWrapper = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Detail = styled.Text`
  font-size: 15px;
  color: #767676;
`;

const Button = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const TimeTableModal = (
  { timeblockList, table, isOpen, setIsOpen }: 
  { 
    timeblockList: TimeblockDTO[],
    table: TimetableDTO,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  }
) => {
  const navigation = useNavigation<any>();

  const db = useDB();

  const dayNameList: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const name = timeblockList[0].name;
  const location = timeblockList[0].location;
  const description = timeblockList[0].description;

  const handleDelete = async () => {
    if (!db) {
      console.error('Database connection failed');
      return;
    }

    try {
      await execDB({
        db: db,
        query: 'DELETE FROM timetable WHERE name = ? AND table_id = ?',
        params: [name, table.id]
      });
      navigation.replace('TimeTablePage');
    } catch (error) {
      console.error('Error deleting timetable:', error);
    }
  }

  const handleEdit = () => {
    navigation.replace('TimeTablePage');
    navigation.navigate('TimeTableEditPage', { timeblockList: timeblockList });
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      bottom={5}
      minHeight={15}
    >
      <Body>
        <Header>
          <Name>
            {name}
          </Name>

          <ButtonWrapper>
            <Button 
              style={{marginBottom: 15, marginTop: 15}}
              onPress={handleEdit}
            >
              <WriteSvg width={20} height={20} />
            </Button>

            <Button 
              onPress={handleDelete}
            >
              <TrashSvg width={20} height={20} />
            </Button>
          </ButtonWrapper>
        </Header>

        <DetailWrapper>
          <Text>
            {timeblockList && timeblockList.map((block, index) => {
              return (
                <Detail 
                  key={block.id}
                >
                  {`${dayNameList[block.day]}  ${String(block.start_hour).padStart(2, '0')}:${String(block.start_minute).padStart(2, '0')} - ${String(block.end_hour).padStart(2, '0')}:${String(block.end_minute).padStart(2, '0')}`}
                  {index < timeblockList.length - 1 ? ', ' : ''}
                </Detail>
              );
            })}
          </Text>

          {location && <Detail>
            {location}
          </Detail>}

          {description && <Detail>
            {description}
          </Detail>}
        </DetailWrapper>
      </Body>
    </Modal>
  );
}

export default TimeTableModal;