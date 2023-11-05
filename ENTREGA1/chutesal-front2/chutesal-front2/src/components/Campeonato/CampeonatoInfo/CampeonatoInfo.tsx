import TitleForm from "../../TitleForm/TitleForm";
import {IJogo, Jogos} from "../../../pages/Jogos/Jogos";
import {Heading} from "../../Heading/Heading";
import {useParams} from "react-router-dom";
import {Vencedores} from "../Vencedores/Vencedores";
import {IColumnOption} from "../../Table/Table";
import {Text} from "../../Text/Text";
import {convertToDateString} from "../../../helpers/date";

export function CampeonatoInfo() {
    const { id: idCampeonato } = useParams();

    const headerOptions : IColumnOption<IJogo>[] = [
        {
            displayName: "Time A",
            valueKey: "timeA",
            transformCell: ({value}) => (<Text className={"text-white"}>{value?.nome || ""}</Text>),
            id: "timeA",
            width: "w-96"
        },
        {
            displayName: "Time B",
            valueKey: "timeB",
            transformCell: ({value}) => (<Text className={"text-white"}>{value?.nome || ""}</Text>),
            id: "timeB",
            width: "w-96"
        },
        {
            displayName: "Placar A x B",
            valueKey: "placarA",
            transformCell: ({rowObject: {placarA, placarB}}) => (<Text className={"text-white"}>{placarA} x {placarB}</Text>),
            id: "placar",
            width: "w-44"
        },
        {
            displayName: "Data",
            valueKey: "data",
            transformCell: ({value}) => (<Text className={"text-white"}>{convertToDateString(value)?.replaceAll("-", "/")}</Text>),
            id: "data",
            width: "w-44"
        },
        {
            displayName: "Horario",
            valueKey: "hora",
            id: "hora",
            width: "w-44"
        },
        {
            displayName: "Quadra",
            valueKey: "quadra",
            transformCell: ({value}) => (<Text className={"text-white"}>{value?.nome || ""}</Text>),
            id: "quadra",
            width: "w-44"
        }
    ]

    return (
        <main className="flex flex-col gap-10 items-center h-full w-full">
            <TitleForm
                category="Campeonatos"
                subcategory={"Copa Mackenzie"}
                returnRoute="/campeonatos"
            />
            <div className={"flex flex-row w-full px-20 gap-x-32"}>
                <div className={"flex flex-col w-8/12"}>
                    <Heading className={"text-gray-200 font-normal mx-8"} size={"sm"}>Jogos do Campeonato</Heading>
                    <Jogos className={"my-0"} campeonatoId={idCampeonato} headerOptionsPerso={headerOptions} />
                </div>
                <div className={"flex flex-col w-4/12"}>
                    <Heading className={"text-gray-200 font-normal"} size={"sm"}>Classificação</Heading>
                    <Vencedores campeonatoId={idCampeonato} />
                </div>
            </div>
        </main>
    );
}
