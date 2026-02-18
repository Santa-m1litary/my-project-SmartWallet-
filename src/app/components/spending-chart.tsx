import { Card } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Mon", amount: 240 },
  { name: "Tue", amount: 380 },
  { name: "Wed", amount: 150 },
  { name: "Thu", amount: 470 },
  { name: "Fri", amount: 310 },
  { name: "Sat", amount: 520 },
  { name: "Sun", amount: 190 },
];

export function SpendingChart() {
  return (
    <Card className="mx-4 mt-6 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Weekly Spending</h3>
        <span className="text-sm text-gray-500">$2,260</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            width={40}
          />
          <Bar 
            dataKey="amount" 
            fill="#3b82f6" 
            radius={[8, 8, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
