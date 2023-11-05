import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import QuadraCard from "../QuadraCard/QuadraCard";
import { LeftArrow } from "../../assets/Icons/LeftArrow/LeftArrow";
import { RightArrow } from "../../assets/Icons/RightArrow/RightArrow";

export interface IQuadra {
  id: number;
  nome: string;
}
interface IQuadraSliderProps {
  quadras: { quadra?: IQuadra; create?: boolean }[];
  unidade?: number;
  reFetch: () => Promise<void>;
}

export default ({ quadras, unidade, reFetch }: IQuadraSliderProps) => {
  return (
    <div className="w-full">
      <Slider
        prevArrow={<LeftArrow />}
        nextArrow={<RightArrow />}
        className="px-20 w-full h-full rounded-2xl"
        speed={500}
        infinite
        centerPadding="0"
        slidesToShow={1}
        slidesToScroll={1}
      >
        {quadras.map(({ quadra, create }) => (
          <QuadraCard
            key={`quadra-slide-${create ? "create" : quadra!.id}`}
            quadra={quadra}
            unidade={unidade}
            create={create}
            reFetch={reFetch}
          />
        ))}
      </Slider>
    </div>
  );
};
