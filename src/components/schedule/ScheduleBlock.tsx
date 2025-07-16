import { ScheduleDTO } from '../../types/types';
import { timeRangeToStr } from '../../utils/time';
import styled from 'styled-components/native';
import { Style } from '../../types/types';

const Block = styled.View<Style>`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  z-index: 1;
  padding-top: 12px;
  padding-left: 16px;
  padding-right: 16px;
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
  { event, startTime, gap }:
  { 
    event: ScheduleDTO,
    startTime: number,
    gap: number,
  }
) => {
  if (event.all_day) {
    return <></>;
  }

  const startSum = 60 * event.start_hour + event.start_minute;
  const endSum = 60 * event.end_hour + event.end_minute;

  const height = gap * (endSum - startSum) / 60;
  const top = gap * (startSum - startTime * 60) / 60;

  return (
    <Block 
      bg_color={event.color}
      height={height}
      top={top}
    >
        <Name>
          {event.name}
        </Name>
        <Detail>
          {timeRangeToStr(event.start_hour, event.start_minute, event.end_hour, event.end_minute)}
        </Detail>
        <Detail>
          {event.location}
        </Detail>
    </Block>
  );
}

export default ScheduleBlock;