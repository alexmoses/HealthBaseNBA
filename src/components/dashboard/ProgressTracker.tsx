import React from "react";
import ProgressWidget from "./ProgressWidget";
import { Card } from "@/components/ui/card";

interface ProgressTrackerProps {
  metrics?: Array<{
    title: string;
    currentValue: number;
    targetValue: number;
    streakCount: number;
    metric: string;
    showMilestone: boolean;
  }>;
}

const ProgressTracker = ({
  metrics = [
    {
      title: "Daily Steps",
      currentValue: 7500,
      targetValue: 10000,
      streakCount: 5,
      metric: "steps",
      showMilestone: true,
    },
    {
      title: "Water Intake",
      currentValue: 6,
      targetValue: 8,
      streakCount: 3,
      metric: "glasses",
      showMilestone: false,
    },
    {
      title: "Sleep",
      currentValue: 7,
      targetValue: 8,
      streakCount: 4,
      metric: "hours",
      showMilestone: false,
    },
    {
      title: "Meditation",
      currentValue: 15,
      targetValue: 20,
      streakCount: 2,
      metric: "minutes",
      showMilestone: false,
    },
  ],
}: ProgressTrackerProps) => {
  return (
    <Card className="p-6 bg-white w-full h-[320px] overflow-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Progress Tracking
      </h2>
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
        {metrics.map((metric, index) => (
          <ProgressWidget
            key={index}
            title={metric.title}
            currentValue={metric.currentValue}
            targetValue={metric.targetValue}
            streakCount={metric.streakCount}
            metric={metric.metric}
            showMilestone={metric.showMilestone}
          />
        ))}
      </div>
    </Card>
  );
};

export default ProgressTracker;
