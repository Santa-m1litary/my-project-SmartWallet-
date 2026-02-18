import { Card } from "./ui/card";
import { MoreVertical, Plus } from "lucide-react";
import { Button } from "./ui/button";

interface CardData {
  id: string;
  type: string;
  lastFour: string;
  balance: number;
  color: string;
}

const cards: CardData[] = [
  {
    id: "1",
    type: "Visa",
    lastFour: "4532",
    balance: 8450.25,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "2",
    type: "Mastercard",
    lastFour: "8976",
    balance: 3240.10,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "3",
    type: "American Express",
    lastFour: "2389",
    balance: 1850.00,
    color: "from-gray-700 to-gray-900",
  },
];

export function CardsView() {
  return (
    <div className="px-4 pt-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Cards</h2>
        <Button size="icon" variant="outline" className="rounded-full">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`bg-gradient-to-br ${card.color} text-white p-6 relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-white/80 text-sm mb-1">Balance</p>
                  <p className="text-2xl font-bold">
                    ${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/80 text-xs mb-1">Card Number</p>
                  <p className="font-mono tracking-wider">
                    •••• •••• •••• {card.lastFour}
                  </p>
                </div>
                <p className="text-lg font-semibold">{card.type}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-6 border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-2 min-h-[120px] cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
          <Plus className="h-6 w-6" />
        </div>
        <p className="font-medium text-gray-700">Add New Card</p>
      </Card>
    </div>
  );
}
