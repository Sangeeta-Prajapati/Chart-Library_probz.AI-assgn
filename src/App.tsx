// src/App.tsx
import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import './App.css';

interface DataPoint {
  timestamp: string;
  value: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('day');

  useEffect(() => {
    // Fetch the JSON data from a file or API
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Charts</h1>
      </header>
      <main>
        <div>
          <button onClick={() => setTimeframe('day')}>Day</button>
          <button onClick={() => setTimeframe('week')}>Week</button>
          <button onClick={() => setTimeframe('month')}>Month</button>
        </div>
        {data.length > 0 ? <ChartComponent data={data} /> : <p>Loading data...</p>}
      </main>
    </div>
  );
};

export default App;
