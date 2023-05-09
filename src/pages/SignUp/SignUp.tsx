import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Container,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";

export function SignUp() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6
          ? "Password should include at least 6 characters"
          : null,
      passwordConfirmation: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper radius="md" m="0 auto" w={500} p="xl" withBorder>
        <Text size="lg" weight={500} align="center">
          Create a account
        </Text>

        <form
          onSubmit={form.onSubmit(
            () => console.log("teste")
            // signIn(form.values.email, form.values.password)
          )}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="example@email.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
              disabled={loading}
            />

            <PasswordInput
              required
              label="Password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
              radius="md"
              disabled={loading}
            />

            <PasswordInput
              required
              label="Password Confirmation"
              value={form.values.passwordConfirmation}
              onChange={(event) =>
                form.setFieldValue(
                  "passwordConfirmation",
                  event.currentTarget.value
                )
              }
              error={form.errors.passwordConfirmation}
              radius="md"
              disabled={loading}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Link to="/login">
              <Anchor component="button" type="button" color="dimmed" size="xs">
                Have an account? Login
              </Anchor>
            </Link>
            <Button type="submit" radius="xl" loading={loading}>
              Sign Up
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
