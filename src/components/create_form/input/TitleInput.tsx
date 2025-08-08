import styled from 'styled-components/native';

const NameInput = styled.TextInput`
  font-size: 18px;
  margin-left: 9%;
  margin-right: 9%;
  border-bottom-width: 1px;
  border-bottom-color: #767676;
  padding-right: 6px;
  padding-left: 6px;
  margin-bottom: 36px;
`;

const TitleInput = (
  { name, setName }: 
  { 
    name: string, 
    setName: React.Dispatch<React.SetStateAction<string>>,
  }
) => {
  return (
    <NameInput
      value={name}
      onChangeText={text => setName(text)}
      placeholder='제목' 
      placeholderTextColor='#AAAAAA'
    />
  );
};

export default TitleInput;