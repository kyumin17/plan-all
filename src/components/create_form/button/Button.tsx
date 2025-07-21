import styled from 'styled-components/native';
import { Style } from '../../../types/types';

const Pressable = styled.Pressable<Style>`
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 5px;
  flex: 1;
  background-color: ${(props) => props.bg_color};
`;

const Label = styled.Text<Style>`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.color};
`;

const Button = (
  { label, handlePress, color }: 
  { 
    label: string,
    handlePress: () => Promise<void>,
    color: 'black' | 'gray',
  }
) => {
  return (
    <Pressable
      bg_color={color === 'black' ? '#3B3B3B' : '#EFEFEF'}
      onPress={handlePress}
    >
      <Label
        color={color === 'black' ? 'white' : '#767676'}
      >
        {label}
      </Label>
    </Pressable>
  );
}

export default Button;