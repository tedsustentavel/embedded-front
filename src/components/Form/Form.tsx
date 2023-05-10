import { Button, Flex, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ReactNode } from "react";
import { JokerForm } from "../../types/jokerForm";
import { GsmForm } from "../../types/gsmForm";

interface FormProps {
  title: string;
  form: UseFormReturnType<JokerForm> | UseFormReturnType<GsmForm>;
  submit: any;
  children: ReactNode;
}

export function Form({ title, form, submit, children }: FormProps) {
  return (
    <form onSubmit={form.onSubmit(() => submit())}>
      <Title order={1} align="center">
        {title}
      </Title>

      {children}

      <Flex mt={16} justify="center">
        <Button type="submit" fullWidth>
          SALVAR
        </Button>
      </Flex>
    </form>
  );
}
