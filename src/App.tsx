import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import List from "./assets/Components/Table-Items";
import ExpenseList from "./Expense-tracker/ExpenseList";
import ExpenseFilter from "./Expense-tracker/ExpenseFilter";
import categories from "./Expense-tracker/categories";
import ExpenseForm from "./Expense-tracker/ExpenseForm";
import { Expense } from "./Expense-tracker/ExpenseList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState<Expense[]>([]);

  // const [expenses, setExpenses] = useState([
  //   {
  //     id: 1,
  //     description: "aaa",
  //     amount: 10,
  //     category: "Utilities",

  //   },
  // ]);

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
        <div className="mt-3 mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          ></ExpenseFilter>
        </div>
        <ExpenseList></ExpenseList>
      </div>
    </>
  );
}

export default App;
