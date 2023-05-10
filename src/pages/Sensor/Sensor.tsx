import { Flex, NumberInput, Switch, TextInput, Title } from "@mantine/core";
import { Form } from "../../components/Form/Form";
import { useEffect } from "react";
import { getConfig } from "../../services/config";
import { useForm } from "@mantine/form";

export function Sensor() {
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
    <Form title="Sensor" form={form} submit={() => {}}>
      <div>
        <Flex align="center" gap={16}>
          <Title order={2}>Temperature</Title>
          <Switch onLabel="ON" offLabel="OFF" size="md" />
        </Flex>
        <NumberInput defaultValue={0} label="Bias" withAsterisk />
        <NumberInput defaultValue={0} label="Fain" withAsterisk />
      </div>

      <div>
        <Flex align="center" gap={16}>
          <Title order={2}>Laser</Title>
          <Switch onLabel="ON" offLabel="OFF" size="md" />
        </Flex>

        <TextInput label="Addr" withAsterisk />
        <NumberInput defaultValue={0} label="Bias" withAsterisk />
        <NumberInput defaultValue={0} label="Diameter" withAsterisk />
        <NumberInput defaultValue={0} label="Length" withAsterisk />
      </div>
    </Form>
  );
}
