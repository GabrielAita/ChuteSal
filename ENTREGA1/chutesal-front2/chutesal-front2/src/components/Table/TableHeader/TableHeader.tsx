import { Text } from "../../Text/Text";
import { IColumnOption } from "../Table";

interface HeaderProps {
    columns: IColumnOption[];
}

export function Header({ columns }: HeaderProps) {
    return (
        <ul className={"flex justify-around"}>
            {columns.map(({displayName, width, className}, index) => (
                <li key={index} className={`flex ${width || "w-72"}  ${className ? className : ""} justify-center   `}>
                    <Text className={"text-gray-200"}>{displayName}</Text>
                </li>
            ))}
        </ul>
    );
}
