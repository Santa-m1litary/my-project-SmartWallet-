import { ArrowDownLeft, ArrowUpRight, QrCode, Repeat } from "lucide-react";
import { Button } from "./ui/button";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function QuickActions() {
  const actions: QuickAction[] = [
    {
      icon: <ArrowUpRight className="h-5 w-5" />,
      label: "Send",
      onClick: () => console.log("Send"),
    },
    {
      icon: <ArrowDownLeft className="h-5 w-5" />,
      label: "Request",
      onClick: () => console.log("Request"),
    },
    {
      icon: <QrCode className="h-5 w-5" />,
      label: "Scan",
      onClick: () => console.log("Scan"),
    },
    {
      icon: <Repeat className="h-5 w-5" />,
      label: "Exchange",
      onClick: () => console.log("Exchange"),
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 px-4 mt-6">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            {action.icon}
          </div>
          <span className="text-xs text-gray-700">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
