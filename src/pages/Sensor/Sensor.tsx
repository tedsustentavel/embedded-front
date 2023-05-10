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
import { isNotEmpty, useForm } from "@mantine/form";
import { useStyles } from "../../components/Form/styles";

export function Sensor() {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      temperature: {
        enable: false,
        bias: 0,
        gain: 0,
      },
      laser: {
        enable: false,
        addr: "",
        bias: 0,
        diameter: 0,
        length: 0,
      },
    },

    validate: {
      laser: {
        addr: isNotEmpty("Type something"),
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
    <Form
      title="Sensor"
      form={form}
      submit={() => alert(JSON.stringify(form.values))}
    >
      <Title order={1} align="center" mb={32}>
        Sensor
      </Title>

      <Stack my={16}>
        <Flex align="center" gap={16}>
          <Title order={2}>Temperature</Title>
          <Switch
            onLabel="ON"
            offLabel="OFF"
            size="md"
            checked={form.values.temperature.enable}
            onChange={(event) => {
              form.setFieldValue(
                "temperature.enable",
                event.currentTarget.checked
              );
            }}
            error={form.errors["temperature.enable"]}
          />
        </Flex>

        <Flex gap={16} wrap="wrap">
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Bias"
            withAsterisk
            precision={1}
            step={0.1}
            {...form.getInputProps("temperature.bias")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Gain"
            withAsterisk
            precision={1}
            step={0.1}
            {...form.getInputProps("temperature.gain")}
          />
        </Flex>
      </Stack>

      <Stack>
        <Flex align="center" gap={16}>
          <Title order={2}>Laser</Title>
          <Switch
            onLabel="ON"
            offLabel="OFF"
            size="md"
            checked={form.values.laser.enable}
            onChange={(event) => {
              form.setFieldValue("laser.enable", event.currentTarget.checked);
            }}
            error={form.errors["laser.enable"]}
          />
        </Flex>

        <TextInput
          label="Addr"
          withAsterisk
          {...form.getInputProps("laser.addr")}
        />

        <Flex gap={16} wrap="wrap">
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Bias"
            withAsterisk
            precision={1}
            step={0.1}
            {...form.getInputProps("laser.bias")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Diameter"
            withAsterisk
            precision={3}
            step={0.001}
            min={0}
            {...form.getInputProps("laser.diameter")}
          />

          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Length"
            withAsterisk
            precision={3}
            step={0.001}
            min={0}
            {...form.getInputProps("laser.Length")}
          />
        </Flex>
      </Stack>
    </Form>
  );
}
