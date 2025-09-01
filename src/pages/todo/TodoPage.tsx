import { useEffect, useState } from 'react';
import TodoItem from '../../components/todo/TodoItem';
import Carousel from '../../components/common/Carousel';
import { DateProps } from '../../types/types';

const TodoPage = () => {
  const [selectDate, setSelectDate] = useState<DateProps>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  });
  
  const [data, setData] = useState<DateProps[]>([selectDate]);

  useEffect(() => {
    const newData = [];
    let date = new Date(selectDate.year, selectDate.month, selectDate.date);
    date.setDate(date.getDate() - 100);

    for (let i = 0; i <= 200; i++) {
      date.setDate(date.getDate() + 1);
      newData.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
      });
    }

    setData(newData);
  }, [selectDate]);

  return (
    <Carousel
      data={data}
      startIndex={Math.floor(data.length / 2)}
      renderItem={TodoItem}
    />
  );
};

export default TodoPage;