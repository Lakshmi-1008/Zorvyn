export type UserRole = 'viewer' | 'admin';
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface DashboardSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
}

export interface Insight {
  title: string;
  value: string | number;
  description: string;
}

export interface FinanceContextType {
  transactions: Transaction[];
  userRole: UserRole;
  selectedFilters: {
    category: string | null;
    type: TransactionType | null;
    dateRange: { start: string; end: string } | null;
  };
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setUserRole: (role: UserRole) => void;
  setSelectedFilters: (filters: { category: string | null; type: TransactionType | null; dateRange: { start: string; end: string } | null } | ((prev: { category: string | null; type: TransactionType | null; dateRange: { start: string; end: string } | null }) => { category: string | null; type: TransactionType | null; dateRange: { start: string; end: string } | null })) => void;
  clearFilters: () => void;
}
