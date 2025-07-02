import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TimeblockProps } from '../../types/types';

const TimeTableModal = (
  { timeblock, setTimeblock }:
  { 
    timeblock: TimeblockProps,
    setTimeblock: React.Dispatch<React.SetStateAction<TimeblockProps | null>>
  }
) => {
  return (
    <Pressable 
      style={styles.background}
      onPress={() => setTimeblock(null)}
    >
      <Pressable
        onPress={(e) => e.stopPropagation()} 
        style={[styles.modal, {display: timeblock ? 'flex' : 'none'}]}
      >
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.name}>
            {timeblock.name}
          </Text>
          <Text style={styles.location}>
            {timeblock.location}
          </Text>
        </View>
        <Text>
          
        </Text>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    zIndex: 5,
    position: 'absolute',
  },
  modal: {
    position: 'absolute',
    backgroundColor: 'white',
    right: '50%',
    top: '50%',
    transform: [{ translateX: '50%' }, { translateY: '-50%' }],
    zIndex: 6,
    height: '30%',
    width: '70%',
    borderRadius: 20,
    padding: 25,
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    marginRight: 10,
  },
  location: {
    fontSize: 20,
    fontWeight: 500,
    color: '#ADADAD',
  }
});

export default TimeTableModal;