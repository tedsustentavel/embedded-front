import { useContext, useMemo, useState } from "react";
import { AuthContext, AuthContextType } from "../../hooks/auth";
import { Button, Flex, Card } from "@chakra-ui/react";
import { Form, UiSchema } from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";
import { setApiBaseURL } from "../../services/api";

export function Login() {
  const { signIn, loading } = useContext(AuthContext) as AuthContextType;
  const storedBase = useMemo(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("@webserver-baseurl") || "http://192.168.4.1";
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    ip: storedBase,
  });

  const schema = {
    title: "Bem-vindo(a)",
    type: "object",
    required: ["username", "password", "ip"],
    properties: {
      ip: {
        type: "string",
        title: "IP/Host da API",
        description: "Ex.: 192.168.4.1",
        default: storedBase,
      },
      username: {
        type: "string",
        title: "Username",
        default: "",
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3,
      },
    },
  };

  const uiSchema: UiSchema = {
    ip: {
      "ui:placeholder": "192.168.4.1",
    },
    password: {
      "ui:widget": "password",
    },
  };

  return (
    <Flex justify="center" align="center" height="100vh">
      <Card px={12} py={6}>
        <Form
          // @ts-ignore
          schema={schema}
          formData={formData}
          onChange={(e) => setFormData(e.formData)}
          validator={validator}
          onSubmit={() => {
            setApiBaseURL(formData.ip);
            signIn(formData.username, formData.password);
          }}
          uiSchema={uiSchema}
        >
          <Button type="submit" isLoading={loading}>
            Login
          </Button>
        </Form>
      </Card>
    </Flex>
  );
}
