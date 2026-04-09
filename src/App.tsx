import { useFinance } from './context/FinanceContext';
import { Header } from './components/Header';
import { SummaryCard } from './components/SummaryCard';
import { BalanceChart } from './components/BalanceChart';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { Insights } from './components/Insights';
import { Transactions } from './components/Transactions';
import { AdvancedFiltering } from './components/AdvancedFiltering';
import { calculateSummary } from './utils/calculations';
import './styles/App.css';

function App() {
  const { transactions, userRole } = useFinance();
  const summary = calculateSummary(transactions);

  const handleClearData = () => {
    localStorage.removeItem('financeTransactions');
    window.location.reload();
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content container">
        {/* Dashboard Summary */}
        <section className="section">
          <div className="grid grid-3">
            <SummaryCard
              title="Total Balance"
              amount={summary.totalBalance}
              icon="💰"
              color="primary"
            />
            <SummaryCard
              title="Total Income"
              amount={summary.totalIncome}
              icon="📥"
              color="success"
            />
            <SummaryCard
              title="Total Expenses"
              amount={summary.totalExpenses}
              icon="📤"
              color="danger"
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="section">
          <div className="grid grid-2">
            <BalanceChart transactions={transactions} />
            <CategoryBreakdown transactions={transactions} />
          </div>
        </section>

        {/* Insights Section */}
        <section className="section">
          <Insights transactions={transactions} />
        </section>

        {/* Advanced Filtering & Grouping */}
        <section className="section">
          <AdvancedFiltering transactions={transactions} />
        </section>

        {/* Transactions Section */}
        <section className="section">
          <Transactions />
        </section>

        {/* Role Info */}
        <section className="section role-info">
          <div className="card">
            <div className="role-info-content" style={{ marginBottom: '20px' }}>
              <p style={{ color: '#999', fontSize: '12px' }}>
                Debug: {transactions.length} transactions loaded | Income: {summary.totalIncome} | Expenses: {summary.totalExpenses}
              </p>
              <button onClick={handleClearData} style={{ 
                padding: '8px 16px', 
                background: '#ff6b6b', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}>
                Reset Data & Reload
              </button>
            </div>
            <div className="role-info-content">
              <p>
                <strong>Current Role:</strong> <span className="role-badge">{userRole.toUpperCase()}</span>
              </p>
              <p className="role-description">
                {userRole === 'viewer' && '✓ You can view all transactions and insights. Switch to Admin role to add or delete transactions.'}
                {userRole === 'admin' && '✓ You have full access to manage transactions. You can add, view, delete transactions, and export data.'}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Finance Dashboard. Built with React & TypeScript.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
