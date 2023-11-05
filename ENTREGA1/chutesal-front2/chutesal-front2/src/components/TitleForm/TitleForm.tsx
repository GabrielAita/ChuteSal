import { useNavigate } from "react-router-dom";
import { LeftArrow } from "../../assets/Icons/LeftArrow/LeftArrow";
import { RightArrow } from "../../assets/Icons/RightArrow/RightArrow";
import IconButton from "../IconButton/IconButton";

interface ITitleProps {
  category: string;
  subcategory: string;
  underTitles?: (string | undefined)[];
  returnRoute: string;
  navigateState?: any;
}

interface IBoxProps {
  text: string;
  removeArrow?: boolean;
}

const TitleBox = ({ text, removeArrow }: IBoxProps) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-gray-500 text-md">{text}</p>
      {!removeArrow && <RightArrow width={20} height={20} stroke={"#545454"} />}
    </div>
  );
};

export default ({
  category,
  subcategory,
  underTitles,
  returnRoute,
  navigateState,
}: ITitleProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-4 justify-between h-28 px-5 w-full">
      <div className="flex items-center gap-2 h-full">
        <TitleBox text={category} />
        <TitleBox
          text={subcategory}
          removeArrow={(underTitles?.length || 0) === 0}
        />
        {underTitles?.map((title, i) => (
          <TitleBox
            key={`${title || "title"}-${i}`}
            text={title!}
            removeArrow={i + 1 === underTitles.length}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full">
        <IconButton
          text="Voltar"
          width="w-24"
          IconElement={LeftArrow}
          action={() => navigate(returnRoute, { state: navigateState })}
        />
        <span className="h-[0.5px] w-full bg-green-700" />
      </div>
    </div>
  );
};
