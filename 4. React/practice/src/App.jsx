import { useState, useMemo } from 'react';
import './App.css';

function Dashboard() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // 1. THE FAKE SLOW FUNCTION
  // Imagine this is processing 10,000 rows of table data
  const slowCalculation = (num) => {
    console.log("🐌 Running heavy CPU calculation...");
    for (let i = 0; i <= 1000000000; i++) {} // Artificial 1-second delay
    return num * 2;
  };

  // ❌ THE ROOKIE WAY: 
  //const doubledNumber = slowCalculation(count);
  //If you use this, toggling dark mode takes 1 full second because this runs every render!

  // ✅ THE SENIOR WAY (`useMemo`):
  const doubledNumber = useMemo(() => {
    return slowCalculation(count);
  }, [count]); // THE GOVERNOR: Only re-run this math if 'count' changes. Ignore theme changes!

  // The UI
  const themeStyles = {
    backgroundColor: isDark ? '#333' : '#FFF',
    color: isDark ? '#FFF' : '#333',
    padding: '2rem',
    height: '100vh'
  };

  return (
    <div style={themeStyles}>
      <h2>Performance Dashboard</h2>
      
      {/* Changing this state ONLY affects the theme. The heavy math is skipped! */}
      <button onClick={() => setIsDark((prev) => !prev)}>
        Toggle Theme
      </button>

      <div style={{ marginTop: '2rem' }}>
        <input 
          type="number" 
          value={count} 
          onChange={(e) => setCount(parseInt(e.target.value) || 0)} 
        />
        <h3>Calculated Result: {doubledNumber}</h3>
      </div>
    </div>
  );
}

export default Dashboard;