import { useDB } from '../common/DBProvider';
import { TodoDTO } from '../../types/types';
import { useState } from 'react';
import TodoBlock from './TodoBlock';
import styled from 'styled-components/native';
import { useEffect } from 'react';
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

  const [eventList, setEventList] = useState<TodoDTO[]>([]);

  useEffect(() => {
    selectDB({
      db: db,
      tableName: 'todo',
      filter: {
        orderFilter: ['year', 'month', 'date', 'hour', 'minute'],
      },
    }).then((res) => {
      if (res) setEventList(res);
    });
  }, [db]);

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