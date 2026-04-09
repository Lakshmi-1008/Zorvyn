import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { filterTransactions, formatCurrency, formatDate } from '../utils/calculations';
import { exportToCSV, exportToJSON, exportSummary } from '../utils/exportUtils';
import { TransactionForm } from './TransactionForm';
import '../styles/Transactions.css';

export const Transactions: React.FC = () => {
  const { transactions, userRole, selectedFilters, setSelectedFilters, deleteTransaction } = useFinance();
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const filteredTransactions = useMemo(() => {
    let result = filterTransactions(transactions, selectedFilters);

    // Apply search filter
    if (searchTerm) {
      result = result.filter((t) =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

    return result;
  }, [transactions, selectedFilters, searchTerm, sortBy]);

  const categories = Array.from(new Set(transactions.map((t) => t.category))).sort();

  const handleDeleteTransaction = (id: string) => {
    if (userRole !== 'admin') {
      alert('Only admins can delete transactions');
      return;
    }
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleExport = (format: 'csv' | 'json' | 'summary') => {
    const timestamp = new Date().toISOString().split('T')[0];
    if (format === 'csv') {
      exportToCSV(filteredTransactions, `transactions_${timestamp}.csv`);
    } else if (format === 'json') {
      exportToJSON(filteredTransactions, `transactions_${timestamp}.json`);
    } else {
      exportSummary(filteredTransactions, `summary_${timestamp}.json`);
    }
    setShowExportMenu(false);
  };

  return (
    <div className="card transactions-container">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {transactions.length > 0 && (
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowExportMenu(!showExportMenu)}
                title="Export transactions"
              >
                📥 Export
              </button>
              {showExportMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 1000,
                    minWidth: '150px',
                    marginTop: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => handleExport('csv')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px 16px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--light-bg)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    📊 CSV
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px 16px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--light-bg)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    📄 JSON
                  </button>
                  <button
                    onClick={() => handleExport('summary')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px 16px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--light-bg)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    📈 Summary
                  </button>
                </div>
              )}
            </div>
          )}
          {userRole === 'admin' && (
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '✕ Cancel' : '+ Add Transaction'}
            </button>
          )}
        </div>
      </div>

      {showForm && userRole === 'admin' && (
        <div className="form-section">
          <TransactionForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className="transactions-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <select
            value={selectedFilters.category || ''}
            onChange={(e) =>
              setSelectedFilters({
                ...selectedFilters,
                category: e.target.value || null,
              })
            }
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedFilters.type || ''}
            onChange={(e) =>
              setSelectedFilters({
                ...selectedFilters,
                type: (e.target.value as 'income' | 'expense') || null,
              })
            }
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')} className="filter-select">
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>

          {(selectedFilters.category || selectedFilters.type) && (
            <button
              className="btn btn-secondary btn-small"
              onClick={() =>
                setSelectedFilters({
                  category: null,
                  type: null,
                  dateRange: null,
                })
              }
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-title">No Transactions Found</div>
          <div className="empty-state-text">
            {transactions.length === 0
              ? 'Add your first transaction to get started'
              : 'Try adjusting your filters'}
          </div>
        </div>
      ) : (
        <div className="transactions-list">
          <div className="transactions-table-header">
            <div className="table-col-date">Date</div>
            <div className="table-col-description">Description</div>
            <div className="table-col-category">Category</div>
            <div className="table-col-type">Type</div>
            <div className="table-col-amount">Amount</div>
            {userRole === 'admin' && <div className="table-col-action">Action</div>}
          </div>

          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-row">
              <div className="table-col-date">{formatDate(transaction.date)}</div>
              <div className="table-col-description">{transaction.description}</div>
              <div className="table-col-category">
                <span className="badge badge-primary">{transaction.category}</span>
              </div>
              <div className="table-col-type">
                <span className={`badge badge-${transaction.type === 'income' ? 'success' : 'danger'}`}>
                  {transaction.type === 'income' ? '📥 Income' : '📤 Expense'}
                </span>
              </div>
              <div className={`table-col-amount ${transaction.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </div>
              {userRole === 'admin' && (
                <div className="table-col-action">
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
