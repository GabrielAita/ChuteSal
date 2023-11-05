import { Thrash } from "../../assets/Icons/Thrash/Thrash";
import IconButton from "../IconButton/IconButton";
import { Text } from "../Text/Text";
import { ITime } from "./Times";

interface ITimeLineProps {
  time: ITime;
  deleteCallback: () => void;
}

export default ({ time: { id, nome }, deleteCallback }: ITimeLineProps) => {
  return (
    <div className="w-3/6 flex justify-between border-b border-b-gray-500">
      <Text size="md" className="text-white">
        {nome}
      </Text>
      <button
        className="transform hover:scale-105 transition delay-75"
        onClick={deleteCallback}
      >
        {<Thrash stroke="#066" />}
      </button>
    </div>
  );
};
