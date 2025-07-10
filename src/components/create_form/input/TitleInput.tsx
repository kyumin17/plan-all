import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import colors from '../../../styles/color';

const TitleInput = ({ name, setName, color, setColor }
  : { name: string, setName: React.Dispatch<React.SetStateAction<string>>, color: string, setColor: React.Dispatch<React.SetStateAction<string>> }
) => {
  const [isColorOpen, setIsColorOpen] = useState<boolean>(false);

  return (
    <View style={styles.header}>
      <TextInput
        style={styles.name}
        value={name}
        onChangeText={text => setName(text)}
        placeholder='제목' 
        placeholderTextColor='#AAAAAA'
      />
      <Pressable 
        key={color} 
        style={[styles.selectColor, { backgroundColor: color }]} 
        onPress={() => {setIsColorOpen(!isColorOpen)}}
      />
      <View style={[styles.colorWrapper, { display: isColorOpen ? 'flex' : 'none' }]}>
        {colors.map((c: string) => {
          return (
            <Pressable 
              key={c} 
              style={[c === color ? [styles.selectedColorButton, {outlineColor: c}]: styles.colorButton, { backgroundColor: c }]} 
              onPress={() => {
                setColor(c);
                setIsColorOpen(false);
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    backgroundColor: '#F8F8F8',
    marginRight: '5%',
    marginLeft: '5%',
    marginBottom: 30,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    width: '85%',
    fontSize: 18,
  },
  colorWrapper: {
    flexDirection: 'row',
    gap: 15,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 50,
    position: 'absolute',
    top: 60,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    elevation: 4,
  },
  colorButton: {
    width: 23,
    height: 23,
    borderRadius: 30,
  },
  selectedColorButton: {
    width: 23,
    height: 23,
    borderRadius: 30,
    outlineWidth: 1.5,
    outlineOffset: 1.5,
  },
  selectColor: {
    width: 18,
    height: 18,
    borderRadius: 10,
  }
});

export default TitleInput;