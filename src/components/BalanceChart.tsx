import React, { useState } from 'react';
import { getChartData } from '../utils/calculations';
import { Transaction } from '../types';
import '../styles/Chart.css';

interface BalanceChartProps {
  transactions: Transaction[];
}

interface HoverState {
  index: number | null;
  type: 'income' | 'expense' | null;
}

export const BalanceChart: React.FC<BalanceChartProps> = ({ transactions }) => {
  const chartData = getChartData(transactions);
  const maxValue = Math.max(...chartData.incomeData, ...chartData.expenseData, 1);
  const [hoveredBar, setHoveredBar] = useState<HoverState>({ index: null, type: null });

  return (
    <div className="chart-container card">
      <div className="chart-header">
        <h2>Balance Trend (Last 7 Days)</h2>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color legend-income"></span>
          <span>Income</span>
        </div>
        <div className="legend-item">
          <span className="legend-color legend-expense"></span>
          <span>Expense</span>
        </div>
      </div>

      <div className="chart-wrapper">
        {chartData.labels.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <div className="empty-state-title">No Data Available</div>
            <div className="empty-state-text">Add transactions to see the balance trend chart</div>
          </div>
        ) : (
          <div className="chart">
            {chartData.incomeData.map((income, i) => {
              const expense = chartData.expenseData[i];
              const incomeHeight = (income / maxValue) * 10;
              const expenseHeight = (expense / maxValue) * 10;

              return (
                <div key={i} className="chart-bar-group">
                  {hoveredBar.index === i && (
                    <div className="chart-tooltip">
                      {hoveredBar.type === 'income' && `$${income.toFixed(2)}`}
                      {hoveredBar.type === 'expense' && `$${expense.toFixed(2)}`}
                    </div>
                  )}
                  <div className="chart-bar-wrapper">
                    <div
                      className="chart-bar income-bar"
                      style={{ height: `${incomeHeight}%` }}
                      onMouseEnter={() => setHoveredBar({ index: i, type: 'income' })}
                      onMouseLeave={() => setHoveredBar({ index: null, type: null })}
                      title={`Income: $${income.toFixed(2)}`}
                    ></div>
                  </div>
                  <div className="chart-bar-wrapper">
                    <div
                      className="chart-bar expense-bar"
                      style={{ height: `${expenseHeight}%` }}
                      onMouseEnter={() => setHoveredBar({ index: i, type: 'expense' })}
                      onMouseLeave={() => setHoveredBar({ index: null, type: null })}
                      title={`Expense: $${expense.toFixed(2)}`}
                    ></div>
                  </div>
                  <div className="chart-label">{chartData.labels[i]}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
