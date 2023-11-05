import {Logo} from "../../assets/Icons/Logo/Logo";
import {Heading} from "../../components/Heading/Heading";
import {Text} from "../../components/Text/Text";
import {Button} from "../../components/Button/Button";
import { TextInput } from "../../components/TextInput/TextInput";
import {Envelope, Lock} from "phosphor-react";

export function Login() {
    return (
        <div className={"w-screen h-screen flex flex-col items-center justify-center text-gray-100"}>
            <header className={"flex flex-col items-center"}>
                <Logo width={160} height={160} />
                <Heading size={"lg"} className={"mt-4"}>
                    ChuteSal
                </Heading>

                <Text size={"lg"} className={"text-gray-500 mt-1"}>Faça login e administre os campeonatos!</Text>
            </header>
            <form className={"flex flex-col gap-4 items-stretch w-full max-w-sm mt-10"}>
                <label htmlFor={"email"} className={"flex flex-col gap-3"}>
                    <Text className={"text-white font-semibold"} size={"md"}>Endereço de e-mail</Text>
                    <TextInput.Root >
                        <TextInput.Icon>
                            <Envelope />
                        </TextInput.Icon>
                        <TextInput.Input type={"email"} id={"email"} placeholder={"Digite seu e-mail"} />
                    </TextInput.Root>
                </label>
                <label htmlFor={"email"} className={"flex flex-col gap-3"}>
                    <Text className={"text-white font-semibold"} size={"md"}>Sua senha</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                            <Lock />
                        </TextInput.Icon>
                        <TextInput.Input type={"password"} id={"password"} placeholder={"********"} />
                    </TextInput.Root>
                </label>
                <Button type={"submit"} className={"bg-green-700 h-10 mt-4"}>Entrar na plataforma</Button>
            </form>
        </div>
    );
}
