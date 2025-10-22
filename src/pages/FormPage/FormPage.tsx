import { useCallback, useEffect, useRef, useState } from "react";
import { getConfig, postConfig } from "../../services/config";
import validator from "@rjsf/validator-ajv8";
import Form, { UiSchema } from "@rjsf/chakra-ui";
import { RJSFSchema } from "@rjsf/utils";
import { useParams } from "react-router-dom";
import { Button, useDisclosure, Spinner, Center } from "@chakra-ui/react";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";

export function FormPage() {
  const { name } = useParams();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState(null);
  const [schema, setSchema] = useState<RJSFSchema | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultUiSchema: UiSchema = {
    "ui:submitButtonOptions": {
      submitText: "Enviar",
    },
  };
  const [uiSchema, setUiSchema] = useState(defaultUiSchema);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getConfig(name!);
      const parsed_data = JSON.parse(result.data);
      setSchema(parsed_data.schema);
      setFormData(JSON.parse(parsed_data.formData));
      setUiSchema(parsed_data.ui);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  async function handleSubmit() {
    setIsSending(true);
    // @ts-ignore
    const newJSON = JSON.stringify(formData, function (key, value) {return (value === undefined) ? "" : value});
    await postConfig(name!, JSON.parse(newJSON));
    onClose();
    setIsSending(false);
  }

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return schema ? (
    <Form
      key={name!}
      schema={schema}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      validator={validator}
      onSubmit={() => handleSubmit()}
      uiSchema={uiSchema}
      ref={formRef}
    >
      <Button onClick={onOpen} isLoading={loading}>
        Salvar
      </Button>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        loading={isSending}
        // @ts-ignore
        confirmation={() => formRef.current?.submit?.()}
      />
    </Form>
  ) : null;
}
