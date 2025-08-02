import styled from 'styled-components/native';

const HeaderWrapper = styled.View`
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 40px;
  padding-bottom: 30px;
`;

const Header = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <HeaderWrapper>
      {children}
    </HeaderWrapper>
  );
}

export default Header;