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
  justify-content: center;
  align-items: center;
`;

const Body = styled.Pressable<Style>`
  position: absolute;
  z-index: 10;
  background-color: white;
  width: 85%;
  border-radius: 10px;
  padding-top: 25px;
  padding-bottom: 30px;
  padding-right: 30px;
  padding-left: 30px;
  min-height: ${(props) => `${props.min_height}%`};
`;

const Modal = (
  { children, isOpen, setIsOpen, minHeight }: 
  { 
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    minHeight?: number,
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
        >
          {children}
        </Body>
      </Overlay>
    </RNModal>
  );
}

export default Modal;