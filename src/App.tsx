import { useEffect, useMemo } from "react";
import { Switch, Widget, Table } from "./components";
import {
  MdShoppingCart,
  MdCurrencyExchange,
  MdRemoveShoppingCart,
  MdCategory,
  MdLogout,
} from "react-icons/md";
import {
  getNumberOfCat,
  getOutOfStock,
  getTotalProduct,
  getTotalValue,
} from "./lib/utils";
import useFetch from "react-fetch-hook";
import useInventoryStore from "./store/useInventoryStore";
import { IInventory } from "./types/productType";
import { InventoryMockData } from "./lib/mockData";

function App() {
  // Fetching inventory data using useFetch
  const { data, error } = useFetch(
    "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
  );

  // Accessing data from store
  const { isAdmin, tableData, setIsAdmin, setTableData } = useInventoryStore();

  useEffect(() => {
    const tableDataDummy = InventoryMockData;

    if (data) {
      setTableData(data as IInventory[]);
    } else {
      setTableData(tableDataDummy as IInventory[]);
    }
  }, [data, setTableData]);

  // Change User Role
  const handleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  // Check and delete item from store
  const handleDelete = (id: number): void => {
    if (!isAdmin) return;
    const updatedTableData = tableData.filter((_, index) => index !== id);
    setTableData(updatedTableData);
  };

  // Check and disable item for user
  const handleDisable = (id: number): void => {
    if (!isAdmin) return;
    const updatedTableData = tableData.map((item, index) =>
      index === id ? { ...item, isDisabled: !item.isDisabled } : item
    );

    setTableData(updatedTableData);
  };

  // Updated the edited data to the store
  const handleEdit = (data: IInventory, id: number): void => {
    const updatedTableData = tableData.map((item, index) =>
      index === id ? { ...item, ...data } : item
    );

    setTableData(updatedTableData);
  };

  const tableHeading = [
    "Name",
    "Category",
    "Price",
    "Quantity",
    "Value",
    "ACTION",
  ];

  // Parsing widget value and memoizing the value
  const totalValue = useMemo(() => getTotalValue(tableData), [tableData]);
  const outOfStock = useMemo(() => getOutOfStock(tableData), [tableData]);
  const numberOfCat = useMemo(() => getNumberOfCat(tableData), [tableData]);

  if (!data && !error) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <>
      <nav className="flex justify-end items-center border-b border-zinc-800 h-12 py-2 px-4 ">
        <Switch
          preText="Admin"
          suffixText="User"
          isAdmin={isAdmin}
          handleChange={handleIsAdmin}
        />
        <div className="w-[1px] h-full bg-zinc-800 mx-4"></div>
        <MdLogout color="#ffffff" size="26px" />
      </nav>
      <main className="p-4">
        <h3 className="text-white mb-4 text-2xl">Inventory Stats</h3>
        <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mb-4">
          <Widget
            icon={<MdShoppingCart />}
            title="Total Product"
            value={getTotalProduct(tableData)}
          />
          <Widget
            icon={<MdCurrencyExchange />}
            title="Total store value"
            value={totalValue}
          />
          <Widget
            icon={<MdRemoveShoppingCart />}
            title="Out of stocks"
            value={outOfStock}
          />
          <Widget
            icon={<MdCategory />}
            title="No of Category"
            value={numberOfCat}
          />
        </section>
        {tableData.length > 0 ? (
          <Table
            tableHeading={tableHeading}
            tableData={tableData}
            handleDelete={handleDelete}
            handleDisable={handleDisable}
            handleEdit={handleEdit}
          />
        ) : (
          <p className="text-white p-2">No Data To Show</p>
        )}
      </main>
    </>
  );
}

export default App;
