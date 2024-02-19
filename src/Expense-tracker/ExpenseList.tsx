import React, { useState } from "react";
import useExpenseStore from "../ItemsStore";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  // onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses }: Props) => {
  const { onDelete, updateExpense } = useExpenseStore();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editExpense, setEditExpense] = useState<Expense>({
    id: -1,
    description: "",
    amount: 0,
    category: "",
  });

  const handleOnEdit = (index: number) => {
    setEditIndex(index);
    setEditExpense(expenses[index]);
  };

  const handleUpdateExpense = () => {
    // Logic to update expense
    console.log("Updating expense:", editExpense);
    updateExpense(editExpense.id, editExpense);

    // Reset edit state
    setEditIndex(null);
    setEditExpense({ id: -1, description: "", amount: 0, category: "" });
  };

  const handleCancelEdit = () => {
    // Reset edit state
    setEditIndex(null);
    setEditExpense({ id: -1, description: "", amount: 0, category: "" });
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={expense.id}>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editExpense.description}
                  onChange={(e) =>
                    setEditExpense({
                      ...editExpense,
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                expense.description
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="number"
                  value={editExpense.amount}
                  onChange={(e) =>
                    setEditExpense({
                      ...editExpense,
                      amount: parseFloat(e.target.value),
                    })
                  }
                />
              ) : (
                expense.amount
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editExpense.category}
                  onChange={(e) =>
                    setEditExpense({
                      ...editExpense,
                      category: e.target.value,
                    })
                  }
                />
              ) : (
                expense.category
              )}
            </td>
            <td>
              {editIndex === index ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateExpense}
                  >
                    Save
                  </button>
                  <button className="btn btn-danger" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleOnEdit(index)}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            ${" "}
            {expenses
              .reduce((acc, expense) => expense.amount + acc, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
