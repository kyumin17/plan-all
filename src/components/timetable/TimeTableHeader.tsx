import Header from '../common/Header';
import styled from 'styled-components/native';
import WriteSvg from '../../assets/image/write.svg';
import MenuSvg from '../../assets/image/menu.svg';
import { FlexRow } from '../../styles/style';
import { Pressable } from 'react-native';
import { useState } from 'react';
import TableNameModal from './TableNameModal';
import { TimetableDTO } from '../../types/types';
import TableMenuModal from './TableMenuModal';

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-right: 8px;
`;

const MenuButton = styled.Pressable`
  position: absolute;
  right: 0;
`;

const TimeTableHeader = ({ table }: { table: TimetableDTO }) => {
  const [isNameOpen, setIsNameOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Header>
      <FlexRow style={{ alignItems: 'center' }}>
        <Title>
          {table.name}
        </Title>

        <Pressable
          onPress={() => setIsNameOpen(true)}
        >
          <WriteSvg width={22} height={22} strokeWidth={1} style={{ marginTop: 8 }} />
        </Pressable>

        <MenuButton
          onPress={() => setIsMenuOpen(true)}
        >
          <MenuSvg width={22} height={22} style={{ marginTop: 8 }} />
        </MenuButton>
      </FlexRow>

      <TableNameModal 
        isOpen={isNameOpen} 
        setIsOpen={setIsNameOpen} 
        table={table}
        type='edit'
      />

      <TableMenuModal 
        isOpen={isMenuOpen} 
        setIsOpen={setIsMenuOpen}
        table={table}
      />
    </Header>
  );
}

export default TimeTableHeader;