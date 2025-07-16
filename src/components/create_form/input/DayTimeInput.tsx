import TimeInput from '../input/TimeInput';
import { View, Text, StyleSheet } from 'react-native';
import { TimeManageProps } from '../../../types/types';
import Gap from '../../common/Gap';

const DayTimeInput = ({ day, timeManage }
  : { day: number, timeManage: TimeManageProps }) => {
  const dayList = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <View>
      <Text style={styles.header}>
        {`${dayList[day]}요일`}
      </Text>
      <TimeInput timeManage={timeManage} />
      <Gap height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    paddingBottom: 15,
    marginBottom: 25,
  },
});

export default DayTimeInput;