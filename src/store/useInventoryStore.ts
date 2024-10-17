import { create } from 'zustand';
import { IInventory } from '../types/productType';


interface InventoryState {
  isAdmin: boolean;
  tableData: IInventory[];
  setIsAdmin: (isAdmin: boolean) => void;
  setTableData: (data: IInventory[]) => void;
}
const useInventoryStore = create<InventoryState>((set) => ({
  isAdmin: true,
  tableData: [],
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setTableData: (data) => set({ 
    tableData: data.map(item => ({ ...item, isDisabled: item.isDisabled ?? false }))
  })
}));

export default useInventoryStore;
