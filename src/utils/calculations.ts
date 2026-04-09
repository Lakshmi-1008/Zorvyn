import { Transaction, CategorySpending, DashboardSummary, Insight } from '../types';

export const calculateSummary = (transactions: Transaction[]): DashboardSummary => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
  };
};

export const getCategorySpending = (transactions: Transaction[]): CategorySpending[] => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const categoryMap = new Map<string, number>();

  expenses.forEach((t) => {
    const current = categoryMap.get(t.category) || 0;
    categoryMap.set(t.category, current + t.amount);
  });

  const totalSpending = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);

  return Array.from(categoryMap, ([category, amount]) => ({
    category,
    amount,
    percentage: totalSpending > 0 ? (amount / totalSpending) * 100 : 0,
  })).sort((a, b) => b.amount - a.amount);
};

export const generateInsights = (transactions: Transaction[]): Insight[] => {
  const summary = calculateSummary(transactions);
  const categorySpending = getCategorySpending(transactions);
  const insights: Insight[] = [];

  // Highest spending category
  if (categorySpending.length > 0) {
    const highest = categorySpending[0];
    insights.push({
      title: 'Highest Spending Category',
      value: highest.category,
      description: `You spent $${highest.amount.toFixed(2)} on ${highest.category}`,
    });
  }

  // Monthly comparison
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  const previousMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    const prevDate = new Date(currentYear, currentMonth - 1);
    return date.getMonth() === prevDate.getMonth() && date.getFullYear() === prevDate.getFullYear();
  });

  const currentMonthSpending = currentMonthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const previousMonthSpending = previousMonthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const spendingChange =
    previousMonthSpending > 0
      ? ((currentMonthSpending - previousMonthSpending) / previousMonthSpending) * 100
      : 0;

  insights.push({
    title: 'Monthly Spending Trend',
    value: spendingChange > 0 ? `+${spendingChange.toFixed(1)}%` : `${spendingChange.toFixed(1)}%`,
    description:
      spendingChange > 0
        ? 'Your spending increased compared to last month'
        : 'Your spending decreased compared to last month',
  });

  // Savings rate
  const savingsRate =
    summary.totalIncome > 0 ? ((summary.totalIncome - summary.totalExpenses) / summary.totalIncome) * 100 : 0;
  insights.push({
    title: 'Savings Rate',
    value: `${savingsRate.toFixed(1)}%`,
    description: `You're saving ${savingsRate.toFixed(1)}% of your income`,
  });

  // Transaction count
  insights.push({
    title: 'Total Transactions',
    value: transactions.length,
    description: `You've recorded ${transactions.length} transactions`,
  });

  return insights;
};

export const filterTransactions = (
  transactions: Transaction[],
  filters: {
    category: string | null;
    type: 'income' | 'expense' | null;
    dateRange: { start: string; end: string } | null;
  }
): Transaction[] => {
  return transactions.filter((t) => {
    if (filters.category && t.category !== filters.category) return false;
    if (filters.type && t.type !== filters.type) return false;
    if (filters.dateRange) {
      const transDate = new Date(t.date);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (transDate < startDate || transDate > endDate) return false;
    }
    return true;
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const getChartData = (
  transactions: Transaction[]
): { labels: string[]; incomeData: number[]; expenseData: number[] } => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const incomeData = last7Days.map((day) =>
    transactions
      .filter((t) => t.date === day && t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const expenseData = last7Days.map((day) =>
    transactions
      .filter((t) => t.date === day && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  return {
    labels: last7Days.map((d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    incomeData,
    expenseData,
  };
};
