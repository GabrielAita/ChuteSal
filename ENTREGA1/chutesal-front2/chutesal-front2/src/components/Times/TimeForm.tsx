import { Formik, FormikHelpers, Form } from "formik";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Save } from "../../assets/Icons/Save/Save";
import apiInstance from "../../services/apit";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import { Text } from "../Text/Text";

interface ISubmitProps {
  nomeTime: string;
}

interface ITimeFormProps {
  fetchTimes: () => Promise<void>;
}
export default ({ fetchTimes }: ITimeFormProps) => {
  const { id: campeonatoId } = useParams();

  const onSubmit = async (
    { nomeTime: nome }: ISubmitProps,
    { setSubmitting, resetForm }: FormikHelpers<ISubmitProps>
  ) => {
    try {
      const { status: statusCode, data } = await apiInstance.post(`/time`, {
        nome,
        campeonatoId,
      });

      console.log({ data });

      if (statusCode === 201 && data) {
        toast.success(`Time cadastrado com sucesso`);
        fetchTimes();
        resetForm();
      }
    } catch (e) {
      toast.error(`Não foi possível cadastrar o time`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-2/5 flex flex-col gap-5 justify-center ">
      <Text size="lg" className="text-gray-400 p-5">
        Novo Time
      </Text>
      <Formik
        initialValues={{
          nomeTime: "",
        }}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col gap-16 items-center w-full">
          <Input
            id="nomeTime"
            name="nomeTime"
            footerText="Nome do Time"
            placeholder="Nome do Time"
          />

          <IconButton
            className="p-2"
            type="submit"
            IconElement={Save}
            text="Incluir"
          />
        </Form>
      </Formik>
    </div>
  );
};
