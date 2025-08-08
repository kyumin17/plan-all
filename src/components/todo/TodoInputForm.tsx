import InputForm from '../create_form/input/InputForm';
import styled from 'styled-components/native';
import PickerButton from '../create_form/button/PickerButton';
import ToggleButton from '../create_form/button/ToggleButton';
import { useState } from 'react';

const Input = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const NoDateText = styled.Text`
  color: #606060;
  font-size: 16px;
  margin-left: 9px;
`;

const ToggleWrapper = styled.View`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  height: 18px;
`;

const ToggleLabel = styled.Text`
  font-size: 15px;
  color: #8a8a8a;
  line-height: 18px;
`;

const TodoInputForm = (
  { iconName, label, onPress, isOpen }:
  { 
    iconName: 'clock' | 'calendar',
    label: string | null,
    onPress: () => void,
    isOpen: boolean,
  }
) => {
  const [isOn, setIsOn] = useState<boolean>(false);

  return (
    <InputForm
      iconName={iconName}
    >
      <Input>
        {label ? <PickerButton
          label={label}
          onPress={onPress}
          isOpen={isOpen}
          position='left'
        />:
        <NoDateText>
          없음
        </NoDateText>
        }

        <ToggleWrapper>
          <ToggleLabel>
            미설정
          </ToggleLabel>
          <ToggleButton
            isOn={isOn}
            setIsOn={setIsOn}
          />
        </ToggleWrapper>
      </Input>
    </InputForm>
  )
}

export default TodoInputForm;