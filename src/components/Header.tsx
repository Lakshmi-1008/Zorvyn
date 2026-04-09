import React from 'react';
import { useFinance } from '../context/FinanceContext';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const { userRole, setUserRole } = useFinance();
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content flex-between">
          <div className="header-title">
            <h1>💰 Finance Dashboard</h1>
            <p>Track your financial activity with ease</p>
          </div>

          <div className="header-controls flex gap-2">
            <button className="btn-icon" onClick={toggleDarkMode} title="Toggle dark mode">
              {darkMode ? '☀️' : '🌙'}
            </button>

            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as 'viewer' | 'admin')}
              className="role-select"
            >
              <option value="viewer">👁️ Viewer</option>
              <option value="admin">🔑 Admin</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
