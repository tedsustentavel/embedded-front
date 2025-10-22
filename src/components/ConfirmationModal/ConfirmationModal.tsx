import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  confirmation?: any;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  confirmation,
  loading,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Tem certeza que deseja salvar essas configurações
        </ModalHeader>
        <ModalCloseButton />

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={confirmation}
            isLoading={loading}
          >
            Sim
          </Button>
          <Button
            colorScheme="red"
            mr={3}
            onClick={onClose}
            isDisabled={loading}
          >
            Não
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
