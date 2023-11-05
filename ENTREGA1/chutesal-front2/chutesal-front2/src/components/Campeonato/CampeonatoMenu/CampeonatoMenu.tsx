import { Button } from "../../Button/Button";
import { Text } from "../../Text/Text";
import { Thrash } from "../../../assets/Icons/Thrash/Thrash";
import { Save } from "../../../assets/Icons/Save/Save";
import { IMenuElement } from "../../../pages/GerenciarCampeonato/GerenciarCampeonato";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import apiInstance from "../../../services/apit";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

interface IMenuProps {
  menuOptions: { [key: number]: IMenuElement };
  selectedComponent: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

export function CampeonatoMenu({
  menuOptions,
  selectedComponent,
  setSelected,
}: IMenuProps) {
  const [toDelete, setToDelete] = useState<number | string | null>(null);
  const navigate = useNavigate();
  const { id: idCampeonato } = useParams();

  const deleteCampeonato = async (id: any) => {
    try {
      const { status, data } = await apiInstance.delete(`/campeonato/${id}`);

      if (status === 200) {
        toast.success(`Campeonato apagado com sucesso`);
        navigate("/campeonatos");
      }
    } catch (e) {
      console.log(e);
      toast.error(`Não foi possível apagar o campeonato`);
    } finally {
      setToDelete(null);
    }
  };

  return (
    <>
      <Modal
        open={toDelete !== null}
        Icon={Thrash}
        modalText="Deseja apagar o campeonato?"
        confirmAction={() => deleteCampeonato(toDelete)}
        cancelAction={() => setToDelete(null)}
      />
      <nav className={"flex flex-col items-center gap-10 h-full"}>
        <div>
          <ul>
            {Object.keys(menuOptions).map((key, index) => {
              const { icon, label } = menuOptions[Number(key)];
              const selected = label === menuOptions[selectedComponent].label;
              return (
                <li key={index} className={"p-6"}>
                  <div
                    onClick={() => setSelected(Number(key))}
                    className={`flex cursor-pointer select-none  items-center gap-2 hover:scale-105 ${
                      selected ? "optionSelected" : ""
                    }`}
                  >
                    {icon}
                    <Text
                      className={` ${
                        selected ? "optionSelected" : "text-gray-200"
                      }`}
                    >
                      {label}
                    </Text>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-center items-center h-full w-full px-6">
          <span className="h-[0.5px] w-full bg-gray-400" />
        </div>
        <div className={"flex flex-col gap-10"}>
          <Button
            form="form-campeonato"
            className={
              "flex justify-around items-center w-28 transition duration-150 hover:scale-105 drop-shadow-md bg-gray-700 text-gray-200 text-lg font-normal font-sans"
            }
          >
            <Save />
            Salvar
          </Button>
          <Button
            className={
              "flex justify-around items-center w-28 transition duration-150 hover:scale-105 drop-shadow-md bg-gray-700 text-gray-200 text-lg font-normal font-sans "
            }
            onClick={() => setToDelete(idCampeonato || null)}
          >
            <Thrash />
            Excluir
          </Button>
        </div>
      </nav>
    </>
  );
}
