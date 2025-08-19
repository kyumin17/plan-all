import { Style, TodoDTO } from '../../types/types';
import styled from 'styled-components/native';
import WriteSvg from '../../assets/image/write.svg';
import XSvg from '../../assets/image/x.svg';
import CheckSvg from '../../assets/image/check.svg';
import ClockSvg from '../../assets/image/clock.svg';
import { Pressable } from 'react-native';
import { useDB } from '../common/DBProvider';
import execDB from '../../utils/db/execDB';
import { colorCode } from '../../styles/color';

const Block = styled.Pressable`
  position: relative;
`;

const Body = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 18px;
`;

const Detail = styled.View`
  margin-left: 32px;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const CheckBox = styled.View<Style & { isDone: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.color};
  margin-right: 14px;

  ${(props) => 
    props.isDone &&
    `
      background-color: ${props.color};
    `
  }
`;

const MenuWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 0;
  gap: 12px;
`;

const Label = styled.Text<{ isDone: boolean }>`
  font-size: 16px;
  line-height: 18px;

  ${(props) => 
    props.isDone &&
    `
      color: #A9A9A9;
      text-decoration: line-through;
    `
  }
`;

const Info = styled.Text<Style>`
  font-size: 14px;
  color: ${(props) => props.color};
  line-height: 16px;
`;

const TodoBlock = (
  { event, setEventList }:
  { event: TodoDTO, setEventList: React.Dispatch<React.SetStateAction<TodoDTO[]>> }
) => {
  const db = useDB();
  const color = colorCode[event.color];

  const handleCheck = () => {
    if (!db) return;

    setEventList((prev) =>
      prev.map((item) => 
        item.id === event.id ? { ...item, is_done: item.is_done === 1 ? 0 : 1 } : item
      )
    );

    execDB({
      db: db,
      query: 'UPDATE todo SET is_done = ? WHERE id = ?',
      params: [event.is_done === 1 ? 0 : 1, event.id],
    }).catch((error) => {
      console.error('Error updating todo:', error);
    });
  }

  const handleDelete = async () => {
    if (!db) return;

    setEventList((prev) => prev.filter((item) => item.id !== event.id));

    execDB({
      db: db,
      query: 'DELETE FROM todo WHERE id = ?',
      params: [event.id],
    }).catch((error) => {
      console.error('Error deleting todo:', error);
    });
  }

  const handleEdit = () => {
    
  }

  return (
    <Block
      onPress={handleCheck}
    >
      <Body>
        <CheckBox
          color={color}
          isDone={event.is_done === 1}
        >
          <CheckSvg color='white' strokeWidth={2} width={16} height={16} style={{ margin: 'auto' }} />
        </CheckBox>

        <Label
          isDone={event.is_done === 1}
        >
          {event.name}
        </Label>

        <MenuWrapper>
          {!event.is_done && 
          <Pressable
            onPress={handleEdit}
          >
            <WriteSvg width={18} height={18} strokeWidth={1} stroke='#767676' />
          </Pressable>}
          <Pressable
            onPress={handleDelete}
          >
            <XSvg width={20} height={20} strokeWidth={1} stroke='#767676' />
          </Pressable>
        </MenuWrapper>
      </Body>
            
      {event.description && !event.is_done && <Detail>
        <Info color='#767676'>
          {event.description}
        </Info>
      </Detail>}

      {(event.year || event.hour) && !event.is_done && <Detail>
        <ClockSvg width={15} height={15} strokeWidth={1.5} stroke={color} />
        <Info color={color}>
          {event.month}.{event.date}
        </Info>
      </Detail>}
    </Block>
  );
}

export default TodoBlock;