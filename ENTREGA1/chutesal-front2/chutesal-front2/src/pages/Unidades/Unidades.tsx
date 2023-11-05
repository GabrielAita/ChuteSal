import { Button } from "../../components/Button/Button";
import { Plus } from "../../assets/Icons/Plus/Plus";
import { Filter } from "../../components/Filter/Filter";
import { Options } from "../../components/Options/Options";
import Table, { IColumnOption } from "../../components/Table/Table";
import { useEffect, useState } from "react";
import apiInstance from "../../services/apit";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";
import { Thrash } from "../../assets/Icons/Thrash/Thrash";
import { useNavigate } from "react-router-dom";

interface IEndereco {
  cep: string;
  numero: number;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface IUnidade {
  id: number;
  numero: number;
  nome: string;
  endereco: IEndereco;
  quadras: any[];
}

interface IData {
  id: number;
  numero: number;
  nome: string;
  endereco: string;
}

export function Unidades() {
  const [unidades, setUnidades] = useState<IData[]>([]);
  const [toDelete, setToDelete] = useState<number | null>(null);
  const navigate = useNavigate();
  const deleteUnidade = async (id: any) => {
    try {
      const { status, data } = await apiInstance.delete(`/unidade/${id}`);

      if (status === 200) {
        toast.success(`Unidade apagado com sucesso`);
        fetchData();
      }
    } catch (e) {
      console.log(e);
      toast.error(`Não foi possível apagar a unidade`);
    } finally {
      setToDelete(null);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await apiInstance.get<IUnidade[]>(`/unidade`);
      console.log({ data });

      const formattedData = data?.map(
        ({ id, endereco: { logradouro: endereco }, nome, numero }) => {
          return {
            id,
            nome,
            numero,
            endereco,
          } as IData;
        }
      );
      setUnidades(formattedData);
    } catch (e) {
      toast.error(`Não foi possível buscar as unidades`);
    }
  };

  const headerOptions: IColumnOption[] = [
    {
      displayName: "Número",
      valueKey: "numero",
      id: "numero",
    },
    {
      displayName: "Nome",
      valueKey: "nome",
      id: "nome",
    },
    {
      displayName: "Endereço",
      valueKey: "endereco",
      id: "endereco",
    },
    {
      displayName: "Opções",
      id: "opcoes",
      type: "action",
      valueKey: "id",
      transformCell: ({ value: id }) => (
        <Options
          editCallback={() => {
            navigate(`${id}`);
          }}
          deleteCallback={() => setToDelete(id)}
        />
      ),
    },
  ];

  const filterOptions = ["Número", "Nome"];

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Modal
        open={toDelete !== null}
        Icon={Thrash}
        modalText="Deseja apagar a unidade?"
        confirmAction={() => deleteUnidade(toDelete)}
        cancelAction={() => setToDelete(null)}
      />
      <main className={"flex flex-col items-center h-full my-12 mx-8"}>
        <div className={"flex w-full justify-between"}>
          <Button
            onClick={() => navigate("create")}
            className={
              "flex justify-around w-24 hover:scale-105 drop-shadow-md h-10 rounded-lg items-center bg-gray-700 text-gray-200 font-sans"
            }
          >
            <Plus />
            Incluir
          </Button>
        </div>
        <Table columns={headerOptions} data={unidades} />
      </main>
    </>
  );
}
