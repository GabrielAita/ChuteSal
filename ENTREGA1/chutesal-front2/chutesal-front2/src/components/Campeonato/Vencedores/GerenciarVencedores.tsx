import {Form, Formik} from "formik";
import {Heading} from "../../Heading/Heading";
import {TrophyFirstIcon} from "../../../assets/Icons/Trophy/TrophyFirst";
import {TrophySecondIcon} from "../../../assets/Icons/Trophy/TrophySecond";
import {TrophyThirdIcon} from "../../../assets/Icons/Trophy/TrophyThird";
import Select from "../../Select/Select";

export function GerenciarVencedores() {
    return (
        <section className={"flex w-full h-full justify-center items-center"}>
            <Formik initialValues={
                {
                    v1: "",
                    v2: "",
                    v3: ""
                }
            } onSubmit={() => {}}>
                <Form className={"w-2/6"}>
                    <div className={"flex items-center py-12"}>
                        <div className={"flex gap-3 items-center"}>
                            <Heading className={"text-gray-200 font-normal"} size={"md"}>1</Heading>
                            <TrophyFirstIcon />
                        </div>
                        <Select
                            id="primeiroLugar"
                            containerWidth="w-full"
                            name="primeiroLugar"
                            label="Primeiro Lugar"
                            options={[]}
                        />
                    </div>
                    <div className={"flex items-center py-12"}>
                        <div className={"flex gap-3 items-center"}>
                            <Heading className={"text-gray-200 font-normal"} size={"md"}>2</Heading>
                            <TrophySecondIcon />
                        </div>
                        <Select
                            id="segundoLugar"
                            containerWidth="w-full"
                            name="segundoLugar"
                            label="Segundo Lugar"
                            options={[]}
                        />
                    </div>
                    <div className={"flex items-center py-12"}>
                        <div className={"flex gap-3 items-center"}>
                            <Heading className={"text-gray-200 font-normal"} size={"md"}>3</Heading>
                            <TrophyThirdIcon />
                        </div>
                        <Select
                            id="terceiroLugar"
                            containerWidth="w-full"
                            name="terceiroLugar"
                            label="Terceiro Lugar"
                            options={[]}
                        />
                    </div>
                </Form>
            </Formik>
        </section>
    );
}
