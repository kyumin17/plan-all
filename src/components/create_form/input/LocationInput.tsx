import { TextInput } from 'react-native';
import InputForm from './InputForm';

const LocationInput = ({ location, setLocation }: { location: string, setLocation: any}) => {
  return (
    <InputForm 
      iconName='location'
    >
      <TextInput
        style={{ fontSize: 16 }}
        value={location}
        onChangeText={text => setLocation(text)}
        placeholder='장소' 
      />
    </InputForm>
  );
}

export default LocationInput;