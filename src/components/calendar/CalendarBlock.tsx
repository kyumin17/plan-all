import { CalendarDTO } from '../../types/types';
import styled from 'styled-components/native';
import { Style } from '../../types/types';
import { colorCode } from '../../styles/color';

const Block = styled.View`
  width: 101%;
  margin-bottom: 2px;
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

const CalendarBlock = ({ event, date }: { event: CalendarDTO, date: number | null }) => {
  const color = colorCode[event.color];

  return (
    <Block>
      <Marker
        bg_color={color}
      >
      </Marker>
      <Name 
        color={event.all_day ? 'white' : color}
        bg_color={event.all_day ? color : 'white'}
        numberOfLines={1}
      >
        {event.start_date === date ? event.name : ''}
      </Name>
    </Block>
  );
}

export default CalendarBlock;