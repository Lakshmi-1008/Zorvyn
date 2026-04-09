import React from 'react';
import { generateInsights } from '../utils/calculations';
import { Transaction } from '../types';
import '../styles/Insights.css';

interface InsightsProps {
  transactions: Transaction[];
}

export const Insights: React.FC<InsightsProps> = ({ transactions }) => {
  const insights = generateInsights(transactions);

  return (
    <div className="card insights-container">
      <div className="insights-header">
        <h2>💡 Insights & Analytics</h2>
      </div>

      {insights.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <div className="empty-state-title">No Insights Available</div>
          <div className="empty-state-text">Add transactions to see insights</div>
        </div>
      ) : (
        <div className="insights-grid">
          {insights.map((insight, index) => (
            <div key={index} className="insight-card">
              <div className="insight-icon">
                {index === 0 && '🏆'}
                {index === 1 && '📈'}
                {index === 2 && '💾'}
                {index === 3 && '📋'}
              </div>
              <div className="insight-content">
                <h3 className="insight-title">{insight.title}</h3>
                <div className="insight-value">{insight.value}</div>
                <p className="insight-description">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
