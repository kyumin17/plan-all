import styled from 'styled-components/native';
import Header from '../common/Header';

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const CalendarHeader = (
  { year, setYear, month, setMonth }: 
  { year: number, 
    setYear: React.Dispatch<React.SetStateAction<number>>, 
    month: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>
  }
) => {
  const currentYear = new Date().getFullYear();
  return (
    <Header>
      <Title>
        {year !== currentYear ? `${year}년 ` : ''}{month}월
      </Title>
    </Header>
  );
};

export default CalendarHeader;