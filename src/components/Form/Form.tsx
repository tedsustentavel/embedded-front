import { Button, Flex, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ReactNode } from "react";
import { JokerForm } from "../../types/jokerForm";
import { GsmForm } from "../../types/gsmForm";
import { useDisclosure } from "@mantine/hooks";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

interface FormProps {
  form: UseFormReturnType<JokerForm> | UseFormReturnType<GsmForm>;
  title?: string;
  submit: any;
  children: ReactNode;
}

export function Form({ form, submit, children }: FormProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <form>
        {children}

        <Flex mt={16} justify="center">
          <Button onClick={open} fullWidth>
            SALVAR
          </Button>
        </Flex>

        <ConfirmationModal
          opened={opened}
          close={close}
          confirmation={form.onSubmit(() => submit())}
        />
      </form>
    </>
  );
}
