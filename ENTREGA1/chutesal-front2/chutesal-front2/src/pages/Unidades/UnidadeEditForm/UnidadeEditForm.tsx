import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Cancel } from "../../../assets/Icons/Cancel/Cancel";
import { Plus } from "../../../assets/Icons/Plus/Plus";
import { Save } from "../../../assets/Icons/Save/Save";
import { Thrash } from "../../../assets/Icons/Thrash/Thrash";
import { Button } from "../../../components/Button/Button";
import IconButton from "../../../components/IconButton/IconButton";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import QuadraSlider from "../../../components/QuadraSlider/QuadraSlider";
import Select from "../../../components/Select/Select";
import TitleForm from "../../../components/TitleForm/TitleForm";
import { IUf } from "../../../components/UnidadeCreateForm/UnidadeCreateForm";
import apiInstance from "../../../services/apit";
import { IUnidade } from "../Unidades";

interface ISubmitProps {
  nomeUnidade: string;
  numeroUnidade: string | number;
  cep: string;
  logradouro: string;
  numeroEndereco: string | number;
  cidade: string;
  bairro: string;
  uf: string;
}

export default () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [unidade, setUnidade] = useState<IUnidade>({} as IUnidade);
  const [createQuadra, setCreateQuadra] = useState<boolean>(false);
  const [toDelete, setToDelete] = useState<string | number | null>(null);
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

  const fetchUnidade = async () => {
    try {
      const { data } = await apiInstance.get(`/unidade/${id}`);

      console.log({ data });

      if (data) {
        setUnidade(data);
      }
    } catch (e) {
      toast.error("Não foi possível buscar a unidade");
      navigate("/unidades");
    }
  };
  const deleteUnidade = async (id: any) => {
    try {
      const { status, data } = await apiInstance.delete(`/unidade/${id}`);

      if (status === 200) {
        toast.success(`Unidade apagada com sucesso`);
        navigate("/unidades");
      }
    } catch (e) {
      console.log(e);
      toast.error(`Não foi possível apagar a unidade`);
    } finally {
      setToDelete(null);
    }
  };

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
      setSubmitting(true);
      const toSend = {
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
      };

      console.log({ toSend });

      const { status, data } = await apiInstance.put<IUnidade>(
        `/unidade/${unidade?.id}`,
        toSend
      );

      console.log({ data });

      if (status === 200 && data) {
        toast.success(`Unidade atualizada com sucesso`);
      }
    } catch (e) {
      toast.error(`Não foi possível alterar a unidade`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUnidade();
    fetchUFs();
  }, []);

  useEffect(() => {
    setCreateQuadra(false);
  }, [unidade]);
  return (
    <section className="flex flex-col w-full h-full gap-5">
      <Modal
        open={toDelete !== null}
        Icon={Thrash}
        modalText="Deseja apagar a unidade?"
        confirmAction={() => deleteUnidade(toDelete)}
        cancelAction={() => setToDelete(null)}
      />
      <TitleForm
        category="Unidades"
        subcategory={unidade?.nome || "Editar"}
        returnRoute="/unidades"
      />
      <div className="flex w-full">
        <div className="pl-24 pb-5 w-2/4">
          {
            <Formik
              enableReinitialize
              initialValues={{
                nomeUnidade: unidade?.nome || "",
                numeroUnidade: unidade?.numero || "",
                numeroEndereco: unidade?.endereco?.numero || "",
                bairro: unidade?.endereco?.bairro || "",
                cep: unidade?.endereco?.cep || "",
                cidade: unidade?.endereco?.localidade || "",
                logradouro: unidade?.endereco?.logradouro || "",
                uf: unidade?.endereco?.uf || "",
              }}
              onSubmit={onSubmit}
            >
              <Form id="form-unidade" className="flex flex-col gap-12 w-full">
                <div className="flex gap-20">
                  <Input
                    id="nomeUnidade"
                    name="nomeUnidade"
                    footerText="Nome da Unidade"
                    placeholder="Nome da Unidade"
                  />

                  <Input
                    id="numeroUnidade"
                    name="numeroUnidade"
                    footerText="N° da Unidade"
                    placeholder="N° da Unidade"
                    containerWidth="w-2/6"
                  />
                </div>
                <div className="w-2/5">
                  <Input
                    id="cep"
                    name="cep"
                    footerText="CEP"
                    placeholder="00000000"
                  />
                </div>
                <div className="flex justify-between">
                  <Input
                    id="logradouro"
                    name="logradouro"
                    footerText="Logradouro"
                    placeholder="Rua da Unidade"
                    containerWidth="w-2/5"
                  />
                  <Input
                    id="nrEndereco"
                    name="numeroEndereco"
                    footerText="N° do endereço"
                    placeholder="000"
                    containerWidth="w-1/5"
                  />

                  <Input
                    id="bairro"
                    name="bairro"
                    footerText="Bairro"
                    placeholder="Bairro da Unidade"
                    containerWidth="w-2/6"
                  />
                </div>
                <div className="flex gap-7">
                  <Input
                    id="cidade"
                    name="cidade"
                    footerText="Cidade"
                    placeholder="Cidade da Unidade"
                    containerWidth="w-2/5"
                  />

                  <Select
                    id="uf"
                    name="uf"
                    label="UF do Estado"
                    containerWidth="w-1/5"
                    options={ufs?.map(({ nome, sigla }) => ({
                      value: sigla,
                      label: nome,
                    }))}
                  />
                </div>
              </Form>
            </Formik>
          }
        </div>
        <div className="flex flex-col justify-center items-center gap-5 w-2/4 h-full px-40">
          <QuadraSlider
            quadras={
              createQuadra
                ? [{ create: true }]
                : unidade?.quadras?.map((q) => ({ quadra: q })) || []
            }
            unidade={unidade?.id}
            reFetch={fetchUnidade}
          />
          <Button
            className={
              "flex  justify-center w-28 gap-2 hover:scale-105 drop-shadow-md h-10 rounded-lg items-center bg-gray-700 text-gray-200 font-sans"
            }
            onClick={() => setCreateQuadra((actual) => !actual)}
          >
            {createQuadra ? (
              <>
                <Cancel width={18} height={18} />
                Cancelar
              </>
            ) : (
              <>
                <Plus />
                Incluir
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="flex justify-center w-full h-[0.5px]">
        <span className="h-[0.5px] inline-block	 bg-gray-500 w-3/5" />
      </div>
      <div className="flex items-center justify-center gap-20 pt-5">
        <IconButton
          form="form-unidade"
          className="p-2"
          type="submit"
          IconElement={Save}
          text="Salvar"
        />

        <IconButton
          className="p-2"
          type="submit"
          action={() => setToDelete(unidade?.id || null)}
          IconElement={Thrash}
          text="Excluir"
        />
      </div>
    </section>
  );
};
