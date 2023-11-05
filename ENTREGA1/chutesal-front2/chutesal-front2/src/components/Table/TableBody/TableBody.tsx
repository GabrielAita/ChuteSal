import { Text } from "../../Text/Text";
import { IColumnOption } from "../Table";

interface ITableBodyProps 
{
    columns : IColumnOption[],
    data: any[]
}

export function TableBody({columns, data} : ITableBodyProps) {
    return (
        <div className={"flex flex-col w-full gap-3 pt-3"}>
            {data.map((dataObject, index) => (
                <ul key={`${index}-sakdjsa`} className={"flex w-full justify-around"}>
                    {
                        columns.map(({transformCell, type, valueKey, id, width }, index) => {

                            const cellValue = dataObject[valueKey || '']

                            return (
                                <li key={`${id}-${index}`} className={`flex justify-center ${width || "w-72"}`}>
                                   {type === "action" ? transformCell!({value: cellValue, rowObject: dataObject}) : (transformCell ? transformCell({value: cellValue, rowObject: dataObject}) : <Text className={"flex justify-center items-center text-white"}>{cellValue}</Text>) }
                                </li>
                            )
                        })
                    }
                </ul>
            ))}
        </div>
    );
}
