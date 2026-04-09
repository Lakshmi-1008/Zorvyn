import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/calculations';
import '../styles/AdvancedFiltering.css';

interface AdvancedFilteringProps {
  transactions: Transaction[];
}

type GroupBy = 'category' | 'type' | 'month' | 'week';

export const AdvancedFiltering: React.FC<AdvancedFilteringProps> = ({ transactions }) => {
  const [groupBy, setGroupBy] = useState<GroupBy>('category');
  const [filterType, setFilterType] = useState<'income' | 'expense' | 'all'>('all');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const groupedTransactions = useMemo(() => {
    let filtered = transactions;

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    // Group transactions
    const grouped: Record<string, Transaction[]> = {};

    filtered.forEach((transaction) => {
      let key = '';

      switch (groupBy) {
        case 'category':
          key = transaction.category;
          break;
        case 'type':
          key = transaction.type === 'income' ? 'Income' : 'Expense';
          break;
        case 'month': {
          const date = new Date(transaction.date);
          key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
          break;
        }
        case 'week': {
          const date = new Date(transaction.date);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = `Week of ${weekStart.toLocaleDateString('en-US')}`;
          break;
        }
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(transaction);
    });

    return grouped;
  }, [transactions, groupBy, filterType]);

  const calculateGroupTotal = (transactions: Transaction[]): number => {
    return transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);
  };

  const toggleExpanded = (groupKey: string) => {
    setExpanded((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const sortedGroupKeys = Object.keys(groupedTransactions).sort();

  return (
    <div className="card advanced-filtering">
      <div className="advanced-filtering-header">
        <h2>📊 Advanced Filtering & Grouping</h2>
      </div>

      <div className="advanced-filtering-controls">
        <div className="control-group">
          <label>Group By:</label>
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value as GroupBy)} className="filter-select">
            <option value="category">Category</option>
            <option value="type">Type (Income/Expense)</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>
        </div>

        <div className="control-group">
          <label>Filter Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)} className="filter-select">
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
        </div>
      </div>

      <div className="grouped-transactions">
        {sortedGroupKeys.length === 0 ? (
          <div className="empty-state">
            <p>No transactions found for the selected filters</p>
          </div>
        ) : (
          sortedGroupKeys.map((groupKey) => {
            const groupTransactions = groupedTransactions[groupKey];
            const groupTotal = calculateGroupTotal(groupTransactions);
            const isExpanded = expanded[groupKey] !== false; // Default to expanded

            return (
              <div key={groupKey} className="group-section">
                <div className="group-header" onClick={() => toggleExpanded(groupKey)}>
                  <div className="group-title-section">
                    <span className="group-toggle">{isExpanded ? '▼' : '▶'}</span>
                    <span className="group-title">{groupKey}</span>
                    <span className="group-count">({groupTransactions.length})</span>
                  </div>
                  <div className="group-total">
                    <span className={groupTotal >= 0 ? 'total-positive' : 'total-negative'}>
                      {groupTotal >= 0 ? '+' : '-'}
                      {formatCurrency(Math.abs(groupTotal))}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="group-content">
                    {groupTransactions.map((transaction) => (
                      <div key={transaction.id} className="group-item">
                        <div className="item-info">
                          <div className="item-description">{transaction.description}</div>
                          <div className="item-date">{formatDate(transaction.date)}</div>
                        </div>
                        <div className={`item-amount ${transaction.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdvancedFiltering;
