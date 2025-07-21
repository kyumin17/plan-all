import { useNavigation } from '@react-navigation/native';
import PlusSvg from '../../../assets/image/plus.svg';
import styled from 'styled-components/native';

const Pressable = styled.Pressable`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1;
`

const CreateButton = ({ link }: { link : string }) => {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => navigation.navigate(link)}
    >
      <PlusSvg width={60} height={60} />
    </Pressable>
  );
}

export default CreateButton;