import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import QuadraIcon from "../../assets/Icons/Quadra/QuadraIcon";
import { Save } from "../../assets/Icons/Save/Save";
import { Thrash } from "../../assets/Icons/Thrash/Thrash";
import apiInstance from "../../services/apit";
import { Button } from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import { IQuadra } from "../QuadraSlider/QuadraSlider";
import { Text } from "../Text/Text";

interface IQuadraCardProps {
  create?: boolean;
  quadra?: IQuadra;
  unidade?: number;
  reFetch: () => Promise<void>;
}

export default ({ quadra, create, reFetch, unidade }: IQuadraCardProps) => {
  const [toDelete, setToDelete] = useState<boolean>(false);

  const createQuadra = async (nome: string) => {
    try {
      const { status, data } = await apiInstance.post("/quadra", {
        nome,
        unidadeId: unidade,
        jogosId: [],
      });

      if (status === 201) {
        toast.success("Quadra criada com sucesso!");
        reFetch();
      }
    } catch (e) {
      toast.error("Ocorreu um erro ao criar a quadra!");
    }
  };

  const editarQuadra = async (nome: string) => {
    try {
      const { status, data } = await apiInstance.put(`/quadra/${quadra?.id}`, {
        nome,
        unidadeId: unidade,
        jogosId: [],
      });

      if (status === 200) {
        toast.success("Quadra alterada com sucesso!");
        reFetch();
      }
    } catch (e) {
      toast.error("Ocorreu um erro ao alterar a quadra!");
    }
  };

  const onSubmit = async (
    { nomeQuadra }: { nomeQuadra: string },
    { setSubmitting }: FormikHelpers<{ nomeQuadra: string }>
  ) => {
    try {
      setSubmitting(true);
      if (create) createQuadra(nomeQuadra);
      else editarQuadra(nomeQuadra);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  const excluirQuadra = async () => {
    try {
      const response = await apiInstance.delete(`quadra/${quadra!.id}`);
      if (response.status === 200) {
        toast.success("Quadra excluida com sucesso!");
        reFetch();
      }
    } catch (e) {
      console.group("Quadra - EXCLUSÃO");
      console.log({ e });
      console.groupEnd();
      toast.error("Erro ao excluir quadra!");
    } finally {
      setToDelete(false);
    }
  };
  return (
    <div className="w-full h-full rounded-2xl">
      <Modal
        modalText={`Tem certeza que deseja excluir a quadra '${
          quadra?.nome || ""
        }' ?`}
        cancelAction={() => setToDelete(false)}
        confirmAction={excluirQuadra}
        open={toDelete}
      />
      <div className="flex flex-col p-5 gap-5 h-full w-full bg-gray-700 b-radius rounded-2xl">
        <Text className="text-gray-400">
          {quadra?.nome || "Incluir quadra"}
        </Text>
        <div className="flex justify-center items-center w-full">
          <QuadraIcon />
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            nomeQuadra: quadra?.nome || "",
          }}
          onSubmit={onSubmit}
        >
          <Form id={create ? "create-quadra" : `update-quadra-${quadra?.id}`}>
            <Input
              id="nomeQuadra"
              name="nomeQuadra"
              footerText="Nome"
              placeholder="Nome da Quadra"
            />
          </Form>
        </Formik>

        <div className="flex justify-center items-center w-full gap-10">
          <button
            form={create ? "create-quadra" : `update-quadra-${quadra?.id}`}
          >
            <Save stroke="#006666" width={27} height={27} />
          </button>
          {quadra && (
            <button onClick={() => setToDelete(true)}>
              <Thrash stroke="#006666" width={27} height={27} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
