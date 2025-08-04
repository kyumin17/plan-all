import { useDB } from '../common/DBProvider';
import { TodoDTO } from '../../types/types';
import { useEffect, useState } from 'react';
import TodoBlock from './TodoBlock';
import styled from 'styled-components/native';
import selectDB from '../../utils/db/selectDB';

const Page = styled.View`
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TodoBody = () => {
  const db = useDB();

  const [eventList, setEventList] = useState<TodoDTO[]>([
    {
      id: 1,
      name: '할 일 1',
      description: '할 일 1의 설명',
      year: null,
      month: null,
      date: null,
      hour: null,
      minute: null,
      color: '#FF0000',
      is_done: 0,
    },
    {
      id: 2,
      name: '할 일 2',
      description: '할 일 2의 설명',
      year: 2024,
      month: 11,
      date: 10,
      hour: null,
      minute: null,
      color: '#FF0000',
      is_done: 1,
    } // sample
  ]);

  // useEffect(() => {
  //   selectDB({
  //     db: db,
  //     tableName: 'todo',
  //     filter: {
  //       orderFilter: ['year', 'month', 'date', 'hour', 'minute'],
  //     },
  //   }).then((res) => {
  //     if (res) setEventList(res);
  //   });
  // }, [db]);

  return (
    <Page>
      {eventList.map((event) => (
        <TodoBlock
          key={event.id}
          event={event}
          setEventList={setEventList}
        />
      ))}
    </Page>
  );
}

export default TodoBody;