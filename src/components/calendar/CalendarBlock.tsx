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
  flex: 1;
  font-size: 11px;
  padding-left: 6px;
  padding-right: 6px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bg_color};
  padding-bottom: 2px;
`;

const CalendarBlock = ({ event, date }: { event: CalendarProps, date: number | null }) => {
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
        {event.start_date === date ? event.name : ''}
      </Name>
    </Block>
  );
}

export default CalendarBlock;