import { Title } from "@mantine/core";
import { ReactNode } from "react";

interface FormProps {
  title: string;
  children: ReactNode;
}

export function Form({ title, children }: FormProps) {
  return (
    <>
      <Title order={1}>{title}</Title>

      {children}
    </>
  );
}
