import React from "react";
import ExpenseForm from "../Expense-tracker/ExpenseForm";

const AddNewItem = () => {
  return (
    <>
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([
            ...expenses,
            {
              ...expense,
              id: expenses.length + 1,
              description: expense.description,
              amount: expense.amount,
              category: expense.category,
            },
          ])
        }
      ></ExpenseForm>
    </>
  );
};

export default AddNewItem;
