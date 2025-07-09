import { Text, Pressable, StyleSheet } from 'react-native';

const EditButton = ({ edit }: { edit: () => Promise<void> }) => {
  return (
    <Pressable 
      style={[styles.editButton]}
      onPress={edit} 
    >
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
        수정하기
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: '#3B3B3B',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 5,
    flex: 1,
  },
});

export default EditButton;