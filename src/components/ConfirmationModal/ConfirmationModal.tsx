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
  // Mantemos a interface existente (isOpen/onClose/confirmation) e permitimos props legadas
  isOpen?: boolean;
  loading?: boolean;
  onClose?: () => void;
  confirmation?: any;
  // legacy aliases
  opened?: boolean;
  close?: () => void;
  confirmationLegacy?: any;
}

export function ConfirmationModal(props: ConfirmationModalProps) {
  const isOpen = props.isOpen ?? props.opened ?? false;
  const onClose = props.onClose ?? props.close ?? (() => {});
  const confirmation = props.confirmation ?? props.confirmationLegacy ?? (() => {});
  const loading = props.loading ?? false;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Tem certeza que deseja salvar essas configurações
        </ModalHeader>
        <ModalCloseButton />

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={confirmation} isLoading={loading}>
            Sim
          </Button>
          <Button colorScheme="red" mr={3} onClick={onClose} isDisabled={loading}>
            Não
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
