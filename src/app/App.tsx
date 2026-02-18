import { useState } from "react";
import { WalletHeader } from "./components/wallet-header";
import { BalanceCard } from "./components/balance-card";
import { QuickActions } from "./components/quick-actions";
import { SpendingChart } from "./components/spending-chart";
import { TransactionList } from "./components/transaction-list";
import { BottomNav } from "./components/bottom-nav";
import { CardsView } from "./components/cards-view";
import { StatsView } from "./components/stats-view";
import { ProfileView } from "./components/profile-view";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <BalanceCard balance={12450.75} monthlyChange={8.5} />
            <QuickActions />
            <SpendingChart />
            <TransactionList />
          </>
        );
      case "cards":
        return <CardsView />;
      case "stats":
        return <StatsView />;
      case "profile":
        return <ProfileView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-lg mx-auto relative">
      <WalletHeader onMenuClick={() => console.log("Menu clicked")} />
      <main className="pb-4">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
