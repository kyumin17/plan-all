import { TimeblockDTO } from '../../types/types';
import styled from 'styled-components/native';
import { Style } from '../../types/types';
import { colorCode } from '../../styles/color';

const Block = styled.Pressable<Style>`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  border-radius: 2px;
  z-index: 1;
  padding-top: 3px;
  padding-left: 6px;
  padding-right: 6px;
  border: 0.5px solid white;
  height: ${(props) => `${props.height}px`};
  top: ${(props) => `${props.top}px`};
  background-color: ${(props) => props.bg_color};
`;

const Name = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 13px;
`;

const Detail = styled.Text`
  font-size: 12px;
  color: white;
`;

const TimeTableBlock = (
  { event, startTime, openModal, gap }: 
  { 
    event: TimeblockDTO,
    startTime: number,
    openModal: (name: string) => void,
    gap: number,
  }
) => {
  const startSum = 60 * event.start_hour + event.start_minute;
  const endSum = 60 * event.end_hour + event.end_minute;
  const height = gap * (endSum - startSum) / 60;
  const top = gap * (startSum - startTime * 60) / 60;

  return (
    <Block 
      bg_color={colorCode[event.color]}
      height={height}
      top={top}
      onPress={() => {openModal(event.name)}}
    >
      <Name>
        {event.name}
      </Name>
      <Detail>
        {event.location}
      </Detail>
    </Block>
  );
}

export default TimeTableBlock;