import { Edit } from "../../assets/Icons/Edit/Edit";
import { Thrash } from "../../assets/Icons/Thrash/Thrash";

interface IOptionsProps{
    editCallback?: () => void;
    deleteCallback: () => void;
    stroke?: string;
}

export function Options({editCallback, deleteCallback, stroke} : IOptionsProps) {
    return (
        <div className={"flex gap-2"}>
            {editCallback ? <button onClick={editCallback}><Edit /></button> : ""}
            <button onClick={deleteCallback}>
                {stroke ? <Thrash stroke={stroke} /> : <Thrash />}
            </button>
        </div>
    );
}
