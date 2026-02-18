import { 
  ShoppingBag, 
  Utensils, 
  Car, 
  Home, 
  Briefcase,
  Coffee,
  Film,
  Plane 
} from "lucide-react";
import { Card } from "./ui/card";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "expense" | "income";
}

const categoryIcons: Record<string, React.ReactNode> = {
  shopping: <ShoppingBag className="h-5 w-5" />,
  food: <Utensils className="h-5 w-5" />,
  transport: <Car className="h-5 w-5" />,
  bills: <Home className="h-5 w-5" />,
  salary: <Briefcase className="h-5 w-5" />,
  coffee: <Coffee className="h-5 w-5" />,
  entertainment: <Film className="h-5 w-5" />,
  travel: <Plane className="h-5 w-5" />,
};

const transactions: Transaction[] = [
  {
    id: "1",
    name: "Salary Deposit",
    category: "salary",
    amount: 5000,
    date: "Today",
    type: "income",
  },
  {
    id: "2",
    name: "Starbucks",
    category: "coffee",
    amount: 8.50,
    date: "Today",
    type: "expense",
  },
  {
    id: "3",
    name: "Uber Ride",
    category: "transport",
    amount: 15.20,
    date: "Yesterday",
    type: "expense",
  },
  {
    id: "4",
    name: "Netflix Subscription",
    category: "entertainment",
    amount: 15.99,
    date: "Yesterday",
    type: "expense",
  },
  {
    id: "5",
    name: "Grocery Store",
    category: "shopping",
    amount: 87.45,
    date: "2 days ago",
    type: "expense",
  },
  {
    id: "6",
    name: "Restaurant",
    category: "food",
    amount: 45.00,
    date: "3 days ago",
    type: "expense",
  },
];

export function TransactionList() {
  return (
    <div className="px-4 mt-6 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Transactions</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          See All
        </button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                transaction.type === "income" 
                  ? "bg-green-100 text-green-600" 
                  : "bg-gray-100 text-gray-600"
              }`}>
                {categoryIcons[transaction.category]}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{transaction.name}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              
              <p className={`font-semibold ${
                transaction.type === "income" 
                  ? "text-green-600" 
                  : "text-gray-900"
              }`}>
                {transaction.type === "income" ? "+" : "-"}
                ${transaction.amount.toFixed(2)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
