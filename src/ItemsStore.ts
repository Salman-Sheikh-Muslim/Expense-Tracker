import { create } from 'zustand';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: number, updatedExpense: Expense) => void;
  onDelete: (id: number) => void;
}

const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({
      expenses: [
        ...state.expenses,
        {
          ...expense,
          id: state.expenses.length + 1,
        },
      ],
    })),
  updateExpense: (id, updatedExpense) =>
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id ? updatedExpense : expense
      ),
    })),
  onDelete: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),
}));

export default useExpenseStore;
