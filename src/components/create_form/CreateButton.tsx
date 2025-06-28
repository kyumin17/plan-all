import { Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateButton = ({ link }: { link : string }) => {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate(link)}
    >
      <Image
        style={styles.img}
        source={require('../../assets/image/plus.png')}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  img: {
    height: 60,
    width: 60,
  }
});

export default CreateButton;