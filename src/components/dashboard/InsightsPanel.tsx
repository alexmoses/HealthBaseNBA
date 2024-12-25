import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, Activity, ArrowRight } from "lucide-react";

interface InsightItem {
  id: string;
  type: "pattern" | "suggestion" | "achievement";
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface InsightsPanelProps {
  insights?: InsightItem[];
}

const defaultInsights: InsightItem[] = [
  {
    id: "1",
    type: "pattern",
    title: "Sleep Pattern Detected",
    description:
      "You consistently get better sleep when you exercise in the morning.",
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "2",
    type: "suggestion",
    title: "Hydration Tip",
    description:
      "Try drinking water before meals to help with portion control.",
    icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: "3",
    type: "achievement",
    title: "Activity Milestone",
    description: "You're moving 20% more than last month!",
    icon: <Activity className="h-5 w-5 text-green-500" />,
  },
];

const InsightsPanel = ({ insights = defaultInsights }: InsightsPanelProps) => {
  return (
    <Card className="w-full h-[320px] bg-white p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          AI Health Insights
        </h2>
        <Button variant="ghost" size="sm" className="text-sm text-gray-500">
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Separator className="mb-4" />

      <ScrollArea className="flex-grow">
        <div className="space-y-4">
          {insights.map((insight) => (
            <Card
              key={insight.id}
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-gray-100">
                  {insight.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Separator className="my-4" />

      <div className="text-center text-sm text-gray-500">
        Updated 5 minutes ago
      </div>
    </Card>
  );
};

export default InsightsPanel;
