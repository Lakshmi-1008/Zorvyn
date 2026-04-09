import React from 'react';
import { formatCurrency } from '../utils/calculations';
import { useCountUp } from '../hooks/useCountUp';
import '../styles/SummaryCard.css';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: string;
  color: 'success' | 'primary' | 'danger';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, icon, color, trend }) => {
  const displayValue = useCountUp(amount, { duration: 1500 });

  return (
    <div className={`summary-card summary-card--${color}`}>
      <div className="summary-card-header">
        <span className="summary-card-icon">{icon}</span>
        <h3>{title}</h3>
      </div>

      <div className="summary-card-amount">{formatCurrency(displayValue)}</div>

      {trend && (
        <div className={`summary-card-trend trend-${trend.direction}`}>
          <span className="trend-icon">{trend.direction === 'up' ? '📈' : '📉'}</span>
          <span className="trend-value">{Math.abs(trend.value)}%</span>
        </div>
      )}
    </div>
  );
};
