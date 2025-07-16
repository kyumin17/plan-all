import { useEffect } from 'react';
import styled from 'styled-components/native';
import { Animated, Easing } from 'react-native';
import { useState } from 'react';
import { Style } from '../../../types/types';

const ToggleContainer = styled.TouchableOpacity<Style>`
  width: 36px;
  height: 20px;
  border-radius: 10px;
  justify-content: center;
  background-color: ${props => props.color};
`;

const ToggleWheel = styled(Animated.View)`
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 99px;
`;

const ToggleButton = (
  { isOn, setIsOn }: 
  { 
    isOn: boolean,
    setIsOn: React.Dispatch<React.SetStateAction<boolean>>,
  }
) => {
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 17],
  });

  const color = isOn ? '#13d62d' : '#808080';

  return (
    <ToggleContainer onPress={() => {setIsOn(!isOn)}} color={color}>
      <ToggleWheel
        style={{
          transform: [{translateX}],
        }}
      />
    </ToggleContainer>
  );
};

export default ToggleButton;