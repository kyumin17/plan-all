import { CalendarProps } from '../../types/types';
import styled from 'styled-components/native';
import { Style } from '../../types/types';

const Block = styled.View`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
`;

const Marker = styled.View<Style>`
  width: 3px;
  background-color: ${(props) => props.bg_color};
`;

const Name = styled.Text<Style>`
  font-size: 10px;
  padding-left: 6px;
  padding-right: 6px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bg_color};
`;

const CalendarBlock = ({ event }: { event: CalendarProps }) => {
  return (
    <Block>
      <Marker
        bg_color={event.all_day ? `${event.color}25` : event.color}
      >
      </Marker>
      <Name 
        color={event.color}
        bg_color={event.all_day ? `${event.color}25` : 'white'}
        numberOfLines={1}
      >
        {event.name}
      </Name>
    </Block>
  );
}

export default CalendarBlock;