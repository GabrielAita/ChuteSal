import { useEffect, useState } from "react";
import { CampeonatoNavIcon } from "../../assets/Icons/CampeonatoNavIcon/CampeonatoNavIcon";
import { InscritoNavIcon } from "../../assets/Icons/InscritoNavIcon/InscritoNavIcon";
import { JogoNavIcon } from "../../assets/Icons/JogoNavIcon/JogoNavIcon";
import { TimeNavIcon } from "../../assets/Icons/TimeNavIcon/TimeNavIcon";
import { VencedorNavIcon } from "../../assets/Icons/VencedorNavIcon/VencedorNavIcon";
import { CampeonatoMenu } from "../../components/Campeonato/CampeonatoMenu/CampeonatoMenu";
import { CampeonatoUpdateForm } from "../../components/Campeonato/CampeonatoUpdateForm/CampeonatoUpdateForm";
import "./style.css";
import {
  IInscrito,
  Inscritos,
} from "../../components/Campeonato/Inscritos/Inscritos";
import { useLocation, useParams } from "react-router-dom";
import { StatusCampeonato } from "../Campeonatos/Campeonatos";
import apiInstance from "../../services/apit";
import { toast } from "react-toastify";
import { IUnidade } from "../Unidades/Unidades";
import TitleForm from "../../components/TitleForm/TitleForm";
import Times, { ITime } from "../../components/Times/Times";
import { IJogo } from "../Jogos/Jogos";
import JogosCampeonatos from "../../components/JogosCampeonatos/JogosCampeonatos";
import {Vencedores} from "../../components/Campeonato/Vencedores/Vencedores";
import {GerenciarVencedores} from "../../components/Campeonato/Vencedores/GerenciarVencedores";

export const statusCampeonato = [
  {
    id: 0,
    stringId: "PLANEJADO",
    nome: "Planejado",
  },
  {
    id: 1,
    stringId: "ANDAMENTO",
    nome: "Em andamento",
  },
  {
    id: 2,
    stringId: "CANCELADO",
    nome: "Cancelado",
  },
  {
    id: 3,
    stringId: "EXECUTADO",
    nome: "Executado",
  },
];

export interface IMenuElement {
  element: JSX.Element;
  icon: JSX.Element;
  label?: string;
  removeTitle?: boolean;
}

export interface ICampeonato {
  id: number;
  nome: string;
  dataInicialJogos: string;
  dataFinalJogos: string;
  dataInicialInscricao: string;
  dataFinalInscricao: string;
  inicioDivulgacao: string;
  status: StatusCampeonato;
  unidade: IUnidade;
  inscritos: IInscrito[];
  times: ITime[];
  jogos: IJogo[];
  primeiroLugar: ITime;
  segundoLugar: ITime;
  terceiroLugar: ITime;
}

export function GerenciarCampeonato() {
  const { id: idCampeonato } = useParams();
  const { state } = useLocation();
  const [component, setComponent] = useState<number>(state?.selected || 1);
  const [campeonato, setCampeonato] = useState<ICampeonato>();

  function getIdade(dataNascimento: string) {
    var today = new Date();
    var birthDate = new Date(dataNascimento);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  console.log({ campeonato });

  const fetchData = async () => {
    try {
      const { data } = await apiInstance.get<ICampeonato>(
        `/campeonato/${idCampeonato}`
      );
      console.log({ data });

      const formattedInscritos = data?.inscritos?.map(
        ({ dataNascimento, ...rest }) => {
          const idade = getIdade(dataNascimento);

          return {
            ...rest,
            dataNascimento,
            idade,
          };
        }
      );
      console.log({ data });
      setCampeonato({ ...data, inscritos: formattedInscritos });
    } catch (e) {
      console.log({ e });
      toast.error(`Não foi possível carregar as informações`);
    }
  };

  const componentsOptions: { [key: number]: IMenuElement } = {
    1: {
      label: "Campeonato",
      removeTitle: true,
      icon: <CampeonatoNavIcon />,
      element: (
        <CampeonatoUpdateForm
          fetchCampeonato={fetchData}
          campeonato={campeonato}
        />
      ),
    },
    2: {
      label: "Jogos",
      icon: <JogoNavIcon />,
      element: <JogosCampeonatos campeonato={campeonato} />,
    },
    3: {
      label: "Inscritos",
      icon: <InscritoNavIcon />,
      element: (
        <Inscritos
          inscritos={campeonato?.inscritos || []}
          times={campeonato?.times || []}
          reFetch={fetchData}
        />
      ),
    },
    4: {
      label: "Times",
      icon: <TimeNavIcon />,
      element: <Times times={campeonato?.times || []} reFetch={fetchData} />,
    },
    5: {
      label: "Vencedores",
      icon: <VencedorNavIcon />,
      element: <GerenciarVencedores />,
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col px-5">
      <TitleForm
        category="Campeonatos"
        subcategory={campeonato?.nome || "Buscando campeonato"}
        underTitles={
          componentsOptions[component]?.removeTitle
            ? []
            : [componentsOptions[component]?.label]
        }
        returnRoute="/campeonatos"
      />

      <div className="flex justify-between p-6 h-full items-center">
        <CampeonatoMenu
          menuOptions={componentsOptions}
          selectedComponent={component}
          setSelected={setComponent}
        />
        {componentsOptions[component]?.element}
      </div>
    </div>
  );
}
