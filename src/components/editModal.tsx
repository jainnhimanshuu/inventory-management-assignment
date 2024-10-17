import { IInventory } from "../types/productType";
import { IoCloseSharp } from "react-icons/io5";

interface IEditModalProps {
  editData: IInventory;
  onClose: () => void;
  onSave: (data: IInventory, index: number) => void;
}

export default function EditModal(props: IEditModalProps) {
  const { editData, onClose, onSave } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updatedData: IInventory = {
      name: editData.name as string,
      category: formData.get("category")
        ? (formData.get("category") as string)
        : editData.category,
      price:
        formData.get("price") !== ""
          ? (formData.get("price") as string)
          : editData.price,
      quantity:
        formData.get("quantity") !== ""
          ? Number(formData.get("quantity"))
          : editData.quantity,
      value: "",
    };

    updatedData.value = (
      Number(updatedData.price) * Number(updatedData.quantity)
    ).toString();

    onSave(updatedData, editData.id as number);
    onClose();
  };

  if (!editData) return;

  return (
    <div className="fixed flex items-center justify-center bg-black/20 top-0 left-0 bottom-0 right-0">
      <div className="w-2/5 p-8 rounded-lg bg-zinc-800">
        <div className="flex items-center justify-between mb-1 text-3xl text-gray-200">
          <p>Edit Product </p>
          <div
            className="w-10 h-10 bg-zinc-700 flex items-center justify-center text-[#e5fd72] rounded-lg cursor-pointer"
            onClick={onClose}
          >
            <IoCloseSharp />
          </div>
        </div>
        <p className="text-white mb-4">{editData.name}</p>
        <form
          className="grid md:grid-cols-2 grid-cols-1 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col text-sm gap-2">
            <p className="text-slate-300">Category</p>
            <input
              type="text"
              name="category"
              placeholder={editData.category}
              className="w-full h-8 px-4 py-1 rounded-lg bg-slate-200"
            />
          </div>

          <div className="flex flex-col text-sm gap-2">
            <p className="text-slate-300">price</p>
            <input
              type="number"
              min="0"
              name="price"
              placeholder={editData.price}
              className="w-full h-8 px-4 py-1 rounded-lg bg-slate-200"
            />
          </div>
          <div className="flex flex-col text-sm gap-2">
            <p className="text-slate-300">quantity</p>
            <input
              type="number"
              min="0"
              name="quantity"
              placeholder={editData.quantity.toString()}
              className="w-full h-8 px-4 py-1 rounded-lg bg-slate-200"
            />
          </div>
          <div className="flex flex-col text-sm gap-2">
            <p className="text-slate-300">value</p>
            <input
              type="number"
              min="0"
              name="value"
              placeholder={editData.value.toString()}
              className="w-full h-8 px-4 py-1 rounded-lg bg-slate-200"
            />
          </div>
          <div className="col-span-2 flex justify-end gap-2">
            <button className="text-[#e5fd72]">Cancel</button>
            <button
              type="submit"
              className={`bg-zinc-700 flex items-center justify-center rounded-lg cursor-pointer px-3 py-1 text-[#e5fd72]`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
