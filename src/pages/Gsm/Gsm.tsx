import {
  Flex,
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
import { useStyles } from "../../components/Form/styles";

export function Gsm() {
  const { classes } = useStyles();

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

    validate: {
      apn: isNotEmpty("Type something"),
      username: isNotEmpty("Type something"),
      password: isNotEmpty("Type something"),
    },
  });

  async function fetchConfig() {
  const result = await getConfig('gsm');

    return result;
  }

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <Form form={form} submit={() => alert(JSON.stringify(form.values))}>
      <Flex align="center" justify="center" gap={16} mb={32}>
  <Title order={1} ta="center">
          GSM
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
        label="APN"
        withAsterisk
        mb={4}
        {...form.getInputProps("apn")}
      />
      <TextInput
        label="Username"
        withAsterisk
        mb={4}
        {...form.getInputProps("username")}
      />
      <PasswordInput
        label="Password"
        withAsterisk
        mb={4}
        {...form.getInputProps("password")}
      />

      <Stack my={16}>
        <Title order={4}>SIM800</Title>
        <Flex gap={16} wrap="wrap">
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Tx"
            min={0}
            withAsterisk
            {...form.getInputProps("sim800.tx")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Rx"
            min={0}
            withAsterisk
            {...form.getInputProps("sim800.rx")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="UART"
            min={0}
            withAsterisk
            {...form.getInputProps("sim800.uart")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Timeout"
            min={0}
            withAsterisk
            {...form.getInputProps("sim800.timeout")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Baudrate"
            min={0}
            withAsterisk
            {...form.getInputProps("sim800.baudrate")}
          />
        </Flex>
      </Stack>

      <Stack>
        <Title order={4}>SIM7020E</Title>
        <Flex gap={16} wrap="wrap">
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Tx"
            min={0}
            withAsterisk
            {...form.getInputProps("sim7020e.tx")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Rx"
            min={0}
            withAsterisk
            {...form.getInputProps("sim7020e.rx")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="UART"
            min={0}
            withAsterisk
            {...form.getInputProps("sim7020e.uart")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Timeout"
            min={0}
            withAsterisk
            {...form.getInputProps("sim7020e.timeout")}
          />
          <NumberInput
            className={classes.smallInput}
            defaultValue={0}
            label="Baudrate"
            min={0}
            withAsterisk
            {...form.getInputProps("sim7020e.baudrate")}
          />
        </Flex>
      </Stack>
    </Form>
  );
}
