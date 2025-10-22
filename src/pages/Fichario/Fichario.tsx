import {
  Flex,
  Group,
  NumberInput,
  PasswordInput,
  Stack,
  Switch,
  TextInput,
  Title,
} from "@mantine/core";
import { Form } from "../../components/Form/Form";
import { useEffect } from "react";
import { getConfig } from "../../services/config";
import { isNotEmpty, useForm } from "@mantine/form";

export function Fichario() {
  const form = useForm({
    initialValues: {
      enable: false,
      username: "",
      password: "",
      id: "",
      broker: {
        host: "",
        ssl: false,
        qos: 0,
        keepon: false,
      },
    },

    validate: {
      username: isNotEmpty("Type something"),
      password: isNotEmpty("Type something"),
      id: isNotEmpty("Type something"),
      broker: {
        host: isNotEmpty("Type something"),
        // qos: 0,
      },
    },
  });

  async function fetchConfig() {
  const result = await getConfig('fichario');

    return result;
  }

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <Form
      title="Fichario"
      form={form}
      submit={() => alert(JSON.stringify(form.values))}
    >
      <Flex align="center" justify="center" gap={16} mb={32}>
  <Title order={1} ta="center">
          Fichario
        </Title>
        <Switch
          onLabel="ON"
          offLabel="OFF"
          size="md"
          checked={form.values.enable}
          onChange={(event) => {
            form.setFieldValue("enable", event.currentTarget.checked);
          }}
          error={form.errors["enable"]}
        />
      </Flex>

      <TextInput
        label="Username"
        withAsterisk
        {...form.getInputProps("username")}
      />
      <PasswordInput
        label="Password"
        withAsterisk
        {...form.getInputProps("password")}
      />

      <TextInput label="ID" withAsterisk {...form.getInputProps("id")} />

      <Stack>
        <Title order={2}>Broker</Title>
        <TextInput
          label="Host"
          withAsterisk
          {...form.getInputProps("broker.host")}
        />
        <Group>
          <Switch
            onLabel="ON"
            offLabel="OFF"
            size="md"
            label="SSL"
            checked={form.values.broker.ssl}
            onChange={(event) => {
              form.setFieldValue("broker.ssl", event.currentTarget.checked);
            }}
            error={form.errors["broker.ssl"]}
          />
          <Switch
            onLabel="ON"
            offLabel="OFF"
            size="md"
            label="Keepon"
            checked={form.values.broker.keepon}
            onChange={(event) => {
              form.setFieldValue("broker.keepon", event.currentTarget.checked);
            }}
            error={form.errors["broker.keepon"]}
          />
        </Group>

        <NumberInput
          defaultValue={0}
          label="QOS"
          withAsterisk
          {...form.getInputProps("qos")}
        />
      </Stack>
    </Form>
  );
}
