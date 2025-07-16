import { Style } from '../../../types/types';
import ToggleButton from '../button/ToggleButton';
import styled from 'styled-components/native';

const Input = styled.View<Style>`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  padding-left: 10px;
  margin-left: ${(props) => `${props.left}px`};
`;

const Label = styled.Text<Style>`
  font-size: 16px;
  color: ${(props) => props.color};
`;

const ButtonWrapper = styled.View<Style>`
  position: absolute;
  right: ${(props) => `${props.right}%`};
  margin-top: 10px;
`;

const AllDayInput = (
  { isAllDay, setIsAllDay, left }:
  { 
    isAllDay: boolean,
    setIsAllDay: React.Dispatch<React.SetStateAction<boolean>>,
    left?: number
  }
) => {
  return (
    <Input left={left ?? 0}>
      <Label color={isAllDay ? 'black' : '#808080'}>
        하루종일
      </Label>
      <ButtonWrapper right={left ? 10 : 0}>
        <ToggleButton isOn={isAllDay} setIsOn={setIsAllDay} />
      </ButtonWrapper>
    </Input>
  );
}

export default AllDayInput;