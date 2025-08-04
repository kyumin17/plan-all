import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Header from '../common/Header';

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
  color: #5D5D5D;
`;

const ScheduleHeader = (
  { year, month, date }: 
  { 
    year: number, 
    month: number, 
    date: number,
  }
) => {
  return (
    <Header>
      <Title>
        일정
      </Title>
      <Pressable>
        <Subtitle>
          {year}년 {month}월 {date}일
        </Subtitle>
      </Pressable>
    </Header>
  )
}

export default ScheduleHeader;