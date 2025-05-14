import { Text, Pressable, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import useDB from '../../hooks/useDB';

const SaveButton = ({ save }: { save: () => Promise<void> }) => {
  return (
    <Pressable 
      style={[styles.saveButton, { marginBottom: useBottomTabBarHeight() }]}
      onPress={save} 
    >
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
        저장하기
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#3B3B3B',
    marginRight: '4%',
    marginLeft: '4%',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 5,
    width: '92%',
    position: 'absolute',
    bottom: -20,
  },
});

export default SaveButton;