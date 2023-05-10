import { Flex, NumberInput, Switch, TextInput, Title } from "@mantine/core";
import { Form } from "../../components/Form/Form";
import { useEffect } from "react";
import { getConfig } from "../../services/config";
import { useForm } from "@mantine/form";

export function Fichario() {
  const form = useForm({
    initialValues: {
      enable: true,
      username: "",
      password: "",
      id: "",
      broker: {
        host: "",
        ssl: true,
        qos: 1,
        keepon: true,
      },
    },
  });

  async function fetchConfig() {
    const result = await getConfig();

    return result;
  }

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <Form title="Fichario" form={form} submit={() => {}}>
      <Switch onLabel="ON" offLabel="OFF" size="md" />
      <TextInput label="Username" withAsterisk />
      <TextInput label="Password" withAsterisk />
      <TextInput label="ID" withAsterisk />
      <div>
        <Title order={4}>Broker</Title>
        <TextInput label="Host" withAsterisk />
        <Switch onLabel="ON" offLabel="OFF" size="md" label="SSL" />
        <Switch onLabel="ON" offLabel="OFF" size="md" label="Keepon" />
        <TextInput label="Mask" withAsterisk />
        <NumberInput defaultValue={0} label="QOS" withAsterisk />
      </div>
    </Form>
  );
}
