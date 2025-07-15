import styled from 'styled-components/native';
import { Style } from '../../types/types';

const Wrapper = styled.View<Style>`
  width: 100%;
  height: ${(props) => props.height};
`;

const Gap = ({ height }: { height: number }) => {
  return (
    <Wrapper
      height={height}
    >
    </Wrapper>
  )
}

export default Gap;