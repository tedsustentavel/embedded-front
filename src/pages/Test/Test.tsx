import { TextInput } from "@mantine/core";
import { Form } from "../../components/Form/Form";

export function Test() {
  return (
    <Form title="Título">
      <TextInput placeholder="Your name" label="Full name" withAsterisk />
    </Form>
  );
}
