import { Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CancelButton = ({ link }: { link: string }) => {
  const navigation = useNavigation<any>();

  return (
    <Pressable 
      style={styles.cancelButton}
      onPress={() => navigation.navigate(link)} 
    >
      <Text style={{ color: '#767676', textAlign: 'center', fontSize: 16 }}>
        취소하기
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: '#EFEFEF',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 5,
    flex: 1,
  },
});

export default CancelButton;