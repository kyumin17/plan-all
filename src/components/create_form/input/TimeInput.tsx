import { View } from 'react-native';
import ArrowRightSvg from '../../../assets/image/arrow-right.svg';
import { timeToStr } from '../../../utils/time';
import { TimeManageProps } from '../../../types/types';
import TimePicker from '../picker/TimePicker';
import { useState } from 'react';
import InputForm from './InputForm';
import PickerButton from '../button/PickerButton';
import styled from 'styled-components/native';
import AllDayInput from './AllDayInput';
import Gap from '../../common/Gap';

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
  margin-left: 10%;
`;

const TimeInput = (
  { timeManage, isAllDay, setIsAllDay }: 
  { 
    timeManage: TimeManageProps,
    isAllDay?: boolean,
    setIsAllDay?: React.Dispatch<React.SetStateAction<boolean>>,
  }
) => {
  const { startHour, startMinute, endHour, endMinute, setStartHour, setStartMinute, setEndHour, setEndMinute } = timeManage;
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const [isEndOpen, setIsEndOpen] = useState<boolean>(false);

  return (
    <View>
      <InputForm
        iconName='clock'
      >
        {!isAllDay && <Input>
          <PickerButton
            label={timeToStr(startHour, startMinute)}
            onPress={() => {
              setIsStartOpen(!isStartOpen);
              setIsEndOpen(false);
            }}
            isOpen={isStartOpen}
            position='left'
          />

          <Arrow 
            width={20} 
            height={20} 
            strokeWidth={1} 
          />

          <PickerButton
            label={timeToStr(endHour, endMinute)}
            onPress={() => {
              setIsEndOpen(!isEndOpen);
              setIsStartOpen(false);
            }}
            isOpen={isEndOpen}
            position='right'
          />
        </Input>}
        
        {isAllDay !== undefined && setIsAllDay !== undefined && isAllDay &&
          <AllDayInput 
            isAllDay={isAllDay}
            setIsAllDay={setIsAllDay}
          />
        }
      </InputForm>

      {/* time picker */}
      <PickerWrapper style={{ display: !isStartOpen && !isEndOpen ? 'none' : 'flex' }}>
        <TimePicker 
          hour={isStartOpen ? startHour : endHour} 
          minute={isStartOpen ? startMinute : endMinute}
          setHour={isStartOpen ? setStartHour : setEndHour}
          setMinute={isStartOpen ? setStartMinute : setEndMinute}
        />
      </PickerWrapper>

      {isAllDay !== undefined && setIsAllDay !== undefined && !isAllDay &&
        <View>
          <Gap height={20} />
          <AllDayInput 
            isAllDay={isAllDay}
            setIsAllDay={setIsAllDay}
            left={17}
          />
        </View>
      }
    </View>
  );
}

export default TimeInput;