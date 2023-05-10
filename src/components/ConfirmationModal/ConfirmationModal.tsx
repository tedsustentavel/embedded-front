import { Button, Group, Modal } from "@mantine/core";

interface ConfirmationModalProps {
  opened: boolean;
  close: () => void;
  confirmation: (event?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export function ConfirmationModal({
  opened,
  close,
  confirmation,
}: ConfirmationModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      title="Tem certeza que quer salvar essas configurações"
    >
      <Group>
        <Button
          color="green"
          onClick={() => {
            confirmation();
            close();
          }}
        >
          Sim
        </Button>
        <Button color="red" onClick={close}>
          Não
        </Button>
      </Group>
    </Modal>
  );
}
