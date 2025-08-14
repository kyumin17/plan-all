import { Modal as RNModal } from 'react-native';
import styled from 'styled-components/native';
import { Style } from '../../types/types';

const Overlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  align-items: center;
`;

const Body = styled.Pressable<Style>`
  position: absolute;
  z-index: 10;
  background-color: white;
  width: 85%;
  border-radius: 10px;
  min-height: ${(props) => `${props.min_height}%`};
  bottom: ${(props) => `${props.bottom}%`};
`;

const Modal = (
  { children, isOpen, setIsOpen, minHeight, bottom }: 
  { 
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    minHeight?: number,
    bottom: number,
  }
) => {
  return (
    <RNModal
      visible={isOpen}
      transparent
      statusBarTranslucent={true}
    >
      <Overlay
        onPress={() => {setIsOpen(false)}}
      >
        <Body
          onPress={(e) => e.stopPropagation()}
          min_height={minHeight ?? 0}
          bottom={bottom}
        >
          {children}
        </Body>
      </Overlay>
    </RNModal>
  );
}

export default Modal;