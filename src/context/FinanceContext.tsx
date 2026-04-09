import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Transaction, UserRole, TransactionType, FinanceContextType } from '../types';
import { mockTransactions } from '../services/mockApi';

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('viewer');
  const [selectedFilters, setSelectedFilters] = useState({
    category: null as string | null,
    type: null as TransactionType | null,
    dateRange: null as { start: string; end: string } | null,
  });

  // Force clear localStorage and initialize with fresh mock data
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // Always use mock data on first load for debugging
    const mockData = mockTransactions;
    // Clear localStorage and save fresh mock data
    localStorage.removeItem('financeTransactions');
    localStorage.setItem('financeTransactions', JSON.stringify(mockData));
    console.log('✓ Mock data loaded:', mockData.length, 'transactions');
    return mockData;
  });

  // Save transactions to localStorage whenever they change
  const saveTransactions = (newTransactions: Transaction[]) => {
    localStorage.setItem('financeTransactions', JSON.stringify(newTransactions));
    setTransactions(newTransactions);
  };

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const id = Date.now().toString();
    const newTransaction = { ...transaction, id };
    saveTransactions([...transactions, newTransaction]);
  }, [transactions]);

  const updateTransaction = useCallback(
    (id: string, updates: Partial<Transaction>) => {
      saveTransactions(
        transactions.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    },
    [transactions]
  );

  const deleteTransaction = useCallback((id: string) => {
    saveTransactions(transactions.filter((t) => t.id !== id));
  }, [transactions]);

  const clearFilters = useCallback(() => {
    setSelectedFilters({
      category: null,
      type: null,
      dateRange: null,
    });
  }, []);

  const value: FinanceContextType = {
    transactions,
    userRole,
    selectedFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setUserRole,
    setSelectedFilters,
    clearFilters,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};
