import { IInventory } from "../types/productType";

export const getOutOfStock =(data: IInventory[]):number => {
    return data.filter(item => item.quantity === 0).length
}

export const getNumberOfCat =(data: IInventory[]):number => {
    const uniqueCategories = new Set(data.map(item => item.category));
    return uniqueCategories.size;
}

export const getTotalValue =(data: IInventory[]):string => {
    const totalValue = data.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', '')); 
        return acc + (price * item.quantity);
      }, 0);

      return totalValue.toLocaleString();
}

