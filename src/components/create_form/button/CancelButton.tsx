import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const CancelButton = () => {
  const navigation = useNavigation<any>();

  const cancel = async () => {
    Alert.alert(
      '취소하기',
      '작성 중인 내용이 모두 날아갑니다. 정말 취소하시겠습니까?',
      [
        { text: '아니요', style: 'cancel' },
        { text: '예', onPress: () => navigation.pop() },
      ],
      { cancelable: true },
    );
  }

  return (
    <Button
      label='취소하기'
      handlePress={cancel}
      color='gray'
    />
  );
}

export default CancelButton;