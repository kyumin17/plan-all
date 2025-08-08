import { TimeProps } from '../../types/types';
import { useState } from 'react';
import { timeToStr } from '../../utils/time';
import TodoInputForm from './TodoInputForm';

const TimeInput = (
  { time, setTime }:
  { time: TimeProps | null, setTime: React.Dispatch<React.SetStateAction<TimeProps | null>> }
) => {
  return (
    <TodoInputForm
      iconName='clock'
      label={time ? timeToStr(time.hour, time.minute) : null}
      onPress={() => {}}
      isOpen={false}
    />
  );
}

export default TimeInput;