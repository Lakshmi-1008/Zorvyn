import { Transaction } from '../types';

// Mock API service to simulate backend API calls
// In a real application, this would connect to an actual backend server

const MOCK_DELAY = 500; // Simulate network delay

// Helper function to simulate API delay
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-28',
    amount: 5000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary',
  },
  {
    id: '2',
    date: '2024-03-27',
    amount: 1200,
    category: 'Groceries',
    type: 'expense',
    description: 'Weekly groceries',
  },
  {
    id: '3',
    date: '2024-03-26',
    amount: 800,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity and water',
  },
  {
    id: '4',
    date: '2024-03-25',
    amount: 150,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie tickets',
  },
  {
    id: '5',
    date: '2024-03-24',
    amount: 300,
    category: 'Transportation',
    type: 'expense',
    description: 'Fuel for car',
  },
  {
    id: '6',
    date: '2024-03-23',
    amount: 500,
    category: 'Healthcare',
    type: 'expense',
    description: 'Doctor visit',
  },
  {
    id: '7',
    date: '2024-03-20',
    amount: 200,
    category: 'Freelance',
    type: 'income',
    description: 'Side project earnings',
  },
  {
    id: '8',
    date: '2024-03-18',
    amount: 450,
    category: 'Groceries',
    type: 'expense',
    description: 'Grocery shopping',
  },
  {
    id: '9',
    date: '2024-03-15',
    amount: 120,
    category: 'Entertainment',
    type: 'expense',
    description: 'Streaming subscription',
  },
  {
    id: '10',
    date: '2024-03-10',
    amount: 1000,
    category: 'Rent',
    type: 'expense',
    description: 'Monthly rent',
  },
];

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
};

// Mock API endpoints
export const mockApi = {
  // Fetch all transactions
  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    await delay(MOCK_DELAY);
    return {
      success: true,
      data: mockTransactions,
      timestamp: new Date().toISOString(),
    };
  },

  // Fetch single transaction
  async getTransaction(id: string): Promise<ApiResponse<Transaction | null>> {
    await delay(MOCK_DELAY);
    const transaction = mockTransactions.find((t) => t.id === id);
    return {
      success: !!transaction,
      data: transaction || null,
      timestamp: new Date().toISOString(),
    };
  },

  // Create transaction
  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<ApiResponse<Transaction>> {
    await delay(MOCK_DELAY);
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    mockTransactions.push(newTransaction);
    return {
      success: true,
      data: newTransaction,
      timestamp: new Date().toISOString(),
    };
  },

  // Update transaction
  async updateTransaction(
    id: string,
    updates: Partial<Transaction>
  ): Promise<ApiResponse<Transaction | null>> {
    await delay(MOCK_DELAY);
    const index = mockTransactions.findIndex((t) => t.id === id);
    if (index > -1) {
      mockTransactions[index] = { ...mockTransactions[index], ...updates };
      return {
        success: true,
        data: mockTransactions[index],
        timestamp: new Date().toISOString(),
      };
    }
    return {
      success: false,
      error: 'Transaction not found',
      timestamp: new Date().toISOString(),
    };
  },

  // Delete transaction
  async deleteTransaction(id: string): Promise<ApiResponse<boolean>> {
    await delay(MOCK_DELAY);
    const index = mockTransactions.findIndex((t) => t.id === id);
    if (index > -1) {
      mockTransactions.splice(index, 1);
      return {
        success: true,
        data: true,
        timestamp: new Date().toISOString(),
      };
    }
    return {
      success: false,
      error: 'Transaction not found',
      timestamp: new Date().toISOString(),
    };
  },

  // Get transactions by date range
  async getTransactionsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<Transaction[]>> {
    await delay(MOCK_DELAY);
    const filtered = mockTransactions.filter((t) => t.date >= startDate && t.date <= endDate);
    return {
      success: true,
      data: filtered,
      timestamp: new Date().toISOString(),
    };
  },

  // Get transactions by category
  async getTransactionsByCategory(category: string): Promise<ApiResponse<Transaction[]>> {
    await delay(MOCK_DELAY);
    const filtered = mockTransactions.filter((t) => t.category === category);
    return {
      success: true,
      data: filtered,
      timestamp: new Date().toISOString(),
    };
  },

  // Search transactions
  async searchTransactions(query: string): Promise<ApiResponse<Transaction[]>> {
    await delay(MOCK_DELAY);
    const lowerQuery = query.toLowerCase();
    const filtered = mockTransactions.filter(
      (t) =>
        t.description.toLowerCase().includes(lowerQuery) ||
        t.category.toLowerCase().includes(lowerQuery)
    );
    return {
      success: true,
      data: filtered,
      timestamp: new Date().toISOString(),
    };
  },
};

export default mockApi;
