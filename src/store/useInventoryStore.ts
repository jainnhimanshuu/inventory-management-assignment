import { create } from 'zustand';
import { IInventory } from '../types/productType';


interface InventoryState {
  isAdmin: boolean;
  tableData: IInventory[];
  setIsAdmin: (isAdmin: boolean) => void;
  setTableData: (data: IInventory[]) => void;
}
const useInventoryStore = create<InventoryState>((set) => ({
  isAdmin: false,
  tableData: [],
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setTableData: (data) => set({ tableData: data }),
}));

export default useInventoryStore;
