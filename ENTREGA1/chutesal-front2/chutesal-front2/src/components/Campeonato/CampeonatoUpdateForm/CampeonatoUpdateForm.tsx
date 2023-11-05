import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {  StatusCampeonato } from "../../../pages/Campeonatos/Campeonatos";
import apiInstance from "../../../services/apit";
import Input from "../../Input/Input";
import Select from "../../Select/Select";
import ReactLoading from 'react-loading';
import { convertToDateString } from "../../../helpers/date";
import { IUnidade } from "../../../pages/Unidades/Unidades";
import { ICampeonato, statusCampeonato } from "../../../pages/GerenciarCampeonato/GerenciarCampeonato";


interface ICampeonatoFormProps{
    campeonato: ICampeonato | undefined
    fetchCampeonato : () => Promise<void>
}

interface ISubmitProps{
    nomeCampeonato: string;
    codigoUnidade: number;
    statusCampeonato: StatusCampeonato;
    dataInicialInscricoes: string;
    dataFinalInscricoes: string;
    dataInicialJogos: string;
    dataFinalJogos: string;
    dataInicialDivulgacao: string;
    dataFinalDivulgacao: string;
}

export function CampeonatoUpdateForm({ campeonato, fetchCampeonato }: ICampeonatoFormProps) {
    const [unidades, setUnidades] = useState<IUnidade[]>([]);

    const onSubmit = async (
    {
        nomeCampeonato,
        statusCampeonato,
        codigoUnidade,
        dataInicialDivulgacao,
        dataInicialInscricoes,
        dataFinalInscricoes,
        dataInicialJogos,
        dataFinalJogos
    } : ISubmitProps,
    {
        setSubmitting,
        resetForm
    } : FormikHelpers<ISubmitProps>) => {
        try{

            const ii = convertToDateString(dataInicialDivulgacao)
            console.log({ii});
            
            const { status: statusCode, data } = await apiInstance.put(`/campeonato/${campeonato?.id}`,
            {
                nome: nomeCampeonato,
                status: statusCampeonato,
                dataInicialInscricao: convertToDateString(dataInicialInscricoes),
                dataFinalInscricao: convertToDateString(dataFinalInscricoes),
                dataInicialJogos: convertToDateString(dataInicialJogos),
                dataFinalJogos: convertToDateString(dataFinalJogos),
                inicioDivulgacao: ii ,
                jogosId: [],
                timesId: [],
                inscritosId: []
            });

            if(statusCode === 200){
                fetchCampeonato();
                toast.success(`Alterações salvas com sucesso`);
            }
            

        }catch(e){  
            console.log(e);
                       
            toast.error(`Não foi possível salvar as alterações`);
        }
        finally{
            setSubmitting(false);
        }
    }
    
    
    

    const convertToDatePickerFormat = (dateString: string) => {
        if(!dateString) return

        const [day, month, year] = dateString.split('-')

        const date = new Date(Number(year),Number(month) - 1,Number(day));
        console.log({date});
        
        const [dateFormmated, time] = date?.toISOString().split('T')

        console.log({dateFormmated});
        
        return dateFormmated
    }

    

    useEffect(() => {
    },[]);
    return (
        <div className="w-4/5 h-full">

            {
                campeonato  ?
                (<Formik
                    initialValues={{
                        nomeCampeonato: campeonato?.nome || '',
                        codigoUnidade:  campeonato?.unidade?.id,
                        statusCampeonato: campeonato?.status || '',

                        dataInicialInscricoes: convertToDatePickerFormat(campeonato?.dataInicialInscricao) || '',
                        dataFinalInscricoes: convertToDatePickerFormat(campeonato?.dataFinalInscricao) || '',

                        dataInicialJogos: convertToDatePickerFormat(campeonato?.dataInicialJogos) || '',
                        dataFinalJogos:  convertToDatePickerFormat(campeonato?.dataFinalJogos) || '',

                        dataInicialDivulgacao: convertToDatePickerFormat(campeonato?.inicioDivulgacao) || '',
                        dataFinalDivulgacao: ''
                    }}
                    onSubmit={onSubmit}
                >
                    <Form id="form-campeonato" className="flex flex-col items-center justify-between h-full">
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col gap-5 w-2/5">
                                <Input
                                    id="nome"
                                    name="nomeCampeonato"
                                    footerText="Nome do Campeonato"
                                    placeholder=""
                                />
                                <Select
                                    id="codigoUnidade"
                                    name="codigoUnidade"
                                    label="Unidade da Escola"
                                    disabled
                                    options={[{value: campeonato?.unidade?.id, label: campeonato?.unidade?.nome}]}
                                />
                                <Select
                                    id="statusCampeonato"
                                    name="statusCampeonato"
                                    label="Status"
                                    options={statusCampeonato.map(({id, stringId, nome})=>({value: stringId, label: nome}))}
                                />
                            </div>
                            <div className="flex flex-col gap-5 w-2/5">
                                <div className={"flex"}>
                                    <Input
                                        id="dataInicialInscricoes"
                                        name="dataInicialInscricoes"
                                        type="date"
                                        footerText="Inscrições"
                                        placeholder=""
                                    />
                                    <Input
                                        id="dataFinalInscricoes"
                                        name="dataFinalInscricoes"
                                        type="date"
                                        footerText="Inscrições"
                                        placeholder=""
                                    />
                                </div>
                                <div className={"flex"}>
                                    <Input
                                        id="dataInicialJogos"
                                        name="dataInicialJogos"
                                        type="date"
                                        footerText="Jogos"
                                        placeholder=""
                                    />
                                    <Input
                                        id="dataFinalJogos"
                                        name="dataFinalJogos"
                                        type="date"
                                        footerText="Jogos"
                                        placeholder=""
                                    />
                                </div>
                                <div className={"flex"}>
                                    <Input
                                        id="dataInicialDivulgacao"
                                        name="dataInicialDivulgacao"
                                        type="date"
                                        footerText="Divulgação"
                                        placeholder=""
                                        disabled
                                        className="text-center"
                                    />
                                    {/* <Input
                                        id="dataFinalDivulgacao"
                                        name="dataFinalDivulgacao"
                                        type="date"
                                        label="Divulgação"
                                        placeholder=""
                                    /> */}
                                </div>
                            </div>  
                        </div>
                    </Form>
                </Formik>) :
                <div className="flex h-full gap-1 justify-center items-center flex-col"><ReactLoading color="#006666" type="spin"/><span className="text-white text-xs">Carregando informações...</span></div>
            }

                
        </div>     
    );
}
