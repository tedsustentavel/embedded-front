import { Flex, NumberInput, Switch, TextInput, Title } from "@mantine/core";
import { Form } from "../../components/Form/Form";
import { useEffect } from "react";
import { getConfig } from "../../services/config";
import { useForm } from "@mantine/form";

export function Wifi() {
  const form = useForm({
    initialValues: {
      enable: true,
      ssid: "Ibrate 2.4G",
      password: "ibrate@2021#",
      dhcp: {
        enable: true,
        ip: "",
        mask: "",
        gateway: "",
        dns0: "",
        dns1: "",
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
    <Form title="Wifi" form={form} submit={() => {}}>
      <Switch onLabel="ON" offLabel="OFF" size="md" />
      <TextInput label="SSID" withAsterisk />
      <TextInput label="Password" withAsterisk />
      <div>
        <Flex align="center" gap={16}>
          <Title order={4}>DHCP</Title>
          <Switch onLabel="ON" offLabel="OFF" size="md" />
        </Flex>
        <TextInput label="IP" withAsterisk />
        <TextInput label="Mask" withAsterisk />
        <TextInput label="Gateway" withAsterisk />
        <TextInput label="DNS0" withAsterisk />
        <TextInput label="DNS1" withAsterisk />
      </div>
    </Form>
  );
}
