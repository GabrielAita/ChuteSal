import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus } from "../../assets/Icons/Plus/Plus";
import { Thrash } from "../../assets/Icons/Thrash/Thrash";
import { convertToDateString } from "../../helpers/date";
import { ICampeonato } from "../../pages/GerenciarCampeonato/GerenciarCampeonato";
import { IJogo } from "../../pages/Jogos/Jogos";
import apiInstance from "../../services/apit";
import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";
import { Options } from "../Options/Options";
import Table, { IColumnOption } from "../Table/Table";
import { Text } from "../Text/Text";
import TitleForm from "../TitleForm/TitleForm";

interface IProps {
  campeonato?: ICampeonato;
}

export default ({ campeonato }: IProps) => {
  const [jogos, setJogos] = useState<IJogo[]>([]);
  const [toDelete, setToDelete] = useState<number | string | null>(null);
  const navigate = useNavigate();

  const deleteJogo = async (id: any) => {
    try {
      const { status, data } = await apiInstance.delete(`/jogo/${id}`);

      if (status === 200) {
        toast.success(`Jogo excluido com sucesso`);
        fetchData();
      }
    } catch (e) {
      console.log(e);
      toast.error(`Não foi possível excluir o jogo`);
    } finally {
      setToDelete(null);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await apiInstance.get<IJogo[]>(`/jogo`);
      console.log({ data });

      const formattedData: IJogo[] = data?.map(
        ({ id, horario, campeonato, quadra, placarA, placarB, times }) => {
          const [data, hora] = horario.split(" ");
          const [timeA, timeB] = times;
          return {
            id,
            horario,
            data,
            hora,
            campeonato,
            quadra,
            times,
            timeA,
            timeB,
            placarA,
            placarB,
          } as IJogo;
        }
      );

      setJogos(formattedData);
    } catch (e) {
      console.log({ e });
      toast.error(`Não foi possível buscar os jogos`);
    }
  };

  const headerOptions: IColumnOption<IJogo>[] = [
    {
      displayName: "Time A",
      valueKey: "timeA",
      transformCell: ({ value }) => (
        <Text className={"text-white"}>{value?.nome || ""}</Text>
      ),
      id: "timeA",
    },
    {
      displayName: "Time B",
      valueKey: "timeB",
      transformCell: ({ value }) => (
        <Text className={"text-white"}>{value?.nome || ""}</Text>
      ),
      id: "timeB",
    },
    {
      displayName: "Placar A x B",
      valueKey: "placarA",
      width: "w-44",
      transformCell: ({ rowObject: { placarA, placarB } }) => (
        <Text className={"text-white"}>
          {placarA} x {placarB}
        </Text>
      ),
      id: "placar",
    },
    {
      displayName: "Data",
      valueKey: "data",
      width: "w-44",

      transformCell: ({ value }) => (
        <Text className={"text-white"}>
          {convertToDateString(value)?.replaceAll("-", "/")}
        </Text>
      ),
      id: "data",
    },
    {
      displayName: "Horario",
      width: "w-44",
      valueKey: "hora",
      id: "hora",
    },
    {
      displayName: "Quadra",
      valueKey: "quadra",
      transformCell: ({ value }) => (
        <Text className={"text-white"}>{value?.nome || ""}</Text>
      ),
      id: "quadra",
    },
    {
      displayName: "Opções",
      type: "action",
      valueKey: "id",
      transformCell: ({ value: id }) => {
        return (
          <Options
            editCallback={() =>
              navigate(`/jogos/${id}`, {
                state: {
                  idCampeonato: campeonato?.id,
                  nomeCampeonato: campeonato?.nome,
                },
              })
            }
            deleteCallback={() => setToDelete(id)}
          />
        );
      },
      id: "opcoes",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center h-full w-full">
      <Modal
        open={toDelete !== null}
        Icon={Thrash}
        modalText="Deseja excluir o o jogo?"
        confirmAction={() => deleteJogo(toDelete)}
        cancelAction={() => setToDelete(null)}
      />
      <Table
        removeMargin
        hideTableHeaderLine
        columns={headerOptions}
        data={jogos}
      />

      <Button
        className={
          "flex justify-center w-32 gap-2 hover:scale-105 drop-shadow-md h-10 rounded-lg items-center bg-gray-700 text-gray-200 font-sans"
        }
        onClick={() =>
          navigate("/jogos/create", {
            state: {
              idCampeonato: campeonato?.id,
              nomeCampeonato: campeonato?.nome,
            },
          })
        }
      >
        <Plus />
        Novo Jogo
      </Button>
    </section>
  );
};
