import {Heading} from "../../Heading/Heading";
import {TrophyFirstIcon} from "../../../assets/Icons/Trophy/TrophyFirst";
import {TrophySecondIcon} from "../../../assets/Icons/Trophy/TrophySecond";
import {TrophyThirdIcon} from "../../../assets/Icons/Trophy/TrophyThird";
import {Form, Formik} from "formik";
import Input from "../../Input/Input";
import {toast} from "react-toastify";
import apiInstance from "../../../services/apit";
import {ICampeonato} from "../../../pages/GerenciarCampeonato/GerenciarCampeonato";
import {ITime} from "../../Times/Times";
import {useEffect, useState} from "react";

interface VencedoresProps {
    campeonatoId: string | undefined;
}

interface Vencedores {
    primeiroLugar: ITime | undefined | null;
    segundoLugar: ITime | undefined | null;
    terceiroLugar: ITime | undefined | null;
}

export function Vencedores({campeonatoId}: VencedoresProps) {
    const [vencedores, setVencedores] = useState<Vencedores>();

    const fetchData = async () => {
        try {
            const { data } = await apiInstance.get<ICampeonato>(`/campeonato/${campeonatoId}`)
            console.log(data);

            const primeiroLugar = data.primeiroLugar;
            const segundoLugar = data.segundoLugar;
            const terceiroLugar = data.terceiroLugar;

            const vencedores: Vencedores = {
                primeiroLugar,
                segundoLugar,
                terceiroLugar
            }

            setVencedores(vencedores);

            return vencedores;
        } catch(e) {
            console.log(e);
            toast.error(`Não foi possível buscar o campeonato`)
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <section className={"w-4/6"}>
            <Formik initialValues={
                {
                    v1: "Julio",
                    v2: "Erick",
                    v3: "Guilherme"
                }
            } onSubmit={() => {}}>
                <Form>
                    <div className={"flex items-center py-12"}>
                        <div className={"flex gap-3 items-center"}>
                            <Heading className={"text-gray-200 font-normal"} size={"md"}>1</Heading>
                            <TrophyFirstIcon />
                        </div>
                        <Input
                            id={"v1"}
                            name={"v1"}
                            footerText={"Primeiro lugar"}
                            disabled={true}
                            disabledColor={"text-white"}
                        />
                    </div>
                    <div className={"flex items-center py-12"}>
                        <div className={"flex gap-3 items-center"}>
                            <Heading className={"text-gray-200 font-normal"} size={"md"}>2</Heading>
                            <TrophySecondIcon />
                        </div>
                        <Input
                            id={"v2"}
                            name={"v2"}
                            footerText={"Segundo Lugar"}
                            disabled={true}
                            disabledColor={"text-white"}
                        />
                    </div>
                    <div className={"flex items-center py-12"}>
                        <div className={"flex gap-3 items-center"}>
                            <Heading className={"text-gray-200 font-normal"} size={"md"}>3</Heading>
                            <TrophyThirdIcon />
                        </div>
                        <Input
                            id={"v3"}
                            name={"v3"}
                            footerText={"Terceiro Lugar"}
                            disabled={true}
                            disabledColor={"text-white"}
                        />
                    </div>
                </Form>
            </Formik>
        </section>
    );
}
