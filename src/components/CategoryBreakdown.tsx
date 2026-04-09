import React, { useState } from 'react';
import { getCategorySpending, formatCurrency } from '../utils/calculations';
import { Transaction } from '../types';
import '../styles/CategoryBreakdown.css';

interface CategoryBreakdownProps {
  transactions: Transaction[];
}

interface HoverState {
  category: string | null;
}

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#6366f1',
];

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ transactions }) => {
  const categoryData = getCategorySpending(transactions);
  const [hoveredCategory, setHoveredCategory] = useState<HoverState>({ category: null });

  return (
    <div className="card">
      <div className="category-header">
        <h2>Spending by Category</h2>
      </div>

      {categoryData.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🍰</div>
          <div className="empty-state-title">No Expenses</div>
          <div className="empty-state-text">Add expenses to see category breakdown</div>
        </div>
      ) : (
        <div className="category-breakdown">
          <div className="pie-chart-container">
            <div className="pie-chart">
              <svg viewBox="0 0 36 36" className="pie">
                {categoryData.reduce(
                  (acc, item, index) => {
                    const circumference = 2 * Math.PI * 16;
                    const offset = acc.offset;
                    const dasharray = (item.percentage / 100) * circumference;
                    const isHovered = hoveredCategory.category === item.category;

                    const circleElement = (
                      <circle
                        key={item.category}
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth={isHovered ? 3 : 2}
                        strokeDasharray={dasharray}
                        strokeDashoffset={-(circumference - dasharray) - offset}
                        strokeLinecap="round"
                        style={{
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          filter: isHovered ? 'drop-shadow(0 0 6px rgba(0,0,0,0.3))' : 'none',
                        }}
                        onMouseEnter={() => setHoveredCategory({ category: item.category })}
                        onMouseLeave={() => setHoveredCategory({ category: null })}
                      />
                    );

                    return {
                      elements: [...acc.elements, circleElement],
                      offset: offset + dasharray,
                    };
                  },
                  { elements: [] as React.ReactNode[], offset: 0 }
                ).elements}
              </svg>
              {hoveredCategory.category && (
                <div className="pie-tooltip">
                  {categoryData.find((c) => c.category === hoveredCategory.category)?.percentage.toFixed(1)}%
                </div>
              )}
            </div>
          </div>

          <div className="category-list">
            {categoryData.map((item, index) => (
              <div
                key={item.category}
                className={`category-item ${hoveredCategory.category === item.category ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCategory({ category: item.category })}
                onMouseLeave={() => setHoveredCategory({ category: null })}
              >
                <div className="category-item-header">
                  <span
                    className="category-color"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <span className="category-name">{item.category}</span>
                </div>
                <div className="category-item-values">
                  <span className="category-amount">{formatCurrency(item.amount)}</span>
                  <span className="category-percentage">{item.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
