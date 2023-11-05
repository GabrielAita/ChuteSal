import {Button} from "../../Button/Button";
import {UserIcon} from "../../../assets/Icons/UserIcon/UserIcon";

interface InscreverSeButtonProps {
    inscrevaSeCallback: () => void;
}

export function InscreverSeButton({inscrevaSeCallback}: InscreverSeButtonProps) {
    return (
        <div>
            <Button className={"flex bg-transparent items-center gap-1 text-white font-normal font-sans"}>
                <UserIcon />
                Inscreva-se
            </Button>
        </div>
    );
}
