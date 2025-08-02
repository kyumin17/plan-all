import Header from '../common/Header';
import styled from 'styled-components/native';
import WriteSvg from '../../assets/image/write.svg';
import MenuSvg from '../../assets/image/menu.svg';
import { FlexRow } from '../../styles/style';

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-right: 8px;
`;

const Menu = styled(MenuSvg)`
  position: absolute;
  right: 0;
`;

const TimeTableHeader = () => {
  return (
    <Header>
      <FlexRow style={{ alignItems: 'center' }}>
        <Title>
          시간표
        </Title>
        <WriteSvg width={22} height={22} style={{ marginTop: 8 }} />
        <Menu width={22} height={22} style={{ marginTop: 8 }} />
      </FlexRow>
    </Header>
  );
}

export default TimeTableHeader;