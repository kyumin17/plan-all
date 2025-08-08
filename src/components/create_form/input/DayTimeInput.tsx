import TimeInput from '../input/TimeInput';
import { View } from 'react-native';
import { Style, TimeManageProps } from '../../../types/types';
import Gap from '../../common/Gap';
import styled from 'styled-components/native';

const Label = styled.Text<Style>`
  font-size: 16px;
  margin-bottom: 27px;
  font-weight: bold;
`;

const DayTimeInput = ({ day, timeManage }
  : { day: number, timeManage: TimeManageProps }) => {
  const dayList = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <View>
      <Label>
        {`${dayList[day]}요일`}
      </Label>
      <TimeInput timeManage={timeManage} />
      <Gap height={20} />
    </View>
  );
};

export default DayTimeInput;