import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface NextBestActionProps {
  action?: {
    title: string;
    description: string;
    duration: string;
    impact: string;
  };
  onComplete?: () => void;
  onDismiss?: () => void;
  isCompleted?: boolean;
  showCelebration?: boolean;
}

const NextBestActionCard = ({
  action = {
    title: "Take a 10-minute walk",
    description: "A quick walk can boost your energy and help you stay active",
    duration: "10 mins",
    impact: "Improves cardiovascular health",
  },
  onComplete = () => {},
  onDismiss = () => {},
  isCompleted = false,
  showCelebration = false,
}: NextBestActionProps) => {
  const [showDialog, setShowDialog] = React.useState(true);

  return (
    <Card className="p-6 bg-white w-full h-[320px] relative overflow-hidden">
      {showCelebration && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-yellow-50 opacity-50 animate-pulse">
          <div className="absolute top-4 right-4">
            <Trophy className="h-8 w-8 text-yellow-500 animate-bounce" />
          </div>
        </div>
      )}

      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Next Best Action
          </h2>
          {isCompleted && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              Completed
            </span>
          )}
        </div>

        <div className="flex-grow space-y-4">
          <h3 className="text-xl font-medium text-gray-700">{action.title}</h3>
          <p className="text-gray-600">{action.description}</p>

          <div className="flex space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="font-medium">Duration:</span>
              <span className="ml-2">{action.duration}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">Impact:</span>
              <span className="ml-2">{action.impact}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={onDismiss}
            className="flex items-center"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Skip for now
          </Button>
          <Button
            onClick={onComplete}
            className="flex items-center bg-green-600 hover:bg-green-700"
            disabled={isCompleted}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {isCompleted ? "Completed" : "Complete Action"}
          </Button>
        </div>
      </div>

      {showCelebration && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Congratulations! 🎉</DialogTitle>
              <DialogDescription>
                You've completed your recommended action. Keep up the great work
                on your health journey!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default NextBestActionCard;
