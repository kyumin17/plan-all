import LocationSvg from '../../assets/image/location.svg';
import { View, TextInput, StyleSheet } from 'react-native';

const LocationInput = ({ location, setLocation }: { location: string, setLocation: React.Dispatch<React.SetStateAction<string>>}) => {
  return (
    <View style={styles.location}>
      <LocationSvg width={18} height={18} stroke='#5D5D5D' strokeWidth={2} />
      <TextInput
        style={styles.locationInput}
        value={location}
        onChangeText={text => setLocation(text)}
        placeholder='장소' 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  location: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  locationInput: {
    fontSize: 16,
  }
});

export default LocationInput;