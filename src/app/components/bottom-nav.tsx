import { Home, CreditCard, TrendingUp, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "cards", icon: CreditCard, label: "Cards" },
    { id: "stats", icon: TrendingUp, label: "Stats" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 max-w-lg mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
