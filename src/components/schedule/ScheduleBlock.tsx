import { ScheduleDTO } from '../../types/types';
import styled from 'styled-components/native';
import { Style } from '../../types/types';
import { colorCode } from '../../styles/color';

const Block = styled.View<Style>`
  position: ${(props) => props.position};
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  z-index: 2;
  padding: 12px 16px;
  border: 0.5px solid white;
  height: ${(props) => `${props.height}px`};
  top: ${(props) => `${props.top}px`};
  background-color: ${(props) => props.bg_color};
`;

const Name = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 15px;
`;

const Detail = styled.Text`
  color: white;
  font-size: 13px;
`;

const ScheduleBlock = (
  { event, height, top, time }:
  { 
    event: ScheduleDTO,
    height?: number,
    top?: number,
    time: string
  }
) => {
  return (
    <Block 
      bg_color={colorCode[event.color]}
      height={height}
      top={top}
      position={event.all_day ? 'static' : 'absolute'}
    >
        <Name>
          {event.name}
        </Name>
        <Detail>
          {time}
        </Detail>
        {!event.all_day && <Detail>
          {event.location}
        </Detail>}
        {!event.all_day && <Detail>
          {event.description}
        </Detail>}
    </Block>
  );
}

export default ScheduleBlock;