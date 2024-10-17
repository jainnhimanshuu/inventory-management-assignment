import { MdModeEdit, MdRemoveRedEye, MdDelete } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { IInventory } from "../types/productType";
import useInventoryStore from "../store/useInventoryStore";
import { useState } from "react";
import EditModal from "./editModal";
import { parseAmt } from "../lib/utils";

interface ITableProps {
  tableHeading: string[];
  tableData: IInventory[];
  handleDelete: (id: number) => void;
  handleDisable: (id: number) => void;
  handleEdit: (data: IInventory, id: number) => void;
}

export default function Table(props: ITableProps) {
  const { isAdmin } = useInventoryStore();

  const { tableHeading, tableData, handleDelete, handleDisable, handleEdit } =
    props;

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<IInventory | null>(null);

  const handleEditModal = (id: number): void => {
    setShowEditModal(true);
    const editData = tableData[id];

    if (editData) {
      setEditData({ ...editData, id });
    }
  };

  const getTableParsedData = (): IInventory[] => {
    if (!isAdmin) return tableData.filter((item) => !item.isDisabled);

    return tableData;
  };

  return (
    <>
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
          {getTableParsedData().map((data, index) => {
            return (
              <tr
                key={index}
                className="text-gray-400 border-b border-zinc-900 font-semibold text-xs"
              >
                <td className="p-2">{data.name}</td>
                <td className="p-2">{data.category}</td>
                <td className="p-2">{parseAmt(data.price)}</td>
                <td className="p-2">{data.quantity}</td>
                <td className="p-2">{parseAmt(data.value)}</td>
                <td className="flex items-center justify-start p-2 h-full text-sm">
                  <MdModeEdit
                    color={isAdmin ? "green" : "grey"}
                    className={`mr-2 ${
                      isAdmin ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    title="Edit"
                    onClick={() => handleEditModal(index)}
                  />
                  <div
                    className={`mr-2 ${
                      isAdmin
                        ? "text-violet-700 cursor-pointer"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {data.isDisabled ? (
                      <IoMdEyeOff
                        title="Enable"
                        onClick={() => {
                          handleDisable(index);
                        }}
                      />
                    ) : (
                      <MdRemoveRedEye
                        title="Disable"
                        onClick={() => {
                          handleDisable(index);
                        }}
                      />
                    )}
                  </div>
                  <MdDelete
                    color={isAdmin ? "red" : "grey"}
                    className={
                      isAdmin ? "cursor-pointer" : "cursor-not-allowed"
                    }
                    title="Delete"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isAdmin && showEditModal && (
        <EditModal
          editData={editData as IInventory}
          onClose={() => {
            setShowEditModal(false);
          }}
          onSave={handleEdit}
        />
      )}
    </>
  );
}
