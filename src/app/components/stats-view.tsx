import { Card } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

const spendingData = [
  { name: "Food & Dining", value: 850, color: "#3b82f6" },
  { name: "Shopping", value: 620, color: "#8b5cf6" },
  { name: "Transport", value: 340, color: "#06b6d4" },
  { name: "Entertainment", value: 280, color: "#f59e0b" },
  { name: "Bills", value: 520, color: "#ef4444" },
];

const categoryStats = [
  { name: "Food & Dining", amount: 850, change: 12, trend: "up" },
  { name: "Shopping", amount: 620, change: -5, trend: "down" },
  { name: "Transport", amount: 340, change: 8, trend: "up" },
  { name: "Entertainment", amount: 280, change: -15, trend: "down" },
  { name: "Bills", amount: 520, change: 0, trend: "neutral" },
];

export function StatsView() {
  const totalSpending = spendingData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="px-4 pt-6 pb-24">
      <h2 className="text-2xl font-bold mb-6">Spending Analytics</h2>

      <Card className="p-6 mb-6">
        <h3 className="font-semibold mb-4">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={spendingData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {spendingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-sm text-gray-600">
                  {value} - ${entry.payload.value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">Total Spending</p>
          <p className="text-2xl font-bold">${totalSpending.toLocaleString()}</p>
        </div>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold">Category Breakdown</h3>
        {categoryStats.map((category) => {
          const percentage = ((category.amount / totalSpending) * 100).toFixed(1);
          
          return (
            <Card key={category.name} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{category.name}</p>
                <div className="flex items-center gap-2">
                  {category.trend === "up" && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{category.change}%</span>
                    </div>
                  )}
                  {category.trend === "down" && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingDown className="h-4 w-4" />
                      <span>{category.change}%</span>
                    </div>
                  )}
                  <p className="font-semibold">${category.amount}</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{percentage}% of total</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
