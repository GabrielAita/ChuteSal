import Table, { IColumnOption } from "../../Table/Table";
import { Options } from "../../Options/Options";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../../services/apit";
import { toast } from "react-toastify";
import { Text } from "../../Text/Text";
import Modal from "../../Modal/Modal";
import { Thrash } from "../../../assets/Icons/Thrash/Thrash";
import { ICampeonato } from "../../../pages/GerenciarCampeonato/GerenciarCampeonato";
import { ITime } from "../../Times/Times";
import Select from "../../Select/Select";
import { Form, Formik } from "formik";
import { convertToDateString } from "../../../helpers/date";

export interface IInscrito {
  id: number;
  nome: string;
  whatsapp: string;
  apelido: string;
  dataNascimento: string;
  idade: number;
  time: ITime;
}

interface InscritosProps {
  inscritos: IInscrito[];
  times: ITime[];
  reFetch: () => Promise<void>;
}

export function Inscritos({ inscritos, times, reFetch }: InscritosProps) {
  const { id } = useParams();
  const [toDelete, setToDelete] = useState<number | null>(null);
  console.log({ inscritos });

  const mudarTime = async (
    { id, nome, apelido, dataNascimento, idade, whatsapp }: IInscrito,
    timeId?: number | string
  ) => {
    try {
      const toSend = {
        nome,
        apelido,
        whatsapp,
        dataNascimento: convertToDateString(dataNascimento),
        timeId: timeId || 0,
      };
      console.log({ toSend });

      const { status, data } = await apiInstance.put(`/inscrito/${id}`, toSend);

      if (status === 200) {
        toast.success("Time do inscrito alterado com sucesso");
        reFetch();
      } else {
        toast.error("Não foi possível alterar o time do inscrito");
      }
    } catch (e) {
      console.log("ERRO ALTERACAO TIME DO INSCRITO");
      console.log({ e });

      toast.error(`Não foi possível alterar o time do inscrito`);
    }
  };

  const deleteInscrito = async (id: any) => {
    try {
      const { status, data } = await apiInstance.delete(`/inscrito/${id}`);

      if (status === 200) {
        toast.success(`Inscrito apagado com sucesso`);
        reFetch();
      }
    } catch (e) {
      console.log(e);
      toast.error(`Não foi possível apagar o inscrito`);
    } finally {
      setToDelete(null);
    }
  };

  const headerOptions: IColumnOption<IInscrito>[] = [
    {
      displayName: "Nome",
      valueKey: "nome",
      id: "nome",
      className: "justify-start",
    },
    {
      displayName: "Idade",
      valueKey: "idade",
      id: "idade",
    },
    {
      displayName: "WhatsApp",
      valueKey: "whatsapp",
      id: "whatsapp",
    },
    {
      displayName: "Time",
      valueKey: "time",
      transformCell: ({ value, rowObject }) => (
        <Formik
          initialValues={{
            timeInscrito: rowObject.time?.id || undefined,
          }}
          onSubmit={() => {}}
        >
          <Form>
            <Select
              id={`inscrito-${rowObject.id}-time`}
              name={`timeInscrito`}
              label="Time"
              options={times.map(({ id: value, nome: label }) => ({
                label,
                value,
              }))}
              onChange={({ target }) => {
                const idTime = (target as HTMLInputElement).value;
                mudarTime(rowObject, idTime);
              }}
            />
          </Form>
        </Formik>
      ),
      id: "time",
    },
    {
      displayName: "Excluir",
      type: "action",
      valueKey: "id",
      transformCell: ({ value: id }) => (
        <Options stroke={"#006666"} deleteCallback={() => setToDelete(id)} />
      ),
      id: "excluir",
    },
  ];

  return (
    <>
      <Modal
        open={toDelete !== null}
        Icon={Thrash}
        modalText="Deseja apagar o inscrito?"
        confirmAction={() => deleteInscrito(toDelete)}
        cancelAction={() => setToDelete(null)}
      />

      <main className={"flex flex-col items-center h-full mb-12 mx-8"}>
        <Table columns={headerOptions} data={inscritos} hideTableHeaderLine />
      </main>
    </>
  );
}
