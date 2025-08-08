import { View } from 'react-native';
import ArrowRightSvg from '../../../assets/image/arrow-right.svg';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { DateProps } from '../../../types/types';
import InputForm from './InputForm';
import PickerButton from '../button/PickerButton';
import styled from 'styled-components/native';

const Input = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Arrow = styled(ArrowRightSvg)`
  position: absolute;
  left: 50%;
`;

const PickerWrapper = styled.View`
  margin-right: 10%;
`;

const DateInput = (
  { startDate, endDate, setStartDate, setEndDate }:
  {
    startDate: DateProps,
    endDate: DateProps,
    setStartDate: React.Dispatch<React.SetStateAction<DateProps>>,
    setEndDate: React.Dispatch<React.SetStateAction<DateProps>>,
  }
) => {
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const [isEndOpen, setIsEndOpen] = useState<boolean>(false);

  return (
    <View>
      <InputForm
        iconName='calendar'
      >
        <Input>
          <PickerButton
            onPress={() => {
              setIsStartOpen(!isStartOpen); 
              setIsEndOpen(false);
            }}
            label={`${startDate.month}월 ${startDate.date}일`}
            isOpen={isStartOpen}
            position='left'
          />

          <Arrow  
            width={20} 
            height={20} 
            strokeWidth={1} 
          />

          <PickerButton
            onPress={() => {
              setIsEndOpen(!isEndOpen); 
              setIsStartOpen(false);
            }}
            label={`${String(endDate.month).padStart(2, '0')}월 ${String(endDate.date).padStart(2, '0')}일`}
            isOpen={isEndOpen}
            position='right'
          />
        </Input>
      </InputForm>

      {/* date picker */}
      <PickerWrapper style={{ display: !isStartOpen && !isEndOpen ? 'none' : 'flex' }}>
        <DatePicker 
          date={isStartOpen ? new Date(startDate.year, startDate.month, startDate.date) : new Date(endDate.year, endDate.month, endDate.date)} 
          onDateChange={(date) => {
            isStartOpen ? setStartDate({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate()}) : setEndDate({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate()});
          }}
        />
      </PickerWrapper>
    </View>
  );
};

export default DateInput;