# Finance Dashboard UI

A modern, interactive finance dashboard built with **React** and **TypeScript**. This application allows users to track their financial activity, visualize spending patterns, and manage transactions with role-based access control. Features smooth animations, data persistence, and export capabilities.

## 🎯 Features

### Core Features

✅ **Dashboard Overview**
- Summary cards displaying Total Balance, Total Income, and Total Expenses
- Real-time calculations based on transaction data
- Visual indicators with icons and color coding

✅ **Financial Visualizations**
- **Balance Trend Chart**: 7-day income vs. expense visualization using bar charts
- **Category Breakdown**: Pie chart showing spending distribution across categories
- Both charts are interactive and responsive

✅ **Transactions Management**
- Comprehensive transaction list with all relevant details (Date, Amount, Category, Type, Description)
- **Admin-only features**: Add and delete transactions
- **Viewer-only features**: Read-only access to transaction data

✅ **Advanced Filtering & Search**
- Search transactions by description or category
- Filter by transaction type (Income/Expense)
- Filter by category
- Sort by date or amount
- Clear filters button for easy reset

✅ **Insights & Analytics**
- Highest spending category identification
- Monthly spending trend comparison
- Savings rate calculation
- Total transaction count
- All insights update in real-time based on data

✅ **Role-Based UI**
- **Viewer Role**: Can view all data but cannot modify
- **Admin Role**: Can add and delete transactions
- Smooth role switching via dropdown selector
- Role-appropriate UI elements (Add button only visible to Admin)

✅ **State Management**
- Context API for centralized state management
- Persistent data storage using localStorage
- Automatic data persistence across sessions

### Optional Enhancements Included

✨ **Dark Mode**
- Toggle between light and dark themes
- Preference persisted in localStorage
- Smooth transitions between themes
- All components support both themes

✨ **Data Persistence (localStorage)**
- All transactions automatically saved to browser storage
- Data persists across browser sessions
- No server required - fully client-side storage
- Transactions reload on app restart

✨ **Mock API Integration**
- Full mock API service layer in `src/services/mockApi.ts`
- Realistic API endpoints for CRUD operations
- Simulated network delay for realistic behavior
- Ready for backend integration without code changes
- API methods:
  - `getTransactions()` - Fetch all transactions
  - `createTransaction()` - Add new transaction
  - `updateTransaction()` - Modify existing transaction
  - `deleteTransaction()` - Remove transaction
  - `searchTransactions()` - Search by query
  - `getTransactionsByCategory()` - Filter by category
  - `getTransactionsByDateRange()` - Filter by date range

✨ **Animations & Transitions**
- **Smooth Page Animations**: Fade-in and slide-in effects for sections
- **Card Animations**: Cards animate on load with staggered delays
- **Hover Effects**: Interactive elements scale, rotate, and change colors on hover
- **Number Animations**: CountUp animation for displaying summary card values
- **Chart Animations**: Bar charts animate on load with easing functions
- **Transition Effects**: Smooth 0.3s transitions on all interactive elements
- **Loading States**: Visual feedback during interactions
- Implemented across all components:
  - SummaryCard with CountUp number animation
  - Transaction rows with hover effects
  - Insight cards with scale and rotation animations
  - Chart bars with slide-up animations
  - Header with smooth slide-down animation

✨ **Export Functionality (CSV/JSON)**
- **Export to CSV**: Download filtered transactions as spreadsheet-compatible format
- **Export to JSON**: Download complete transaction data with metadata
- **Export Summary**: Download aggregated statistics (totals, by category, by type)
- Features:
  - Export button visible when transactions exist
  - Dropdown menu for choosing export format
  - Automatic filename generation with date
  - Exports only visible/filtered transactions
  - Summary includes comprehensive statistics
  - One-click download with proper file formatting

✨ **Advanced Filtering & Grouping**
- **New Advanced Filtering Component** with multiple grouping options:
  - **Group by Category**: View all transactions organized by category
  - **Group by Type**: Separate income and expense transactions
  - **Group by Month**: Time-based transaction organization
  - **Group by Week**: Weekly transaction grouping
- Features:
  - Filter by transaction type (All/Income/Expense)
  - Expandable/collapsible groups for better UX
  - Group totals calculation
  - Transaction count per group
  - Individual item details within groups
  - Hover effects for interactive feedback
  - Fully responsive design

✨ **Number Count-Up Animation**
- **useCountUp Hook**: Custom React hook for animating numbers
- **Features**:
  - Smooth easing functions (linear, easeOut, easeInOut)
  - Configurable duration (default 1200ms)
  - Adjustable delay for staggered animations
  - Integrated into SummaryCard component
  - Total Balance, Income, and Expenses animate on load
  - Smooth transitions provide visual feedback

## 📊 Technical Stack

- **Frontend**: React 18.2 with TypeScript 5.2
- **Build Tool**: Vite 5.0 for fast development and optimized builds
- **Styling**: CSS3 with custom properties and Grid/Flexbox layouts
- **State Management**: React Context API
- **Storage**: Browser localStorage for data persistence
- **Animations**: CSS animations and requestAnimationFrame for smooth effects

## 📁 Project Structure

✨ **Dark Mode**
- Toggle between light and dark themes
- Persistent preference storage
- Eye-friendly color schemes

✨ **Data Persistence**
- Automatic localStorage integration
- Data persists across browser sessions
- Mock data seeded on first load

✨ **Responsive Design**
- Fully responsive across all screen sizes
- Mobile-optimized UI with touch-friendly controls
- Adaptive layouts using CSS Grid

✨ **UI Polish**
- Smooth animations and transitions
- Hover effects on interactive elements
- Empty state handling with helpful messages
- Error validation in forms
- Professional color scheme with CSS variables

✨ **Advanced Features**
- Form validation with error messages
- Date picker for easy transaction date selection
- Category selector for consistent data entry
- Tooltip support for data insights

## 📋 Project Structure

```
src/
├── components/
│   ├── Header.tsx                 # Navigation and role selector
│   ├── SummaryCard.tsx            # Financial summary cards (with CountUp animation)
│   ├── BalanceChart.tsx           # 7-day balance visualization
│   ├── CategoryBreakdown.tsx       # Category spending pie chart
│   ├── Transactions.tsx           # Transaction list with export functionality
│   ├── TransactionForm.tsx        # Add transaction form
│   ├── AdvancedFiltering.tsx      # Advanced filtering & grouping component
│   └── Insights.tsx               # Analytics and insights
├── context/
│   └── FinanceContext.tsx         # State management with React Context
├── hooks/
│   └── useCountUp.ts              # Custom hook for number animations
├── services/
│   └── mockApi.ts                 # Mock API service layer for CRUD operations
├── types/
│   └── index.ts                   # TypeScript type definitions
├── utils/
│   ├── calculations.ts            # Business logic and utility functions
│   └── exportUtils.ts             # CSV/JSON export functionality
├── styles/
│   ├── App.css                    # Main app styles with animations
│   ├── Header.css                 # Header styles and transitions
│   ├── SummaryCard.css            # Card animations and hover effects
│   ├── Chart.css                  # Chart animations and styling
│   ├── CategoryBreakdown.css      # Category visualization animations
│   ├── Transactions.css           # Transaction list animations
│   ├── TransactionForm.css        # Form styles
│   ├── Insights.css               # Insights animations
│   └── AdvancedFiltering.css      # Advanced filtering component styles
├── App.tsx                        # Main app component with sections
├── index.css                      # Global styles and CSS variables
└── main.tsx                       # React entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will be available at `http://localhost:5173` (or next available port)
   - Vite will show the exact URL in the terminal

### Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 💡 How to Use

### Viewing Data (Viewer Role)
1. Select "👁️ Viewer" from the role dropdown
2. Explore summary cards showing your financial overview with animated counters
3. View balance trends and category breakdowns
4. Check insights for spending patterns
5. Browse transactions with filtering and search options
6. Explore advanced filtering by category, type, month, or week
7. Export data for analysis

### Managing Transactions (Admin Role)
1. Select "🔑 Admin" from the role dropdown
2. Click "+ Add Transaction" to create a new transaction
3. Fill in the form:
   - **Date**: Select the transaction date
   - **Type**: Choose between Income or Expense
   - **Amount**: Enter the transaction amount
   - **Category**: Select from predefined categories
   - **Description**: Add details about the transaction
4. Click "Add Transaction" to save
5. View the new transaction in the list immediately with smooth animations
6. Delete transactions using the "Delete" button in the Actions column

### Advanced Filtering & Grouping
1. Scroll to the "Advanced Filtering & Grouping" section
2. Choose grouping method:
   - **By Category**: See all transactions organized by spending category
   - **By Type**: Separate income and expense transactions
   - **By Month**: View transactions organized by month
   - **By Week**: Group transactions by week
3. Filter by transaction type (All/Income/Expense)
4. Click on any group to expand/collapse and see details
5. View group totals at a glance

### Filtering & Searching
1. Use the search box to find transactions by description or category
2. Filter by category using the category dropdown
3. Filter by type (Income/Expense) using the type dropdown
4. Sort by date (newest first) or amount (highest first)
5. Click "Clear Filters" to reset all filters

### Exporting Data
1. When in the Transactions section with data available, click "📥 Export"
2. Choose export format:
   - **📊 CSV**: Perfect for Excel and spreadsheet applications
   - **📄 JSON**: Complete transaction data with metadata
   - **📈 Summary**: Aggregated statistics and analysis
3. File downloads automatically with date stamp

### Dark Mode
- Click the moon/sun icon (🌙/☀️) in the header to toggle dark mode
- Your preference is saved automatically in localStorage

## 🎨 Design Decisions

### Architecture
- **React Context API**: Chosen for simplicity and built-in React state management without extra dependencies
- **Custom Hooks**: useCountUp hook for reusable animation logic
- **Mock API Service**: Realistic API layer ready for backend integration
- **Component-Based**: Modular, reusable components for better maintainability
- **Separation of Concerns**: Business logic in utilities, UI in components, state in context

### Styling Approach
- **CSS Modules-style**: Scoped CSS files for each component
- **CSS Variables**: Theme colors, spacing, and animations for easy customization
- **CSS Animations**: Keyframe animations for smooth, performant effects
- **Responsive Grid**: CSS Grid and Flexbox for responsive layouts
- **Mobile-First**: Designed for mobile, enhanced for desktop

### Animations Implementation
- **Page Load Animations**: Staggered fade-in and slide-up effects
- **Card Animations**: Individual cards animate with sequential delays
- **CountUp Numbers**: Smooth easing animations for summary cards
- **Hover Effects**: Interactive hover states with scale and color changes
- **Chart Animations**: Bar chart bars animate from bottom to top
- **Transitions**: Consistent 0.3s cubic-bezier transitions for smoothness

### Data Visualization
- **Custom Bar Chart**: Simple, lightweight implementation without external charting libraries
- **SVG Pie Chart**: Efficient circle rendering for category breakdown
- **Accessible Colors**: WCAG compliant color contrasts
- **Responsive Charts**: Adapt to different screen sizes

### User Experience
- **Form Validation**: Client-side validation with clear error messages  
- **Persistent Storage**: localStorage for seamless user experience
- **Empty States**: Helpful messages when no data is available
- **Role-Based UI**: Different features based on user permissions
- **Data Export**: Download data in multiple formats for external analysis
- **Smooth Animations**: Visual feedback and Polish throughout the app

## 🔄 State Management Flow

```
FinanceContext
├── transactions array (persisted to localStorage)
├── userRole (viewer | admin)  
├── selectedFilters
│   ├── category
│   ├── type
│   └── dateRange
└── Actions
    ├── addTransaction()
    ├── updateTransaction()
    ├── deleteTransaction()
    ├── setUserRole()
    ├── setSelectedFilters()
    └── clearFilters()
```

## 📊 Sample Data

The application comes with 10 pre-loaded transaction samples to demonstrate functionality:
- Various transaction types (income and expenses)
- Multiple spending categories
- Range of amounts
- Different dates for testing filters and trends

All data is stored in browser's localStorage. To reset, clear browser data or run in private mode.

## 🔐 Role-Based Access Control

### Viewer Role
- View all financial data and summaries
- Access all visualizations and insights
- Search and filter transactions
- Cannot add or delete transactions

### Admin Role
- All Viewer permissions plus:
- Add new transactions via form
- Delete transactions
- Full access to transaction management
- Export data in multiple formats

Role switching is instant and updates the UI accordingly.

## ✨ Detailed New Features Documentation

### 1. Mock API Integration (`src/services/mockApi.ts`)

A complete mock API service layer that simulates backend functionality:

```typescript
// Available API methods:
mockApi.getTransactions()                    // Fetch all transactions
mockApi.getTransaction(id)                   // Fetch single transaction
mockApi.createTransaction(data)              // Add new transaction
mockApi.updateTransaction(id, data)          // Update transaction
mockApi.deleteTransaction(id)                // Delete transaction
mockApi.getTransactionsByCategory(cat)       // Filter by category
mockApi.getTransactionsByDateRange(s, e)     // Filter by date range
mockApi.searchTransactions(query)            // Search transactions
```

**Features**:
- Simulates real API behavior with 500ms delay
- Returns consistent API response structure
- In-memory data storage ready for backend replacement
- Type-safe with TypeScript interfaces
- No external dependencies required

**Integration Ready**: Replace with actual API calls by modifying `src/services/mockApi.ts`

### 2. CountUp Number Animation (`src/hooks/useCountUp.ts`)

Custom React hook for smooth number animations with multiple easing functions:

```typescript
// Usage in components:
const animatedValue = useCountUp(targetValue, {
  duration: 1200,           // Animation duration in ms
  delay: 0,                 // Delay before starting
  easing: easingFunction    // Easing function
});
```

**Easing Functions Included**:
- `linear`: Constant speed
- `easeOut`: Starts fast, ends slow
- `easeInOut`: Smooth both ways

**Implementation**:
- Used in SummaryCard for animated balance/income/expense display
- RequestAnimationFrame for smooth 60fps animations
- Customizable duration and delay for staggered effects

### 3. Export Functionality (`src/utils/exportUtils.ts`)

Comprehensive data export system with multiple formats:

```typescript
// Export methods:
exportToCSV(transactions, filename)          // Export to CSV format
exportToJSON(transactions, filename)         // Export complete JSON
exportSummary(transactions, filename)        // Export analytics summary
```

**Export Formats**:

**CSV Export**:
- Compatible with Excel, Google Sheets, Numbers
- Includes headers and all transaction details
- Quoted descriptions to handle commas
- Automatic comma-delimited formatting

**JSON Export**:
- Complete transaction data structure
- Includes metadata (export date, row count)
- Pretty-printed for readability
- Ready for data analysis tools

**Summary Export**:
- Aggregated statistics (income, expenses, net)
- Breakdown by category (count and amount)
- Breakdown by type (income vs expense)
- Export date timestamp

**UI Integration**:
- Dropdown export menu in Transactions header
- Auto-generated filename with date: `transactions_2024-03-28.csv`
- One-click download handling
- Only visible when data is available

### 4. Advanced Filtering & Grouping (`src/components/AdvancedFiltering.tsx`)

New component with powerful transaction organization:

**Grouping Options**:
1. **By Category**: Organize transactions by spending categories
2. **By Type**: Separate income and expense transactions
3. **By Month**: Group transactions chronologically by month
4. **By Week**: Organize into weekly buckets

**Features**:
- Type filter: All/Income/Expense
- Group headers with transaction counts
- Group totals calculation (income shown as +, expense as -)
- Expandable/collapsible groups for UX
- Individual transaction details within groups
- Responsive design for all screen sizes

**UI Elements**:
- Control bar with grouping and filtering dropdowns
- Collapsible group sections with indicators
- Summary information per group
- Smooth animations on collapse/expand
- Hover effects for better feedback

### 5. CSS Animations & Transitions

Extensive animation system across all components:

**Animation Types**:

**Page Load Animations**:
- `fadeIn`: Gradual opacity increase (0.5-0.6s)
- `slideInUp`: Elements slide up from bottom
- `slideInDown`: Elements slide down from top
- `slideInLeft`: Elements slide from left
- `slideInRight`: Elements slide from right
- `scaleIn`: Elements scale up from center

**Staggered Delays**:
- Sections animate with delays (0.1s - 0.5s)
- Cards animate sequentially
- Transaction rows animate on-load
- Chart bars animate with progressive delay

**Interactive Animations**:
- Hover scale transformations
- Color transitions on hover
- Icon rotation on interaction
- Smooth shadow increases
- Border color changes

**Duration & Easing**:
- Page animations: 0.4-0.6 seconds
- Transitions: 0.3 seconds cubic-bezier
- Hover effects: Immediate with spring easing
- Chart animations: 0.8-1s with easing functions

**Performance**:
- GPU-accelerated transforms
- Efficient keyframe animations
- RequestAnimationFrame for smooth rendering
- No layout reflows during animations

### 6. Animation Implementation Details

**CSS Keyframe Animations** (`keyframes` in App.css, Chart.css, etc.):
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes chartBarSlideUp {
  from { height: 0; opacity: 0; }
  to { opacity: 1; }
}
```

**Component Animations**:
- **SummaryCard**: Staggered slide-in with icon hover rotation
- **BalanceChart**: Bars animate from bottom with individual delays
- **CategoryBreakdown**: Pie chart scales in with list cascade
- **TransactionRows**: Slide left with expandable hover states
- **AdvancedFiltering**: Group sections animate on collapse/expand
- **Insights**: Cards scale in with perspective transforms

### 7. Data Persistence Enhanced

Existing localStorage functionality with new features:
- All new features automatically save to localStorage
- Export files include timestamp
- Filtered data respects localStorage constraints
- Mock API works seamlessly with persistence

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column layouts)
- **Tablet**: 768px - 1024px (2-column layouts)
- **Desktop**: > 1024px (3-4 column layouts)

## 🛠 Technologies Used

- **React 18.2**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with variables, grid, and animations
- **LocalStorage API**: Data persistence
- **RequestAnimationFrame**: Smooth animations
- **Blob API**: File download handling

## 📈 Future Enhancement Ideas

- **Backend Integration**: Connect mock API to real backend
- **Advanced Filtering**: Date range picker, multi-select categories
- **Recurring Transactions**: Automate regular income/expenses
- **Budget Goals**: Set and track spending targets
- **Multiple Accounts**: Manage different wallets/accounts
- **Custom Categories**: User-defined expense categories
- **Notifications**: Alerts for spending limits
- **Data Import**: Import from CSV/bank exports
- **Charts Library**: Advanced charting (Chart.js, Recharts)
- **Mobile App**: React Native implementation
- **Authentication**: User login and multi-user support
- **Cloud Sync**: Synchronize across devices

## 🐛 Known Limitations

- Mock API (no backend connection)
- No authentication system
- No multi-device synchronization
- Limited to browser localStorage capacity (~5-10MB)
- No transaction editing (only add/delete)
- No recurring transactions
- No multi-currency support

## 📝 Notes

This is a comprehensive demonstration project showcasing modern frontend development practices:

**Technical Excellence**:
- Clean, modular component architecture
- Type-safe with TypeScript throughout
- Advanced state management patterns
- Custom hooks and utilities
- Responsive design implementation
- Animation and transition expertise
- Export and data handling

**User Experience Focus**:
- Smooth animations and transitions
- Intuitive filtering and grouping
- Data export capabilities
- Role-based access control
- Form validation and error handling
- Empty state handling
- Professional visual design

**Scalability & Maintainability**:
- Clear separation of concerns
- Reusable custom hooks
- Mock API ready for backend integration
- Well-organized file structure
- Comprehensive CSS variables for theming
- Documentation throughout

## 📄 License

This project is open source and available for educational and demonstration use.

## 👨‍💻 Author

Built as a Finance Dashboard internship assignment demonstration, showcasing comprehensive frontend development skills including React, TypeScript, animations, state management, and user experience design.

---

**Implemented Features Summary**:
✅ Dark Mode  
✅ Data Persistence (localStorage)  
✅ Mock API Integration  
✅ CSS Animations & Transitions  
✅ Export Functionality (CSV/JSON)  
✅ Advanced Filtering & Grouping  
✅ CountUp Number Animations  
✅ Responsive Design  
✅ Role-Based Access Control  
✅ Transaction Management  

**Happy tracking your finances! 💰📊**
