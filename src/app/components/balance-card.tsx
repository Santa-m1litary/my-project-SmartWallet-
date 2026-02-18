import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

interface BalanceCardProps {
  balance: number;
  monthlyChange: number;
}

export function BalanceCard({ balance, monthlyChange }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 mx-4 mt-4">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-blue-100 text-sm mb-2">Total Balance</p>
          <h2 className="text-3xl font-bold">
            {showBalance ? `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">+{monthlyChange}%</span>
        </div>
        <span className="text-sm text-blue-100">vs last month</span>
      </div>
    </Card>
  );
}
