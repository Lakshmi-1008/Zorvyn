import { Transaction } from '../types';
import { calculateSummary } from './calculations';

/**
 * Export transactions to CSV format
 * @param transactions - Array of transactions to export
 * @param filename - Optional filename (default: transactions.csv)
 */
export const exportToCSV = (transactions: Transaction[], filename: string = 'transactions.csv') => {
  if (!transactions.length) {
    alert('No transactions to export');
    return;
  }

  // CSV headers
  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount'];
  
  // Convert transactions to CSV rows
  const rows = transactions.map((t) => [
    t.id,
    t.date,
    `"${t.description}"`, // Wrap in quotes to handle commas in description
    t.category,
    t.type,
    t.amount.toFixed(2),
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  // Create blob and download
  downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
};

/**
 * Export transactions to JSON format
 * @param transactions - Array of transactions to export
 * @param filename - Optional filename (default: transactions.json)
 */
export const exportToJSON = (
  transactions: Transaction[],
  filename: string = 'transactions.json'
) => {
  if (!transactions.length) {
    alert('No transactions to export');
    return;
  }

  const jsonContent = JSON.stringify(
    {
      exportDate: new Date().toISOString(),
      totalTransactions: transactions.length,
      transactions,
    },
    null,
    2
  );

  downloadFile(jsonContent, filename, 'application/json;charset=utf-8;');
};

/**
 * Export transactions summary statistics
 * @param transactions - Array of transactions
 * @param filename - Optional filename (default: summary.json)
 */
export const exportSummary = (
  transactions: Transaction[],
  filename: string = 'summary.json'
) => {
  if (!transactions.length) {
    alert('No transactions to export');
    return;
  }

  const stats = calculateSummary(transactions);

  const summary = {
    exportDate: new Date().toISOString(),
    totalTransactions: transactions.length,
    totalIncome: stats.totalIncome,
    totalExpenses: stats.totalExpenses,
    netBalance: stats.totalBalance,
    byCategory: {} as Record<string, { count: number; amount: number }>,
    byType: {
      income: {
        count: 0,
        amount: 0,
      },
      expense: {
        count: 0,
        amount: 0,
      },
    },
  };

  // Calculate by category
  transactions.forEach((t) => {
    if (!summary.byCategory[t.category]) {
      summary.byCategory[t.category] = { count: 0, amount: 0 };
    }
    summary.byCategory[t.category].count++;
    summary.byCategory[t.category].amount += t.amount;

    // Calculate by type
    summary.byType[t.type].count++;
    summary.byType[t.type].amount += t.amount;
  });

  summary.netBalance = summary.totalIncome - summary.totalExpenses;

  const jsonContent = JSON.stringify(summary, null, 2);
  downloadFile(jsonContent, filename, 'application/json;charset=utf-8;');
};

/**
 * Helper function to trigger file download
 * @param content - File content
 * @param filename - Filename for download
 * @param mimeType - MIME type of the file
 */
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const element = document.createElement('a');
  const file = new Blob([content], { type: mimeType });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
};

export default {
  exportToCSV,
  exportToJSON,
  exportSummary,
};
