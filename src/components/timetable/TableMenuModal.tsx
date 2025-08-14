import Modal from '../common/Modal';
import styled from 'styled-components/native';
import { Style, TimetableDTO } from '../../types/types';
import { Alert } from 'react-native';
import execDB from '../../utils/db/execDB';
import { useDB } from '../common/DBProvider';
import TableNameModal from './TableNameModal';
import { useState } from 'react';

const Button = styled.Pressable`
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #EFEFEF;
`;

const Label = styled.Text<Style>`
  font-size: 16px;
  text-align: center;
  color: #767676;
  color: ${(props) => props.color};
`;

const TableMenuModal = (
  { isOpen, setIsOpen, table }: 
  { 
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    table: TimetableDTO
  }
) => {
  const db = useDB();

  const handleAdd = () => {
    setIsOpen(false);
    setIsNameOpen(true);
  };

  const deleteTable = () => {
    if (!db) return;

    execDB({
      db: db,
      query: 'DELETE FROM timetable WHERE table_id = ?',
      params: [table.id]
    });

    execDB({
      db: db,
      query: 'DELETE FROM tablegroup WHERE id = ?',
      params: [table.id]
    });
    
    setIsOpen(false);
  };

  const handleDelete = () => {
    Alert.alert(
      '삭제하기',
      '시간표를 삭제하시겠습니까?',
      [
        { text: '아니요', style: 'cancel' },
        { text: '예', onPress: () => deleteTable },
      ],
      { cancelable: true },
    );
  };

  const [isNameOpen, setIsNameOpen] = useState<boolean>(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        bottom={5}
      > 
        <Button
          onPress={handleAdd}
        >
          <Label color='#4076FF'>
            시간표 추가
          </Label>
        </Button>
        <Button
          onPress={handleDelete}
        >
          <Label color='#F93827'>
            시간표 삭제
          </Label>
        </Button>
        <Button 
          style={{ borderBottomWidth: 0 }}
          onPress={() => setIsOpen(false)}
        >
          <Label color='#767676'>
            취소
          </Label>
        </Button>
      </Modal>

      <TableNameModal 
        isOpen={isNameOpen}
        setIsOpen={setIsNameOpen}
        table={table}
        type='add'
      />
    </>
  );
}

export default TableMenuModal;