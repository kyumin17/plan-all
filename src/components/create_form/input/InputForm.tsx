import { View } from 'react-native';
import styled from 'styled-components/native';
import CalendarSvg from '../../../assets/image/calendar.svg';
import ClockSvg from '../../../assets/image/clock.svg';
import LocationSvg from '../../../assets/image/location.svg';
import WriteSvg from '../../../assets/image/write.svg';
import ColorSvg from '../../../assets/image/color.svg';
import { SvgProps } from 'react-native-svg';

const Form = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.View`
  margin-right: 15px;
`;

const ICON = {
  calendar: CalendarSvg,
  clock: ClockSvg,
  location: LocationSvg,
  write: WriteSvg,
  color: ColorSvg,
}

type IconNameProps = 'calendar' | 'clock' | 'location' | 'write' | 'color';

const InputForm = ({ children, iconName }: { children: React.ReactNode, iconName: IconNameProps }) => {
  const Icon: React.FC<SvgProps> = ICON[iconName];

  return (
    <Form>
      <IconWrapper>
        <Icon 
          width={iconName === 'color' ? 20: 18}
          height={iconName === 'color' ? 20: 18}
          strokeWidth={1.2}
          stroke='black'
        />
      </IconWrapper>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </Form>
  );
}

export default InputForm;