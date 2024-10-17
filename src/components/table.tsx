import { MdModeEdit, MdRemoveRedEye, MdDelete } from "react-icons/md";
import { IInventory } from "../types/productType";
import useInventoryStore from "../store/useInventoryStore";

interface ITableProps {
  tableHeading: string[];
  tableData: IInventory[];
}

export default function Table(props: ITableProps) {
  const { isAdmin } = useInventoryStore();

  const { tableHeading, tableData } = props;

  return (
    <table className="table-auto w-full bg-zinc-800 rounded-lg">
      <thead>
        <tr className="border-b border-zinc-900">
          {tableHeading.map((th, index) => {
            return (
              <th key={index} className="text-left p-2">
                <div className="bg-zinc-900 p-2 text-[#e5fd72] font-normal text-xs w-fit rounded-lg">
                  {th}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, index) => {
          return (
            <tr
              key={index}
              className="text-gray-400 border-b border-zinc-900 font-semibold text-xs"
            >
              <td className="p-2">{data.name}</td>
              <td className="p-2">{data.category}</td>
              <td className="p-2">{data.price}</td>
              <td className="p-2">{data.quantity}</td>
              <td className="p-2">{data.value}</td>
              <td className="flex items-center justify-start p-2 h-full text-sm">
                <MdModeEdit
                  color={isAdmin ? "green" : "grey"}
                  className={`mr-2 ${
                    isAdmin ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  title="Edit"
                />
                <MdRemoveRedEye
                  color={isAdmin ? "purple" : "grey"}
                  className={`mr-2 ${
                    isAdmin ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  title="View"
                />
                <MdDelete
                  color={isAdmin ? "red" : "grey"}
                  className={isAdmin ? "cursor-pointer" : "cursor-not-allowed"}
                  title="Delete"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
