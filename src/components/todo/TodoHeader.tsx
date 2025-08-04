import Header from '../common/Header';
import styled from 'styled-components/native';

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
  color: #5D5D5D;
`;

const TodoHeader = (
  { year, month, date }:
  { year: number, month: number, date: number, }
) => {
  return (
    <Header>
      <Title>
        할 일
      </Title>
      <Subtitle>
        {year}년 {month}월 {date}일
      </Subtitle>
    </Header>
  );
}

export default TodoHeader;
