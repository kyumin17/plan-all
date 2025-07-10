import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlusSvg from '../../../assets/image/plus.svg';

const CreateButton = ({ link }: { link : string }) => {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate(link)}
    >
      <PlusSvg width={60} height={60} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  }
});

export default CreateButton;