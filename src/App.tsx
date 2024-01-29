import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import FormItem from "./assets/Components/Form-Item";
import List from "./assets/Components/Table-Items";
import ExpenseList from "./Expense-tracker.tsx/ExpenseList";
import ExpenseFilter from "./Expense-tracker.tsx/ExpenseFilter";
import categories from "./Expense-tracker.tsx/categories";
import ExpenseForm from "./Expense-tracker.tsx/ExpenseForm";
function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "aaa",
      amount: 10,
      category: "Utilities",
    },
  ]);
  // const expenses = [
  //   {
  //     id: 1,
  //     description: "aaa",
  //     amount: 10,
  //     category: "Utilities",
  //   },
  // ];

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;
  return (
    <>
      <div>
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
        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          ></ExpenseFilter>
        </div>
        <ExpenseList
          expenses={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        ></ExpenseList>
        <FormItem></FormItem>
      </div>
    </>
  );
}

export default App;
