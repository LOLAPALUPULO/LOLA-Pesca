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
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="var(--text)" tick={{ fontSize: 10 }} />
              <YAxis stroke="var(--text)" tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--card)', border: 'none', borderRadius: '5px' }}
                itemStyle={{ color: 'var(--text)' }}
                labelStyle={{ color: 'var(--blue)' }}
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
        <div style={{ textAlign: 'center', color: '#666', fontSize: '1rem', padding: '10px' }}>
          Cargando datos de presión...
        </div>
      )}
    </div>
  );
};

export default PressureChart;