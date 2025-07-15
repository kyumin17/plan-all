import ToggleButton from '../button/ToggleButton';
import styled from 'styled-components/native';

const Input = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 16px;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  right: 0;
`;

const AllDayInput = (
  { isAllDay, setIsAllDay }:
  { 
    isAllDay: boolean,
    setIsAllDay: React.Dispatch<React.SetStateAction<boolean>>,
  }
) => {
  return (
    <Input>
      <Label>
        하루종일
      </Label>
      <ButtonWrapper>
        <ToggleButton isOn={isAllDay} setIsOn={setIsAllDay} />
      </ButtonWrapper>
    </Input>
  );
}

export default AllDayInput;