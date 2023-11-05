import { withFormik, Formik, Form, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Save } from "../../assets/Icons/Save/Save";
import { ICampeonato } from "../../pages/GerenciarCampeonato/GerenciarCampeonato";
import { IJogo } from "../../pages/Jogos/Jogos";
import { IUnidade } from "../../pages/Unidades/Unidades";
import apiInstance from "../../services/apit";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import Select from "../Select/Select";
import TitleForm from "../TitleForm/TitleForm";

interface ISubmitProps {
  timeA: number | undefined;
  timeB: number | undefined;
  quadraId: number | undefined;
  data: string;
  hora: string;
  placarA: number;
  placarB: number;
}

export default () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [jogo, setJogo] = useState<IJogo>();
  const [campeonato, setCampeonato] = useState<ICampeonato>({} as ICampeonato);
  const [unidade, setUnidade] = useState<IUnidade>({} as IUnidade);
  const navigate = useNavigate();
  const {} = withFormik;

  const fetchJogo = async () => {
    try {
      const { data: info } = await apiInstance.get<IJogo>(`jogo/${id}`);
      if (info) {
        const { id, horario, campeonato, quadra, placarA, placarB, times } =
          info;

        console.log({ info });
        const [data, hora] = horario.split(" ");
        const [timeA, timeB] = times;
        const formattedData: IJogo = {
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

        console.log({ formattedData });

        setJogo(formattedData);
      }
    } catch (e) {}
  };
  const fetchCampeonato = async () => {
    try {
      const { data } = await apiInstance.get(
        `campeonato/${state?.idCampeonato}`
      );

      if (data) {
        setCampeonato(data);
      }
    } catch (e) {
      toast.error("Não Foi possível buscar as informações para o cadastro");
      navigate("/campeonatos");
    }
  };

  const fetchUnidade = async () => {
    try {
      const { data } = await apiInstance.get(
        `/unidade/${campeonato.unidade.id}`
      );

      if (data) {
        setUnidade(data);
      }
    } catch (e) {
      toast.error("Não Foi possível buscar as informações para o cadastro");
      navigate("/campeonatos");
    }
  };

  const onSubmit = async (
    {
      placarA,
      placarB,
      data: date,
      hora,
      quadraId,
      timeA,
      timeB,
    }: ISubmitProps,
    { setSubmitting }: FormikHelpers<ISubmitProps>
  ) => {
    try {
      setSubmitting(true);
      if (id) {
        console.log({ timeA });
        console.log({ timeB });

        const { status: statusCode, data } = await apiInstance.put<IJogo>(
          `/jogo/${id}`,
          {
            horario: `${date} ${hora}`,
            campeonatoId: campeonato.id,
            quadraId,
            placarA,
            placarB,
            timesId: [Number(timeA), Number(timeB)],
          }
        );

        if (statusCode === 200) {
          toast.success(`Jogo alterado com sucesso`);
        }
      } else {
        const { status: statusCode, data } = await apiInstance.post<IJogo>(
          `/jogo`,
          {
            horario: `${date} ${hora}`,
            campeonatoId: campeonato.id,
            quadraId,
            placarA: 0,
            placarB: 0,
            timesId: [timeA, timeB],
          }
        );

        if (statusCode === 201 && data) {
          toast.success(`Campeonato cadastrado com sucesso`);
          navigate(`/jogos/${data.id}`, { state });
        }
      }
    } catch (e) {
      toast.error(`Um erro ocorreu durante a operação`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchCampeonato();
    fetchJogo();
  }, []);

  useEffect(() => {
    if (campeonato?.unidade?.id) fetchUnidade();
  }, [campeonato]);
  return (
    <section className="w-full h-full">
      <TitleForm
        category="Campeonatos"
        subcategory={state?.nomeCampeonato || "Jogos"}
        returnRoute={
          state?.idCampeonato
            ? `/campeonatos/${state?.idCampeonato}`
            : "/campeonatos"
        }
        underTitles={[
          ...(state?.nomeCampeonato ? ["Jogos"] : []),
          id ? "Alterar Jogo" : "Incluir Jogo",
        ]}
        navigateState={{ selected: 2 }}
      />

      <div className="flex w-full p-20 justify-center h-2/5 items-center">
        <Formik
          enableReinitialize
          initialValues={{
            placarA: jogo?.placarA || 0,
            placarB: jogo?.placarB || 0,
            timeA: jogo?.timeA?.id,
            timeB: jogo?.timeB?.id,
            data: jogo?.data || "",
            hora: jogo?.hora || "",
            quadraId: jogo?.quadra?.id,
          }}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col h-full w-3/4 gap-24">
            <div className="flex justify-between">
              <Select
                id="timeA"
                containerWidth="w-2/5"
                name="timeA"
                label="Time A"
                options={
                  campeonato?.times?.map(({ id: value, nome: label }) => ({
                    label,
                    value,
                  })) || []
                }
              />

              <Select
                id="timeB"
                name="timeB"
                containerWidth="w-2/5"
                label="Time B"
                options={
                  campeonato?.times?.map(({ id: value, nome: label }) => ({
                    label,
                    value,
                  })) || []
                }
              />
            </div>
            <div className="flex justify-between">
              <Select
                id="quadraId"
                name="quadraId"
                containerWidth="w-2/5"
                containerHeight="h-min"
                label="Quadra"
                options={
                  unidade?.quadras?.map(({ id: value, nome: label }) => ({
                    label,
                    value,
                  })) || []
                }
              />
              <div className=" flex flex-col w-2/5 gap-10">
                <div className=" flex justify-between w-full">
                  <Input
                    id="data"
                    name="data"
                    type="date"
                    footerText="Data do Jogo"
                    className="text-center"
                    containerWidth="w-2/4"
                  />

                  <Input
                    id="hora"
                    name="hora"
                    type="time"
                    footerText="Horário do Jogo"
                    className="text-center"
                    containerWidth="w-1/4"
                  />
                </div>
                {id ? (
                  <div className="flex w-full">
                    <Input
                      id="placarA"
                      name="placarA"
                      type="number"
                      min={0}
                      className="text-center"
                      footerText="Placar A"
                      containerWidth="w-2/4"
                    />
                    <Input
                      id="placarB"
                      name="placarB"
                      min={0}
                      className="text-center"
                      type="number"
                      footerText="Placar B"
                      containerWidth="w-2/4"
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <IconButton
                className="p-2"
                type="submit"
                IconElement={Save}
                text={id ? "Alterar" : "Incluir"}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};
