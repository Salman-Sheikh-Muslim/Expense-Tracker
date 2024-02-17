import React from "react";
import ExpenseForm from "../Expense-tracker/ExpenseForm";
import useExpenseStore from "../ItemsStore";
import { useNavigate } from "react-router-dom";

const AddNewItem = () => {
  const { addExpense } = useExpenseStore();
  const navigate = useNavigate();
  return (
    <>
      <ExpenseForm
        onSubmit={(expense) => {
          addExpense({
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
          });

          navigate("/");
        }}
      ></ExpenseForm>
    </>
  );
};

export default AddNewItem;
