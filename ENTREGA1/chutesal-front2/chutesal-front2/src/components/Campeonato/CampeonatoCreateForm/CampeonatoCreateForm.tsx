import { Form, Formik, FormikHelpers } from "formik"
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Save } from "../../../assets/Icons/Save/Save";
import { convertToDateString } from "../../../helpers/date";
import { ICampeonato } from "../../../pages/GerenciarCampeonato/GerenciarCampeonato";
import { IUnidade } from "../../../pages/Unidades/Unidades";
import apiInstance from "../../../services/apit";
import IconButton from "../../IconButton/IconButton";
import Input from "../../Input/Input"
import Select from "../../Select/Select"
import TitleForm from "../../TitleForm/TitleForm";

interface ISubmitProps{
  nomeCampeonato: string;
  codigoUnidade: string;
  dataInicialInscricoes: string;
  dataFinalInscricoes: string;
  dataInicialJogos: string;
  dataFinalJogos: string;
  dataInicialDivulgacao: string;
  dataFinalDivulgacao: string;
}

export default () => {
  const [unidades, setUnidades] = useState<IUnidade[]>([]);
  const navigate = useNavigate();

  const fetchUnidades = async () => {
    try{
        const { data } = await apiInstance.get<IUnidade[]>(`/unidade`);
        console.log({data});
        
        setUnidades(data);
        
    }catch(e){
        console.log({e});
        toast.error(`Não foi possível buscar as unidades`)
    }
  }

  const onSubmit = async (
    {
        nomeCampeonato,
        codigoUnidade,
        dataInicialDivulgacao,
        dataInicialInscricoes,
        dataFinalInscricoes,
        dataInicialJogos,
        dataFinalJogos
    } : ISubmitProps,
    {
        setSubmitting,
    } : FormikHelpers<ISubmitProps>) => {
        try{
            
            const { status: statusCode, data } = await apiInstance.post<ICampeonato>(`/campeonato`,
            {
                nome: nomeCampeonato,
                unidadeId: codigoUnidade,
                dataInicialInscricao: convertToDateString(dataInicialInscricoes),
                dataFinalInscricao: convertToDateString(dataFinalInscricoes),
                dataInicialJogos: convertToDateString(dataInicialJogos),
                dataFinalJogos: convertToDateString(dataFinalJogos),
                inicioDivulgacao: convertToDateString(dataInicialDivulgacao) ,
                jogosId: [],
                timesId: []
            });

            console.log({data});
            
            if(statusCode === 201 && data){
              toast.success(`Campeonato cadastrado com sucesso`);
              navigate(`/campeonatos/${data.id}`)
            }
            

        }catch(e){             
            toast.error(`Não foi possível cadastrar o campeonato`);
        }
        finally{
            setSubmitting(false);
        }
    }
  

  return(
    <main className="flex flex-col gap-10 items-center h-full w-full">
        <TitleForm
            category="Campeonatos"
            subcategory={"Incluir campeonato"}
            returnRoute="/campeonatos"
        />
      <div className="flex w-4/5 justify-center h-2/5 items-center">
        <Formik
          initialValues={{
              nomeCampeonato: '',
              codigoUnidade: '',

              dataInicialInscricoes: '',
              dataFinalInscricoes: '',

              dataInicialJogos: '',
              dataFinalJogos:  '',

              dataInicialDivulgacao: '',
              dataFinalDivulgacao: ''
          }}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col items-center justify-between h-full w-full">
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col justify-center items-center w-4/5">
                <div className="flex justify-between items-center w-full">
                    <div className="w-2/5">
                      <Input
                          id="nome"
                          name="nomeCampeonato"
                          footerText="Nome do Campeonato"
                          placeholder="Nome do Campeonato"
                      />
                    </div>

                    <div  className="w-2/5">
                      <Select
                          id="codigoUnidade"
                          name="codigoUnidade"
                          label="Unidade da Escola"
                          onClick={fetchUnidades}
                          options={unidades.map(({nome, id}) => ({value: id, label: nome}))}
                      />
                    </div>

                </div>
              <div className="flex justify-between w-full">
                <div className={"flex flex-col w-3/12"}>
                  <Input
                      id="dataInicialInscricoes"
                      name="dataInicialInscricoes"
                      type="date"
                      label="Início"
                      placeholder=""
                  />
                  <Input
                      id="dataFinalInscricoes"
                      name="dataFinalInscricoes"
                      type="date"
                      label="Fim"
                      placeholder=""
                      footerText="Período de inscrições"
                  />
                </div>
                <div className={"flex flex-col w-3/12"}>
                  <Input
                      id="dataInicialJogos"
                      name="dataInicialJogos"
                      type="date"
                      label="Início"
                      placeholder=""
                  />
                  <Input
                      id="dataFinalJogos"
                      name="dataFinalJogos"
                      type="date"
                      label="Fim"
                      footerText="Período de Jogos"
                  />
                </div>
                <div className={"flex flex-col w-3/12"}>
                  <Input
                      id="dataInicialDivulgacao"
                      name="dataInicialDivulgacao"
                      type="date"
                      label="Data de divulgação"
                      footerText="Divulgação"
                      className="text-center"
                  />
                </div>
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
  )
}