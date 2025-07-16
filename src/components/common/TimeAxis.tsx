import { View } from 'react-native';
import styled from 'styled-components/native';
import { FlexRow } from '../../styles/style';

const TimeLabel = styled.View`
  width: 7%;
`;

const TimeText = styled.Text<{ gap: number }>`
  height: ${(props) => `${props.gap}px`};
  box-sizing: border-box;
  border-top-width: 1px;
  border-top-color: #EFEFEF;
  text-align: right;
  padding-right: 6px;
  padding-top: 3px;
  color: #767676;
`;

const TimeRow = styled.View<{ gap: number }>`
  height: ${(props) => `${props.gap}px`};
  border-top-width: 1px;
  border-top-color: #EFEFEF;
  flex: 1;
`;

const TimeAxis = ({ startTime, endTime, gap }: { startTime: number, endTime: number, gap: number }) => {
  const timeList: number[] = Array.from({ length: endTime - startTime }, (_, i) => (i + startTime));

  return (
    <FlexRow>
      <TimeLabel>
        {timeList.map((time: number) => (
          <TimeText key={time} gap={gap}>
            {time}
          </TimeText>
        ))}
      </TimeLabel>
      
      <View style={{flex: 1}}>
        {timeList.map((time: number) => (
          <TimeRow key={time} gap={gap}>
          </TimeRow>
        ))}
      </View>
    </FlexRow>
  );
}

export default TimeAxis;