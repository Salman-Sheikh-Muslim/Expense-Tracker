import { useState } from "react";
import ExpenseFilter from "../Expense-tracker/ExpenseFilter";
import ExpenseForm from "../Expense-tracker/ExpenseForm";
import ExpenseList, { Expense } from "../Expense-tracker/ExpenseList";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState<Expense[]>([]);

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
        <ExpenseList
          expenses={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        ></ExpenseList>
      </div>
    </>
  );
}

export default HomePage;
