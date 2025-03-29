
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data - In a real implementation, this would come from the Firebase database
const generateSampleData = (currentValue: number, dataPoints = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = dataPoints - 1; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    
    // Generate a value that fluctuates around the current value
    const randomFactor = Math.random() * 0.4 - 0.2; // +/- 20%
    const value = Number((currentValue * (1 + randomFactor)).toFixed(2));
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value,
    });
  }
  
  return data;
};

type WaterQualityChartProps = {
  title: string;
  parameter: string;
  currentValue: number;
  unit: string;
  color?: string;
  className?: string;
};

const WaterQualityChart: React.FC<WaterQualityChartProps> = ({
  title,
  parameter,
  currentValue,
  unit,
  color = "#0ea5e9",
  className,
}) => {
  const data = React.useMemo(() => generateSampleData(currentValue), [currentValue]);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="time" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip 
                formatter={(value) => [`${value}${unit}`, parameter]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name={parameter}
                stroke={color}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterQualityChart;
