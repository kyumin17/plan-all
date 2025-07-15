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
  { startDate, endDate }:
  {
    startDate: DateProps,
    endDate: DateProps,
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
            label={`${String(startDate.month).padStart(2, '0')}월 ${String(startDate.date).padStart(2, '0')}일`}
            isOpen={isStartOpen}
            position='left'
          />

          <Arrow  
            width={20} 
            height={20} 
            stroke='#5D5D5D' 
            strokeWidth={2} 
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
        <DatePicker date={new Date()} />
      </PickerWrapper>
    </View>
  );
};

export default DateInput;