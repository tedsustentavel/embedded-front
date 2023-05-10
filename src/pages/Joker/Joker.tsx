import { Flex, NumberInput, Switch, TextInput, Title } from "@mantine/core";
import { Form } from "../../components/Form/Form";
import { useEffect } from "react";
import { getConfig } from "../../services/config";
import { useForm } from "@mantine/form";

export function Joker() {
  const form = useForm({
    initialValues: {
      ntp: {
        enable: true,
        ntp1: "a.ntp.br",
        ntp2: "",
        ntp3: "",
      },
      timezone: 0,
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
    <Form title="Joker" form={form} submit={() => {}}>
      <div>
        <div>
          <Flex align="center" gap={16}>
            <Title order={2}>NTP</Title>
            <Switch onLabel="ON" offLabel="OFF" size="md" />
          </Flex>

          <TextInput label="NTP 1" withAsterisk />
          <TextInput label="NTP 2" withAsterisk />
          <TextInput label="NTP 3" withAsterisk />
        </div>
        <NumberInput
          defaultValue={0}
          label="Timezone"
          max={12}
          min={-11}
          withAsterisk
        />
      </div>
    </Form>
  );
}
