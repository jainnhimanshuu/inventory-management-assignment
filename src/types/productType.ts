export interface IInventory {
    id?:number;
    name: string;
    category: string;
    value: string;
    quantity: number;
    price: string;
    isDisabled?:boolean;
  }