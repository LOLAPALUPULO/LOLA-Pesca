import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PressureData {
  time: string;
  hpa: number;
}

interface PressureChartProps {
  data: PressureData[];
}

const PressureChart: React.FC<PressureChartProps> = ({ data }) => {
  return (
    <div className="card-box">
      <div className="section-header">HISTORIAL DE PRESIÓN (HPA)</div>
      {data.length > 0 ? (
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-line-color)" />
              <XAxis dataKey="time" stroke="var(--text)" tick={{ fontSize: 10 }} />
              <YAxis stroke="var(--text)" tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
              <Tooltip
                // Updated Tooltip styling to match the new theme using CSS variables
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  border: '1px solid var(--blue)', 
                  borderRadius: '5px', 
                  boxShadow: '0 0 10px rgba(var(--blue-rgb), 0.3)' 
                }}
                itemStyle={{ color: 'var(--text)' }}
                labelStyle={{ color: 'var(--blue)', fontWeight: 'bold' }}
              />
              <Line
                type="monotone"
                dataKey="hpa"
                stroke="var(--blue)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6, fill: 'var(--blue)', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '1rem', padding: '10px' }}>
          Cargando datos de presión...
        </div>
      )}
    </div>
  );
};

export default PressureChart;