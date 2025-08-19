import styled from 'styled-components/native';
import TitleInput from '../../components/create_form/input/TitleInput';
import { useState } from 'react';
import { getRandomColor } from '../../utils/random';
import DescriptionInput from '../../components/create_form/input/DescriptionInput';
import { TimeProps, DateProps } from '../../types/types';
import DateInput from '../../components/todo/DateInput';
import TimeInput from '../../components/todo/TimeInput';
import ColorInput from '../../components/create_form/input/ColorInput';
import Gap from '../../components/common/Gap';
import Button from '../../components/create_form/button/Button';
import CancelButton from '../../components/create_form/button/CancelButton';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useDB } from '../../components/common/DBProvider';
import execDB from '../../utils/db/execDB';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Page = styled.View`
  margin-top: 10%;
  height: 100%;
`;

const Content = styled.View`
  margin-left: 10%;
  margin-right: 10%;
`;

const ButtonWrapper = styled.View`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  gap: 10px;
  padding-left: 5%;
  padding-right: 5%;
`;

const TodoCreatePage = () => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>(getRandomColor());

  const [date, setDate] = useState<DateProps | null>({ year: new Date().getFullYear() ,month: new Date().getMonth() + 1, date: new Date().getDate() });
  const [time, setTime] = useState<TimeProps | null>({ hour: 12, minute: 0 });
  const [description, setDescription] = useState<string>('');

  const navigation = useNavigation<any>();

  const db = useDB();

  const validateInputs = () => {
    if (name.trim() === '') {
      Alert.alert('오류', '시간표 이름을 입력해주세요.');
      return false;
    }

    return true;
  }

  const save = async () => {
    if (!validateInputs()) return;

    if (!db) {
      console.error('Database connection failed');
      return;
    }

    const params = [name, color, date?.year, date?.month, date?.date, time?.hour, time?.minute, description, 0];

    try {
      await execDB({
        db: db,
        query: `INSERT INTO todo (name, color, year, month, date, hour, minute, description, is_done) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        params: params
      });
    } catch (error) {
      console.error('Error inserting data:', error);
      return;
    }

    navigation.navigate('TodoPage');
  };

  return (
    <Page>
      <TitleInput 
        name={name} 
        setName={setName} 
      />

      <Content>
        <DateInput 
          date={date}
          setDate={setDate}
        />

        <Gap height={30} />

        <TimeInput 
          time={time} 
          setTime={setTime}
        />

        <Gap height={20} />

        <DescriptionInput
          description={description}
          setDescription={setDescription} 
        />

        <Gap height={20} />

        <ColorInput
          color={color}
          setColor={setColor}
        />
      </Content>

      <ButtonWrapper style={{ marginBottom: useBottomTabBarHeight() - 12 }}> 
        <CancelButton />
        <Button
          label='저장하기'
          color='black'
          handlePress={save}
        />
      </ButtonWrapper>
    </Page>
  );
};

export default TodoCreatePage;