import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Save } from "../../assets/Icons/Save/Save";
import { IUnidade } from "../../pages/Unidades/Unidades";
import apiInstance from "../../services/apit";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import Select from "../Select/Select";
import TitleForm from "../TitleForm/TitleForm";

export interface IUf {
  id: number;
  sigla: string;
  nome: string;
}

interface ISubmitProps {
  nomeUnidade: string;
  numeroUnidade: string;
  cep: string;
  logradouro: string;
  numeroEndereco: string;
  cidade: string;
  bairro: string;
  uf: string;
}

export default () => {
  const navigate = useNavigate();
  const [ufs, setUfs] = useState<IUf[]>([]);

  const fetchUFs = async () => {
    try {
      const ufUrl =
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

      const { data } = await axios.get(ufUrl);

      setUfs(data);
    } catch (e) {
      toast.error("Não foi possível carregar a lista de estados");
    }
  };

  useEffect(() => {
    fetchUFs();
  }, []);

  const onSubmit = async (
    {
      nomeUnidade,
      numeroUnidade,
      cep,
      logradouro,
      numeroEndereco,
      bairro,
      cidade,
      uf,
    }: ISubmitProps,
    { setSubmitting }: FormikHelpers<ISubmitProps>
  ) => {
    try {
      const { status: statusCode, data } = await apiInstance.post<IUnidade>(
        `/unidade`,
        {
          nome: nomeUnidade,
          numero: numeroUnidade,
          endereco: {
            cep,
            logradouro,
            numero: numeroEndereco,
            bairro,
            localidade: cidade,
            uf,
          },
          quadrasId: [],
          campeonatosId: [],
        }
      );

      console.log({ data });

      if (statusCode === 201 && data) {
        toast.success(`Unidade cadastrada com sucesso`);
        navigate(`/unidades/${data.id}`);
      }
    } catch (e) {
      toast.error(`Não foi possível cadastrar a unidade`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col gap-10 items-center h-full w-full">
      <TitleForm
        category="Unidades"
        subcategory={"Incluir unidade"}
        returnRoute="/unidades"
      />
      <div className="flex w-4/5 justify-center">
        <Formik
          initialValues={{
            nomeUnidade: "",
            numeroUnidade: "",

            cep: "",
            logradouro: "",
            numeroEndereco: "",
            cidade: "",
            bairro: "",
            uf: "",
          }}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-16 items-center justify-between h-3/4 w-full">
            <div className="flex justify-between w-3/4">
              <div className="flex flex-col gap-20 w-2/5">
                <Input
                  id="nome"
                  name="nomeUnidade"
                  footerText="Nome da Unidade"
                  placeholder="Nome da Unidade"
                />
                <div className="flex flex-col justify-between h-full w-2/4">
                  <Input
                    id="numeroUnidade"
                    type="number"
                    name="numeroUnidade"
                    footerText="N° da Unidade"
                    placeholder="N° da Unidade"
                  />

                  <Input
                    id="cep"
                    name="cep"
                    footerText="CEP"
                    placeholder="CEP"
                  />
                </div>
              </div>
              <div className="flex flex-col h-1/4 w-2/5">
                <Input
                  id="logradouro"
                  name="logradouro"
                  footerText="Logradouro"
                  placeholder="Rua da Unidade"
                />
                <div className="flex flex-col w-2/4">
                  <Input
                    id="numeroEndereco"
                    name="numeroEndereco"
                    footerText="N° do Endereço"
                    placeholder="Número"
                  />

                  <Input
                    id="bairro"
                    name="bairro"
                    footerText="Bairro"
                    placeholder="Bairro da unidade"
                  />

                  <Input
                    id="cidade"
                    name="cidade"
                    footerText="Cidade"
                    placeholder="Cidade da unidade"
                  />

                  <Select
                    id="uf"
                    name="uf"
                    label="UF do Estado"
                    options={ufs?.map(({ nome, sigla }) => ({
                      value: sigla,
                      label: nome,
                    }))}
                  />
                </div>
              </div>
            </div>
            <IconButton
              className="p-2"
              type="submit"
              IconElement={Save}
              text="Incluir"
            />
          </Form>
        </Formik>
      </div>
    </main>
  );
};
