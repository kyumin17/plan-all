import styled from 'styled-components/native';

const Title = styled.Text`
  font-size: 21px;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  margin-top: 30px;
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
    <Title>
      {year !== currentYear ? `${year}년 ` : ''}{month}월
    </Title>
  );
};

export default CalendarHeader;