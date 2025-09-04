import { CalendarDTO } from '../../types/types';
import styled from 'styled-components/native';
import { Style } from '../../types/types';
import { colorCode } from '../../styles/color';

const Block = styled.View<{ width: number, top: number }>`
  margin-bottom: 2px;
  display: flex;
  flex-direction: row;
  width: ${(props) => (props.width * 100)}%;
  position: absolute;
  top: ${(props) => (props.top * 18)}px;
`;

const Marker = styled.View<Style>`
  width: 3px;
  background-color: ${(props) => props.bg_color};
`;

const Name = styled.Text<Style>`
  margin-left: 1px;
  margin-right: 1px;
  border-radius: 2px;
  height: 16px;
  flex: 1;
  font-size: 10px;
  padding-left: 9px;
  padding-right: 9px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bg_color};
  text-align: ${(props) => props.align};
  padding-bottom: 2px;
`;

const CalendarBlock = (
  { event, width, top }: 
  { 
    event: CalendarDTO, 
    width: number,
    top: number,
  }
) => {
  const color = colorCode[event.color];
  const duration = new Date(event.end_year, event.end_month - 1, event.end_date).getTime() - new Date(event.start_year, event.start_month - 1, event.start_date).getTime();
  const type = (event.all_day || duration !== 0) ? 'all-day' : 'time';

  return (
    <Block
      width={width}
      top={top}
    >
      {type !== 'all-day' && <Marker
        bg_color={color}
      >
      </Marker>}
      <Name 
        color={type === 'all-day' ? 'white' : color}
        bg_color={type === 'all-day' ? color : 'transparent'}
        align={duration !== 0 ? 'center' : 'left'}
        numberOfLines={1}
      >
        {event.name}
      </Name>
    </Block>
  );
}

export default CalendarBlock;