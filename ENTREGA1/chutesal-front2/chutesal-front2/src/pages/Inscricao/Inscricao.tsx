import { InscreverSeForm } from "../../components/InscreverSe/InscreverSeForm/InscreverSeForm";
import { Button } from "../../components/Button/Button";
import { Back } from "../../assets/Icons/Back/Back";
import { Text } from "../../components/Text/Text";
import TitleForm from "../../components/TitleForm/TitleForm";

export function Inscricao() {
  return (
    <main className={"flex flex-col h-full"}>
      <TitleForm
        category="Campeonatos"
        subcategory="Inscrição"
        returnRoute="/campeonatos"
      />
      <div className={"flex justify-center items-center h-full w-full"}>
        <InscreverSeForm />
      </div>
    </main>
  );
}
