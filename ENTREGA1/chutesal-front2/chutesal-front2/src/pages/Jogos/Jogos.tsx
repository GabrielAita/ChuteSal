import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiInstance from "../../services/apit";
import Table, { IColumnOption } from "../../components/Table/Table";
import { ITime } from "../../components/Times/Times";
import { ICampeonato } from "../GerenciarCampeonato/GerenciarCampeonato";
import { Text } from "../../components/Text/Text";
import { convertToDateString } from "../../helpers/date";
import { clsx } from "clsx";
import { IQuadra } from "../../components/QuadraSlider/QuadraSlider";

export interface IJogo {
  id: number;
  horario: string;
  data: string;
  hora: string;
  timeA: ITime;
  timeB: ITime;
  placarA: number;
  placarB: number;
  campeonato: ICampeonato;
  quadra: IQuadra;
  times: ITime[];
}

interface JogosProps {
  className?: string;
  campeonatoId?: number | string;
  headerOptionsPerso?: IColumnOption<IJogo>[];
}

export function Jogos({
  className,
  campeonatoId,
  headerOptionsPerso,
}: JogosProps) {
  const [jogos, setJogos] = useState<IJogo[]>([]);

  const fetchData = async () => {
    try {
      let info;
      const { data } = await apiInstance.get<IJogo[]>(`/jogo`);
      info = data;
      if (campeonatoId) {
        const { data } = await apiInstance.get<ICampeonato>(
          `/campeonato/${campeonatoId}`
        );
        info = data?.jogos || [];
      }
      console.log({ info });

      const formattedData: IJogo[] = info?.map(
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
      transformCell: ({ value }) => (
        <Text className={"text-white"}>
          {convertToDateString(value)?.replaceAll("-", "/")}
        </Text>
      ),
      id: "data",
    },
    {
      displayName: "Horario",
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
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main
      className={clsx(
        "flex flex-col items-center h-full my-12 mx-8",
        className
      )}
    >
      <Table
        columns={headerOptionsPerso ? headerOptionsPerso : headerOptions}
        data={jogos}
      />
    </main>
  );
}
