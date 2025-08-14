import { Pressable } from 'react-native';
import Modal from '../common/Modal';
import styled from 'styled-components/native';
import { Style, TimetableDTO } from '../../types/types';
import { useDB } from '../common/DBProvider';
import { useState } from 'react';
import execDB from '../../utils/db/execDB';
import { Alert } from 'react-native';

const Title = styled.Text`
  color: '#767676';
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #D8D8D8;
  font-size: 16px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 20px;
`;

const ButtonLabel = styled.Text<Style>`
  font-size: 15px;
  color: ${(props) => props.color};
  padding: 0px 4px;
`;

const Body = styled.View`
  padding: 25px 30px;
`;

const TableNameModal = (
  { isOpen, setIsOpen, table, type }:
  { 
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    table: TimetableDTO,
    type: 'add' | 'edit'
  }
) => {
  const db = useDB();

  const [name, setName] = useState<string>(type === 'edit' ? table.name: '');

  const handleSave = () => {
    if (!db) return;
    if (name.trim() === '') Alert.alert('이름을 입력해주세요.');

    if (type === 'add') {
      execDB({
        db: db,
        query: 'INSERT INTO tablegroup (name) VALUES (?)',
        params: [name]
      });
    } else {
      execDB({
        db: db,
        query: 'UPDATE tablegroup SET name = ? WHERE id = ?',
        params: [name, table.id],
      });
    }

    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      bottom={50}
    >
      <Body>
        <Title>
          시간표 이름
        </Title>

        <Input
          placeholder='이름을 입력하세요'
          value={name}
          onChangeText={text => setName(text)}
        />

        <ButtonWrapper>
          <Pressable
            onPress={() => setIsOpen(false)}
          >
            <ButtonLabel color='#959595'>
              취소
            </ButtonLabel>
          </Pressable>
          <Pressable
            onPress={handleSave}
          >
            <ButtonLabel color='#1770FF'>
              저장
            </ButtonLabel>
          </Pressable>
        </ButtonWrapper>
      </Body>
    </Modal>
  )
}

export default TableNameModal;