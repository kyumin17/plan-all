import styled from 'styled-components/native';
import { CalendarOverflowInfo } from '../../types/types';

const Block = styled.View<{ top: number }>`
  margin-bottom: 2px;
  display: flex;
  flex-direction: row;
  width: 100%;
  position: absolute;
  top: ${(props) => (props.top * 18)}px;
`;

const Name = styled.Text`
  margin-left: 1px;
  margin-right: 1px;
  height: 16px;
  flex: 1;
  font-size: 10px;
  padding-left: 6px;
  padding-right: 9px;
  padding-bottom: 2px;
  color: #3b3b3b;
  background-color: #f5f5f5;
`;

const CalendarOverflowBlock = ({ overflow }: { overflow: CalendarOverflowInfo }) => {
  return (
    <Block top={overflow.top}>
      <Name>
        + {overflow.eventNum}
      </Name>
    </Block>
  );
}

export default CalendarOverflowBlock;