import InputForm from './InputForm';
import colors from '../../../styles/color';
import styled from 'styled-components/native';
import CheckSvg from '../../../assets/image/check.svg';

const ColorWrapper = styled.View`
  flex-direction: row;
  gap: 20px;
  margin-left: 10px;
`;

const ColorButton = styled.Pressable<{ color: string, isSelected: boolean }>`
  height: 22px;
  width: 22px;
  background-color: ${(props) => props.color};
  border-radius: 30px;
  align-items: center;
  justify-content: center;

  ${(props) => props.isSelected && `
    border: 2px solid ${props.color};
    background-color: white;
  `}
`;

const ColorInput = (
  { color, setColor }:
  {
    color: string,
    setColor: React.Dispatch<React.SetStateAction<string>>,
  }
) => {
  return (
    <InputForm
      iconName='color'
    >
      <ColorWrapper>
        {colors.map((c) => (
          <ColorButton
            key={c}
            color={c}
            isSelected={c === color}
            onPress={() => setColor(c)}
          >
            {c === color && <CheckSvg width={15} height={15} stroke={c} strokeWidth={2.5} />}
          </ColorButton>
        ))}
      </ColorWrapper>
    </InputForm>
  )
}

export default ColorInput;