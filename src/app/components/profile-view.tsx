import { Card } from "./ui/card";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight 
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const menuItems = [
  {
    icon: User,
    label: "Personal Information",
    description: "Manage your profile",
  },
  {
    icon: Settings,
    label: "Preferences",
    description: "App settings and customization",
  },
  {
    icon: Bell,
    label: "Notifications",
    description: "Manage notification settings",
  },
  {
    icon: Shield,
    label: "Security",
    description: "Password and 2FA settings",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    description: "Get help and contact us",
  },
];

export function ProfileView() {
  return (
    <div className="px-4 pt-6 pb-24">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-blue-600 text-white text-xl">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">John Doe</h3>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
          </div>
          <button className="text-blue-600 text-sm font-medium">Edit</button>
        </div>
      </Card>

      <div className="space-y-2 mb-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-4 cursor-pointer hover:bg-red-50 transition-colors border-red-200">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <LogOut className="h-5 w-5 text-red-600" />
          </div>
          <p className="font-medium text-red-600">Log Out</p>
        </div>
      </Card>
    </div>
  );
}
