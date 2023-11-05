import { Button } from "../../components/Button/Button";
import { Plus } from "../../assets/Icons/Plus/Plus";
import { Options } from "../../components/Options/Options";
import Table, { IColumnOption } from "../../components/Table/Table";
import { useEffect, useState } from "react";
import apiInstance from "../../services/apit";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";
import { Thrash } from '../../assets/Icons/Thrash/Thrash'
import {Link, useNavigate} from "react-router-dom";
import { convertToDate } from "../../helpers/date";
import IconButton from "../../components/IconButton/IconButton";
import { UserSignIn } from "../../assets/Icons/UserSignIn/UserSignIn";
import { DisabledCalendar } from "../../assets/Icons/DisabledCalendar/DisabledCalendar";
import { useLogin } from "../../hooks/useLogin";
import { ICampeonato } from "../GerenciarCampeonato/GerenciarCampeonato";
import {Text} from "../../components/Text/Text";


export type  StatusCampeonato = "PLANEJADO"  | "ANDAMENTO" | "CANCELADO" | "EXECUTADO"

interface IUnidade {
    id: number;
    nome: string;
}

export interface IData {
    id: number;
    nome: string;
    status: StatusCampeonato;
    unidade: string;
    inscricoes: string;
    dataInicialInscricao: Date;
    dataFinalInscricao: Date;
    duracao: string;
}

export function Campeonatos() {
    const {logado} = useLogin();

    const [campeonatos, setCampeonatos] = useState<IData[]>([]);
    const [toDelete, setToDelete] = useState<number | null>(null);
    const navigate = useNavigate();
    const deleteCampeonato = async (id : any) => {
        try{
            const { status, data } = await apiInstance.delete(`/campeonato/${id}`)

            if(status === 200) {
                toast.success(`Campeonato apagado com sucesso`)
                fetchData()
            }
        } catch(e) {
            console.log(e);
            toast.error(`Não foi possível apagar o campeonato`)
        } finally {
            setToDelete(null);
        }

    }

    const fetchData = async () => {
        try{
            const { data } = await apiInstance.get<ICampeonato[]>(`/campeonato`);
            console.log({data});
            
            const formattedData : IData[] = data?.map(({
                id,
                nome,
                dataInicialInscricao,
                dataFinalInscricao,
                dataInicialJogos,
                dataFinalJogos,
                status,
                unidade: { nome : unidade }
            }) =>{
                return ({
                    id,
                    nome,
                    status,
                    unidade,
                    inscricoes: `${dataInicialInscricao?.replace(/-/g,"/")} - ${dataFinalInscricao?.replace(/-/g,"/")}`,
                    dataInicialInscricao: convertToDate(dataInicialInscricao),
                    dataFinalInscricao: convertToDate(dataFinalInscricao),
                    duracao: `${dataInicialJogos?.replace(/-/g,"/")} - ${dataFinalJogos?.replace(/-/g,"/")}`,
                }) as IData;
            }); 

            setCampeonatos(formattedData);
        }catch(e){
            console.log({e});
            
            toast.error(`Não foi possível buscar os campeonatos`)
        }
    }

    const headerOptions : IColumnOption<IData>[] = [          
        {
            displayName: "Nome",
            valueKey: "nome",
            transformCell: ({value, rowObject: {id}}) => (<Link to={`infos/${id}`}><Text className={"text-white border-b-white border-b-[1px]"}>{value || ""}</Text></Link>),
            id: "nome",
            className: "justify-start"
        },
        {
            displayName: "Status",
            valueKey: "status",
            id: "status",
        },
        {
            displayName: "Unidade",
            valueKey: "unidade",
            id: "nomeUnidade",
        },
        {
            displayName: "Inscrições",
            valueKey: "inscricoes",
            id: "inscricoes",
        },
        {
            displayName: "Duração",
            valueKey: "duracao",
            id: "duracao",
        },
        {
            displayName: "Opções",
            type: "action",
            valueKey: "id",
            transformCell: ({value: id, rowObject: { dataInicialInscricao, dataFinalInscricao }}) => 
            {
                const now = new Date();
                const inscricaoDisponivel = dataInicialInscricao < now && now < dataFinalInscricao;
                return ( logado ?
                    <Options
                        editCallback={() => navigate(`${id}`)} 
                        deleteCallback={() => setToDelete(id)}
                    /> :
                    <IconButton
                        text={inscricaoDisponivel ? "Inscreva-se" : "Indisponível"}
                        IconElement={inscricaoDisponivel ? UserSignIn : DisabledCalendar}
                        disabled={!inscricaoDisponivel}
                        transparent={true}
                        action={inscricaoDisponivel ? () => navigate(`${id}/inscricao`) : () =>{}}
                    />)
                },
            id: "opcoes",
        },     
    ];

    useEffect(() => {
        fetchData();
    },[])

    const justify = logado ? "justify-between" : "justify-end";

    return (
        <>
            <Modal
                open={toDelete !== null}
                Icon={Thrash}
                modalText="Deseja apagar o campeonato?"
                confirmAction={() => deleteCampeonato(toDelete)}
                cancelAction={() => setToDelete(null)}
            />

            <main className={"flex flex-col items-center h-full my-12 mx-8"}>
                <div className={`flex w-full ${justify}`}>
                    {logado ?
                        <Button onClick={() => navigate("create")} className={"flex justify-around w-24 hover:scale-105 drop-shadow-md h-10 rounded-lg items-center bg-gray-700 text-gray-200 font-sans"}>
                            <Plus />
                            Incluir
                        </Button>
                        :
                        ""
                    }
                </div>
                <Table
                    columns={headerOptions}
                    data={campeonatos}
                />
            </main>
        </>
    );
}
