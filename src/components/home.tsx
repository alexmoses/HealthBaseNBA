import { useAuth } from "@/hooks/useAuth";
import NextBestActionCard from "./dashboard/NextBestActionCard";
import ProgressTracker from "./dashboard/ProgressTracker";
import InsightsPanel from "./dashboard/InsightsPanel";
import QuickActions from "./dashboard/QuickActions";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

function Home() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
          <Button
            variant="outline"
            onClick={signOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="w-full">
            <NextBestActionCard />
          </div>
          <div className="w-full">
            <ProgressTracker />
          </div>
          <div className="w-full">
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
