import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';

const Title = styled.Text`
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
  margin-top: 30px;
`;

const Subtitle = styled.Text`
  text-align: center;
  margin-bottom: 25px;
  color: #5D5D5D;
`;

const ScheduleHeader = (
  { year, month, date }: 
  { 
    year: number; 
    month: number; 
    date: number;
  }
) => {
  return (
    <View>
      <Title>
        일정
      </Title>
      <Pressable>
        <Subtitle>
          {year}년 {month}월 {date}일
        </Subtitle>
      </Pressable>
    </View>
  )
}

export default ScheduleHeader;