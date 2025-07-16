import { TextInput } from 'react-native';
import InputForm from './InputForm';

const DescriptionInput = ({ description, setDescription }: { description: string, setDescription: any}) => {
  return (
    <InputForm
      iconName='write'
    >
      <TextInput
        style={{ fontSize: 16, marginLeft: 6 }}
        value={description}
        onChangeText={text => setDescription(text)}
        placeholder='설명' 
      />
    </InputForm>
  );
}

export default DescriptionInput;