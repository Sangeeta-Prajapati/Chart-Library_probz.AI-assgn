// src/ChartComponent.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {Chart, getChart, exportChart} from 'chartjs-plugin-export'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

interface DataPoint {
  timestamp: string;
  value: number;
}

interface ChartProps {
  data: DataPoint[];
}

interface ChartProps {
  data: any; 
  timeframe?: string; 
}


const ChartComponent: React.FC<ChartProps> = ({ data, timeframe }) => {
  const [chartData, setChartData] = useState<any>({ datasets: [] });
  const [options, setOptions] = useState<any>({});

    
useEffect(() => {
  const formattedData = {
    labels: data.map(d => new Date(d.timestamp)),
    datasets: [
      {
        label: 'Sample Data',
        data: data.map(d => d.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeframe, // Use timeframe state here
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const { index } = elements[0];
        const dataPoint = data[index];
        alert(`Clicked on data point: ${JSON.stringify(dataPoint)}`);
      }
    },
  };

  setChartData(formattedData);
  setOptions(options);
}, [data, timeframe]); // Depend on timeframe


    return
    ( <div>
    <Line data={chartData} options={options} />;
    
    <button onClick={() => exportChart(getChart('chart'), 'image/jpeg')}> Export as jpeg </button>
  <button onClick={() => exportChart(getChart('chart'), 'image/png')}>Export as PNG</button>
    </div>
        )
};

export default ChartComponent;
