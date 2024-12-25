import React from "react";
import { Button } from "@/components/ui/button";
import {
  Activity,
  History,
  Plus,
  Droplets,
  Utensils,
  Moon,
} from "lucide-react";

interface QuickActionsProps {
  onActionClick?: (action: string) => void;
  actions?: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
  }>;
}

const QuickActions = ({
  onActionClick = () => {},
  actions = [
    {
      id: "log-exercise",
      label: "Log Exercise",
      icon: <Activity className="w-4 h-4" />,
    },
    {
      id: "log-water",
      label: "Log Water",
      icon: <Droplets className="w-4 h-4" />,
    },
    {
      id: "log-meal",
      label: "Log Meal",
      icon: <Utensils className="w-4 h-4" />,
    },
    { id: "log-sleep", label: "Log Sleep", icon: <Moon className="w-4 h-4" /> },
    {
      id: "view-history",
      label: "View History",
      icon: <History className="w-4 h-4" />,
    },
    {
      id: "add-activity",
      label: "Add Activity",
      icon: <Plus className="w-4 h-4" />,
    },
  ],
}: QuickActionsProps) => {
  return (
    <div className="w-full h-20 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-start gap-3 overflow-x-auto">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => onActionClick(action.id)}
          >
            {action.icon}
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
