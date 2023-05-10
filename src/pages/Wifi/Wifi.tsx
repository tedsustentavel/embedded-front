import { Flex, Stack, Switch, TextInput, Title } from "@mantine/core";
import { Form } from "../../components/Form/Form";
import { useEffect } from "react";
import { getConfig } from "../../services/config";
import { isNotEmpty, useForm } from "@mantine/form";

export function Wifi() {
  const form = useForm({
    initialValues: {
      enable: false,
      ssid: "",
      password: "",
      dhcp: {
        enable: false,
        ip: "",
        mask: "",
        gateway: "",
        dns0: "",
        dns1: "",
      },
    },

    validate: {
      ssid: isNotEmpty("Type something"),
      password: isNotEmpty("Type something"),
      dhcp: {
        ip: isNotEmpty("Type something"),
        mask: isNotEmpty("Type something"),
        gateway: isNotEmpty("Type something"),
        dns0: isNotEmpty("Type something"),
        dns1: isNotEmpty("Type something"),
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
    <Form form={form} submit={() => alert(JSON.stringify(form.values))}>
      <Flex align="center" justify="center" gap={16} mb={32}>
        <Title order={1} align="center">
          Wi-Fi
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

      <TextInput label="SSID" withAsterisk {...form.getInputProps("ssid")} />
      <TextInput
        label="Password"
        withAsterisk
        {...form.getInputProps("password")}
      />

      <Stack my={16}>
        <Flex align="center" gap={16}>
          <Title order={2}>DHCP</Title>
          <Switch
            onLabel="ON"
            offLabel="OFF"
            size="md"
            checked={form.values.dhcp.enable}
            onChange={(event) => {
              form.setFieldValue("dhcp.enable", event.currentTarget.checked);
            }}
            error={form.errors["dhcp.enable"]}
          />
        </Flex>

        <TextInput label="IP" withAsterisk {...form.getInputProps("dhcp.ip")} />
        <TextInput
          label="Mask"
          withAsterisk
          {...form.getInputProps("dhcp.mask")}
        />
        <TextInput
          label="Gateway"
          withAsterisk
          {...form.getInputProps("dhcp.gateway")}
        />
        <TextInput
          label="DNS0"
          withAsterisk
          {...form.getInputProps("dhcp.dns0")}
        />
        <TextInput
          label="DNS1"
          withAsterisk
          {...form.getInputProps("dhcp.dns1")}
        />
      </Stack>
    </Form>
  );
}
