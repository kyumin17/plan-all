import { Text } from 'react-native';
import Modal from '../common/Modal';
import { useState } from 'react';

const NameModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Text>
        안녕
      </Text>
    </Modal>
  )
}

export default NameModal;