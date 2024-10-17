import { useMemo } from "react";
import { Switch, Widget, Table } from "./components";
import {
  MdShoppingCart,
  MdCurrencyExchange,
  MdRemoveShoppingCart,
  MdCategory,
  MdLogout,
} from "react-icons/md";
import { getNumberOfCat, getOutOfStock, getTotalValue } from "./lib/utils";
import useFetch from "react-fetch-hook";
import useInventoryStore from "./store/useInventoryStore";
import { IInventory } from "./types/productType";

function App() {
  const { data, error } = useFetch(
    "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
  );

  const { isAdmin, tableData, setIsAdmin, setTableData } = useInventoryStore();

  if (data) {
    setTableData(data as IInventory[]);
  }

  const handleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const tableHeading = [
    "Name",
    "Category",
    "Price",
    "Quantity",
    "Value",
    "ACTION",
  ];

  const totalValue = useMemo(() => getTotalValue(tableData), [tableData]);
  const outOfStock = useMemo(() => getOutOfStock(tableData), [tableData]);
  const numberOfCat = useMemo(() => getNumberOfCat(tableData), [tableData]);

  if (error) {
    return (
      <div className="text-white">
        <p>Code: {error.status}</p>
        <p>Message: {error.statusText}</p>
      </div>
    );
  }

  if (!data && !error) {
    return <p>Loading...</p>;
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
            value={tableData.length}
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
        <Table tableHeading={tableHeading} tableData={tableData} />
      </main>
    </>
  );
}

export default App;
