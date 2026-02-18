import { Bell, Menu } from "lucide-react";
import { Button } from "./ui/button";

interface WalletHeaderProps {
  onMenuClick: () => void;
}

export function WalletHeader({ onMenuClick }: WalletHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-6 w-6" />
      </Button>
      <h1 className="font-semibold text-lg">SmartWallet</h1>
      <Button variant="ghost" size="icon">
        <Bell className="h-6 w-6" />
      </Button>
    </header>
  );
}
