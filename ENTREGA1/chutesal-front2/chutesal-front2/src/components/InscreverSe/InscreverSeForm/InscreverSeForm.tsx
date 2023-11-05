import { Form, Formik, FormikHelpers } from "formik";
import Input from "../../Input/Input";
import { Button } from "../../Button/Button";
import { EnviarIcon } from "../../../assets/Icons/EnviarIcon/EnviarIcon";
import { toast } from "react-toastify";
import apiInstance from "../../../services/apit";
import { convertToDateString } from "../../../helpers/date";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface IInscricaoProps {
  nomeCompleto: string;
  apelido: string;
  whatsApp: string;
  dataNascimento: string;
}

export function InscreverSeForm() {
  const [block, setBlock] = useState<boolean>(true);
  const { id: campeonatoId } = useParams();
  const onSubmit = async (
    {
      nomeCompleto,
      apelido,
      dataNascimento,
      whatsApp: whatsapp,
    }: IInscricaoProps,
    { setSubmitting }: FormikHelpers<IInscricaoProps>
  ) => {
    try {
      const { status: statusCode, data } = await apiInstance.post(`/inscrito`, {
        nome: nomeCompleto,
        apelido,
        whatsapp,
        dataNascimento: convertToDateString(dataNascimento),
        campeonatoId,
      });

      if (statusCode === 201 && data) {
        toast.success(`Inscrição enviada!`);
        setBlock(true);
      }
    } catch (e) {
      toast.error(`Não foi possível realizar a inscrição`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={"flex justify-center w-full"}>
      <Formik
        initialValues={{
          nomeCompleto: "",
          apelido: "",
          whatsApp: "",
          dataNascimento: "",
        }}
        onSubmit={onSubmit}
      >
        <Form onChange={() => setBlock(false)} className={"w-1/3"}>
          <div>
            <Input
              id={"nomeCompleto"}
              name={"nomeCompleto"}
              footerText={"Nome Completo"}
              placeholder={"Nome completo"}
            />
            <Input
              id={"apelido"}
              name={"apelido"}
              footerText={"Apelido"}
              placeholder={"Apelido do inscrito"}
            />
            <Input
              id={"whatsApp"}
              name={"whatsApp"}
              footerText={"WhatsApp"}
              placeholder={"(XX) 9XXXX-XXXX"}
            />
            <Input
              id={"dataNascimento"}
              name={"dataNascimento"}
              footerText={"Data de nascimento"}
              type="date"
            />
          </div>
          <div className={"flex justify-center"}>
            <Button
              disabled={block}
              type={"submit"}
              className={`flex items-center justify-center w-48 h-10 hover:${
                block ? "none" : "scale-105"
              } drop-shadow-md transition gap-2 bg-gray-700 text-gray-200 font-sans font-normal`}
            >
              <EnviarIcon />
              Enviar Inscrição
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
