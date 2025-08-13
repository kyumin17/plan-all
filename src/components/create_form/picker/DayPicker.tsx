import CalendarSvg from '../../../assets/image/calendar.svg';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';

const DayPickerWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const DayButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const DayLabel = styled.Text<{ selected: boolean }>`
  width: 30px;
  height: 30px;
  color: #A9A9A9;
  font-size: 16px;
  text-align: center;
  line-height: 27px;
  margin-right: 7px;
  margin-left: 7px;

  ${(props) => props.selected && `
    border-radius: 20px;
    border: 1px solid black;
    color: black;
  `}
`;

const DayPicker = (
  { selectDays, setSelectDays }: 
  { 
    selectDays: number[], 
    setSelectDays: React.Dispatch<React.SetStateAction<number[]>>,
  }
) => {
  const dayList: string[] = ['월', '화', '수', '목', '금', '토', '일'];

  const handleDayButton = (index: number) => {
    if (selectDays.includes(index)) {
      setSelectDays(selectDays.filter((day) => day !== index));
    } else {
      let newArr = [...selectDays, index];
      newArr.sort();
      setSelectDays(newArr);
    }
  };

  return (
    <DayPickerWrapper>
      <CalendarSvg width={19} height={19} strokeWidth={1.2} stroke='black' />

      <DayButtonWrapper>
        {dayList.map((day: string, index: number) => {
          return (
            <Pressable key={day} onPress={() => {handleDayButton(index)}}>
              <DayLabel 
                selected={selectDays.includes(index)}
              >
                {day}
              </DayLabel>
            </Pressable>
          );
        })}
      </DayButtonWrapper>
    </DayPickerWrapper>
  );
};

export default DayPicker;