import { Pressable } from 'react-native';
import Modal from '../common/Modal';
import styled from 'styled-components/native';
import { Style } from '../../types/types';

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
  gap: 28px;
`;

const ButtonLabel = styled.Text<Style>`
  font-size: 16px;
  color: ${(props) => props.color};
`;

const NameModal = (
  { isOpen, setIsOpen }:
  { 
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>> 
  }
) => {
  const handleSave = () => {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Title>
        시간표 이름
      </Title>

      <Input
        placeholder='이름을 입력하세요'
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
    </Modal>
  )
}

export default NameModal;