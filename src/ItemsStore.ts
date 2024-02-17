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
}));

export default useExpenseStore;
