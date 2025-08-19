import styled from 'styled-components/native';
import TodoSvg from '../../assets/image/todo.svg';
import { useNavigation } from '@react-navigation/native';

const EmptyState = styled.View`
  margin-top: 50%;
  align-self: center;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Title = styled.Text`
  font-size: 16px;
`;

const Button = styled.Pressable`
  padding: 0 18px;
  height: 32px;
  background-color: #EFEFEF;
  border-radius: 20px;
`;

const ButtonLabel = styled.Text`
  font-size: 15px;
  color: #3B3B3B;
  line-height: 30px;
`;

const TodoEmptyState = () => {
  const navigation = useNavigation<any>();

  return (
    <EmptyState>
      <TodoSvg width={56} height={56} />
      <Title>
        오늘의 할 일이 없습니다.
      </Title>
      <Button>
        <ButtonLabel
          onPress={() => navigation.navigate('TodoCreatePage')}
        >
          할 일 추가하기
        </ButtonLabel>
      </Button>
    </EmptyState>
  );
}

export default TodoEmptyState;