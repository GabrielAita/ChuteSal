import { TableBody } from "./TableBody/TableBody";
import { Header } from "./TableHeader/TableHeader";

type ColumnType = "value" | "action";

type ColumnWidth = "w-12" | "w-44" | "w-96";

interface ITransformProps<T> {
  value?: any;
  rowObject: T;
}
export interface IColumnOption<T = any> {
  displayName: string;
  valueKey?: string;
  className?: string;
  width?: ColumnWidth;
  transformCell?: ({ value, rowObject }: ITransformProps<T>) => any;
  type?: ColumnType;
  id: string;
}

interface ITableProps {
  columns: IColumnOption[];
  data: any[];
  hideTableHeaderLine?: boolean;
  removeMargin?: boolean;
}

const Table = ({
  columns,
  data,
  hideTableHeaderLine,
  removeMargin,
}: ITableProps) => {
  return (
    <div className={`w-full h-full ${removeMargin ? "" : "mt-10"}`}>
      <Header columns={columns}></Header>
      <div
        className={`flex flex-col ${
          hideTableHeaderLine ? "" : "border-t-[1px] border-green-700"
        } w-full h-full  items-center`}
      >
        <TableBody columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Table;
