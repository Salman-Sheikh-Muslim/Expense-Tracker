//Will create properties and ask in form-item.tsx
import Dropdown from "./dropdown";

import React, { useState } from "react";

interface Props {
  name: string;
  amount: number;
  category: string;
  // onClick: () => void;
}

const TableItems = ({ name, amount, category }: Props) => {
  const [items, setItems] = useState<Array<Props>>([]);

  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // const onCategorySelect = (category: string) => {
  //   setUniqueCategories((prevCategories) =>
  //     prevCategories.includes(category)
  //       ? prevCategories
  //       : [...prevCategories, category]
  //   );
  // };

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, { name, amount, category }]);

    setUniqueCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories
        : [...prevCategories, category]
    );
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  const shouldDisplayTotalAmount = filteredItems.length > 0;

  const totalAmount = shouldDisplayTotalAmount
    ? filteredItems.reduce(
        (accumulator, currentItem) => accumulator + currentItem.amount,
        0
      )
    : 0;

  const handleDeleteItem = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const rows = filteredItems.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>${item.amount}</td>
      <td>{item.category}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteItem(index)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  // const rows = items.map((item, index) => (
  //   <tr key={index}>
  //     <td>{item.name}</td>
  //     <td>{item.amount}</td>
  //     <td>{item.category}</td>
  //   </tr>
  // ));

  // const [renderOnAdd, setRenderOnAdd] = useState(false);
  //const row = [name, amount.toString(), category];

  // const addingItem = row.map((data, index) => {
  // if (data === "number" ? data.toString : data)
  //   return <td key={index}>{data}</td>;
  // else
  // return <td key={index}>{data}</td>;
  //});

  // const totalAmount = filteredItems.reduce(
  //   (accumulator, currentItem) => accumulator + currentItem.amount,
  //   0
  // );

  return (
    <>
      <div>
        <Dropdown
          key={uniqueCategories.join(",")}
          categories={uniqueCategories}
          onCategorySelect={onCategorySelect}
        ></Dropdown>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {rows}

            {/* onClick={() => setRenderOnAdd(!renderOnAdd)} */}
            {/* <tr>{addingItem}</tr> */}
          </tbody>
          {shouldDisplayTotalAmount && (
            <tfoot>
              <tr>
                <td>Total Amount:</td>
                <td>${totalAmount}</td>
              </tr>
            </tfoot>
          )}
        </table>
        <button onClick={handleAddItem}>Update</button>
      </div>
    </>
  );
};

export default TableItems;
