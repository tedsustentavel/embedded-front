import { Button, Flex } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ReactNode } from "react";
import { JokerForm } from "../../types/jokerForm";
import { GsmForm } from "../../types/gsmForm";
import { useDisclosure } from "@mantine/hooks";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { WifiForm } from "../../types/wifiForm";
import { FicharioForm } from "../../types/ficharioForm";
import { SensorForm } from "../../types/sensorForm";

interface FormProps {
  form:
    | UseFormReturnType<JokerForm>
    | UseFormReturnType<GsmForm>
    | UseFormReturnType<WifiForm>
    | UseFormReturnType<FicharioForm>
    | UseFormReturnType<SensorForm>;
  title?: string;
  submit: any;
  children: ReactNode;
}

export function Form({ form, submit, children }: FormProps) {
  const [opened, { open, close }] = useDisclosure(false);

  function handleSave() {
    const { hasErrors } = form.validate();
    console.log(form.validate());
    hasErrors ? null : open();
  }

  return (
    <>
      <form>
        {children}

        <Flex mt={16} justify="center">
          <Button onClick={handleSave} fullWidth>
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
