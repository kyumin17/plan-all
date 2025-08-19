import { DateProps } from '../../types/types';
import TodoInputForm from './TodoInputForm';

const DateInput = (
  { date, setDate }:
  { date: DateProps | null, setDate: React.Dispatch<React.SetStateAction<DateProps | null>> }
) => {
  return (
    <TodoInputForm
      iconName='calendar'
      label={date ? `${date.month}월 ${date.date}일` : ''}
    >
      <></>
    </TodoInputForm>
  );
}

export default DateInput;