import { Grid, NumberInput, Switch, TextInput, Title } from "@mantine/core";
import { Form } from "../../components/Form/Form";
import { useEffect } from "react";
import { getConfig } from "../../services/config";
import { useForm } from "@mantine/form";

export function Gsm() {
  const form = useForm({
    initialValues: {
      enable: false,
      apn: "",
      username: "",
      password: "",
      sim800: {
        tx: 0,
        rx: 0,
        uart: 0,
        timeout: 0,
        baudrate: 0,
      },
      sim7020e: {
        tx: 0,
        rx: 0,
        uart: 0,
        timeout: 0,
        baudrate: 0,
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
    <Form title="GSM" form={form} submit={() => {}}>
      <Switch onLabel="ON" offLabel="OFF" size="md" />
      <TextInput label="APN" withAsterisk />
      <TextInput label="Username" withAsterisk />
      <TextInput label="Password" withAsterisk />

      <div>
        <Title order={4}>SIM800</Title>
        <Grid gutter="lg" m={0}>
          <Grid.Col md={4} sm={6} xs={12}>
            <NumberInput defaultValue={0} label="Tx" min={0} withAsterisk />
          </Grid.Col>
          <Grid.Col md={4} sm={6} xs={12}>
            <NumberInput defaultValue={0} label="Rx" min={0} withAsterisk />
          </Grid.Col>
          <Grid.Col md={4} sm={6} xs={12}>
            <NumberInput defaultValue={0} label="UART" min={0} withAsterisk />
          </Grid.Col>
          <Grid.Col md={4} sm={6} xs={12}>
            <NumberInput
              defaultValue={0}
              label="Timeout"
              min={0}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col md={4} sm={6} xs={12}>
            <NumberInput
              defaultValue={0}
              label="Baudrate"
              min={0}
              withAsterisk
            />
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <Title order={4}>SIM7020E</Title>
        <div>
          <NumberInput defaultValue={0} label="Tx" min={0} withAsterisk />
          <NumberInput defaultValue={0} label="Rx" min={0} withAsterisk />
          <NumberInput defaultValue={0} label="UART" min={0} withAsterisk />
          <NumberInput defaultValue={0} label="Timeout" min={0} withAsterisk />
          <NumberInput defaultValue={0} label="Baudrate" min={0} withAsterisk />
        </div>
      </div>
    </Form>
  );
}
