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
  { iconName, label, children }:
  { 
    iconName: 'clock' | 'calendar',
    label: string,
    children: React.ReactNode,
  }
) => {
  const [isInputOn, setIsInputOn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <InputForm
      iconName={iconName}
    >
      <Input>
        {!isInputOn ? <PickerButton
          label={label}
          onPress={() => {setIsModalOpen(!isModalOpen)}}
          isOpen={isModalOpen}
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
            isOn={isInputOn}
            setIsOn={setIsInputOn}
          />
        </ToggleWrapper>
      </Input>

      {isModalOpen && children}
    </InputForm>
  )
}

export default TodoInputForm;