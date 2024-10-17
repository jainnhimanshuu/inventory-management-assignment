import { IInventory } from "../types/productType";

export const getTotalProduct = (data:IInventory[]):number => {
    const filteredData = getParsedInventoryData(data);

    return filteredData.length

}

export const getOutOfStock =(data: IInventory[]):number => {
    const filteredData = getParsedInventoryData(data)
    return filteredData.filter(item => item.quantity === 0).length
}

export const getNumberOfCat =(data: IInventory[]):number => {
    const filteredData = getParsedInventoryData(data)
    const uniqueCategories = new Set(filteredData.map(item => item.category));
    return uniqueCategories.size;
}

export const getTotalValue =(data: IInventory[]):string => {
    const filteredData = getParsedInventoryData(data);
    const totalValue = filteredData.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', '')); 
        return acc + (price * item.quantity);
      }, 0);

      return totalValue.toLocaleString();
}

export const getParsedInventoryData = (data: IInventory[]): IInventory[] => {
    return data.filter(item => !item.isDisabled);
}

export const parseAmt = (value: string) => {
    if (value.startsWith('$')) {
        return value; 
    } else {
        return '$' + value; 
    }
}