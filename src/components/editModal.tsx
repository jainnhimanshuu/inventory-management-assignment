import { IInventory } from "../types/productType";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

interface IEditModalProps {
  editData: IInventory;
  onClose: () => void;
  onSave: (data: IInventory, index: number) => void;
}

export default function EditModal(props: IEditModalProps) {
  const { editData, onClose, onSave } = props;

  const [formData, setFormData] = useState<IInventory>(editData);

  useEffect(() => {
    setFormData(editData);
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: name === "quantity" ? Number(value) : value,
      };

      // Update value based on price and quantity
      if (name === "price" || name === "quantity") {
        updatedData.value = (
          Number(updatedData.price) * updatedData.quantity
        ).toString();
      }

      // Update price based on value and quantity if quantity is not zero
      if (name === "value" && updatedData.quantity > 0) {
        updatedData.price = (
          Number(updatedData.value) / updatedData.quantity
        ).toString();
      }

      return updatedData;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const updatedData: IInventory = {
      ...formData,
      value: (Number(formData.price) * formData.quantity).toString(),
    };

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
              placeholder={formData.category}
              onChange={handleChange}
              className="w-full h-8 px-4 py-1 rounded-lg bg-slate-200"
            />
          </div>

          <div className="flex flex-col text-sm gap-2">
            <p className="text-slate-300">Price</p>
            <input
              type="number"
              min="0"
              name="price"
              placeholder={formData.price}
              onChange={handleChange}
              className="w-full h-8 px-4 py-1 rounded-lg bg-slate-200"
            />
          </div>
          <div className="flex flex-col text-sm gap-2">
            <p className="text-slate-300">Quantity</p>
            <input
              type="number"
              min="0"
              name="quantity"
              placeholder={formData.quantity.toString()}
              onChange={handleChange}
              className="w-full h-8 px-4 py-1 rounded-lg bg-slate-200"
            />
          </div>
          <div className="flex flex-col text-sm gap-2">
            <p className="text-slate-300">Value</p>
            <input
              type="number"
              min="0"
              name="value"
              onChange={handleChange}
              placeholder={formData.value}
              className="w-full h-8 px-4 py-1 rounded-lg bg-slate-200"
            />
          </div>
          <div className="col-span-2 flex justify-end gap-2">
            <button className="text-[#e5fd72]" onClick={onClose}>
              Cancel
            </button>
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
