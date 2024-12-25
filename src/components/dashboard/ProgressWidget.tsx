import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProgressWidgetProps {
  title?: string;
  currentValue?: number;
  targetValue?: number;
  streakCount?: number;
  metric?: string;
  showMilestone?: boolean;
}

const ProgressWidget = ({
  title = "Daily Steps",
  currentValue = 7500,
  targetValue = 10000,
  streakCount = 5,
  metric = "steps",
  showMilestone = false,
}: ProgressWidgetProps) => {
  const progress = Math.min((currentValue / targetValue) * 100, 100);

  return (
    <Card className="p-4 bg-white w-full hover:shadow-lg transition-shadow">
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          {showMilestone && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Milestone Achieved!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {currentValue.toLocaleString()} {metric}
            </span>
            <span>
              {targetValue.toLocaleString()} {metric}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center mt-2">
          <span className="text-xs text-gray-500">
            {streakCount} day streak
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProgressWidget;
