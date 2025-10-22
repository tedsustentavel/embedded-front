import {
  Flex,
  NumberInput,
  Stack,
  Switch,
  TextInput,
  Title,
} from "@mantine/core";
import { Form } from "../../components/Form/Form";
import { useEffect } from "react";
import { getConfig } from "../../services/config";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";

export function Joker() {
  const form = useForm({
    initialValues: {
      ntp: {
        enable: false,
        ntp1: "",
        ntp2: "",
        ntp3: "",
      },
      timezone: 0,
    },

    validate: {
      ntp: {
        ntp1: isNotEmpty("Type something"),
        ntp2: isNotEmpty("Type something"),
        ntp3: isNotEmpty("Type something"),
      },
      timezone: isInRange({ min: -11, max: 12 }, "Type a valid Timezone"),
    },
  });

  async function fetchConfig() {
  const result = await getConfig('joker');

    return result;
  }

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <Form
      title="Joker"
      form={form}
      submit={() => alert(JSON.stringify(form.values))}
    >
  <Title order={1} ta="center" mb={32}>
        Joker
      </Title>

      <Stack>
        <Flex align="center" gap={16}>
          <Title order={2}>NTP</Title>
          <Switch
            onLabel="ON"
            offLabel="OFF"
            size="md"
            checked={form.values.ntp.enable}
            onChange={(event) => {
              form.setFieldValue("ntp.enable", event.currentTarget.checked);
            }}
            error={form.errors["ntp.enable"]}
          />
        </Flex>

        <TextInput
          label="NTP 1"
          withAsterisk
          mb={4}
          {...form.getInputProps("ntp.ntp1")}
        />
        <TextInput
          label="NTP 2"
          withAsterisk
          {...form.getInputProps("ntp.ntp2")}
        />
        <TextInput
          label="NTP 3"
          withAsterisk
          {...form.getInputProps("ntp.ntp3")}
        />

        <NumberInput
          defaultValue={0}
          label="Timezone"
          max={12}
          min={-11}
          withAsterisk
          {...form.getInputProps("timezone")}
        />
      </Stack>
    </Form>
  );
}
