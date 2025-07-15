import styled from 'styled-components/native';

const Button = styled.Pressable<{ isOpen: boolean, position: 'left' | 'right' }>`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 5px;
  position: absolute;
  
  ${(props) => props.position === 'left' ? 
    { left: 0 }: { right: 0 }
  }

  ${(props) => props.isOpen &&
    {
      backgroundColor: '#E8E8E8',
      borderRadius: 20,
    }
  }
`;

const Label = styled.Text`
  font-size: 16px;
`;

const PickerButton = (
  { label, onPress, isOpen, position }: 
  { label: string, onPress: () => void, isOpen: boolean, position: 'left' | 'right' }
) => {
  return (
    <Button
      position={position}
      isOpen={isOpen}
      onPress={onPress}
    >
      <Label>
        {label}
      </Label>
    </Button>
  );
}

export default PickerButton;