# Finance Dashboard - Development Instructions

## Project Overview

This is a modern Finance Dashboard UI built with React and TypeScript. It's an interactive, responsive web application for tracking financial activity with role-based access control.

## Setup Instructions

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation Steps
1. Navigate to project directory: `cd d:\Zorvyn`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open browser to: `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

## Project Structure

- `src/components/` - Reusable React components
- `src/context/` - State management with React Context
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions and calculations
- `src/styles/` - CSS files for styling
- `public/` - Static assets
- `index.html` - HTML entry point
- `package.json` - Dependencies and scripts

## Key Features Implemented

✅ Dashboard Overview with summary cards
✅ Balance trend visualization (7-day chart)
✅ Category spending breakdown (pie chart)
✅ Transaction management with add/delete
✅ Advanced filtering and search
✅ Role-based access control (Viewer/Admin)
✅ Insights and analytics
✅ Dark mode toggle
✅ Data persistence with localStorage
✅ Fully responsive design
✅ Form validation
✅ Empty state handling

## Architecture Highlights

- **State Management**: React Context API for centralized state
- **Type Safety**: Full TypeScript implementation
- **Component Design**: Modular, reusable components
- **Styling**: CSS with custom properties (variables)
- **Responsiveness**: Mobile-first approach with breakpoints

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technology Stack

- React 18.2
- TypeScript 5.2
- Vite 5.0
- CSS3 with CSS Grid/Flexbox
- LocalStorage for persistence

## Coding Standards

- Use TypeScript for type safety
- Follow component-based architecture
- Use semantic HTML
- Maintain responsive design
- Add proper error handling
- Use CSS variables for theming

## Testing Notes

- Mock data provided (10 transactions)
- Can toggle between Viewer and Admin roles
- Test all filter combinations
- Verify localStorage persistence
- Check dark mode toggle functionality
- Test on multiple screen sizes

## Future Improvements

- Backend API integration
- User authentication
- Advanced analytics
- Data export functionality
- Recurring transactions
- Custom categories
- Budget management

---

For detailed documentation, see README.md
