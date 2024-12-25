import NextBestActionCard from "./dashboard/NextBestActionCard";
import ProgressTracker from "./dashboard/ProgressTracker";
import InsightsPanel from "./dashboard/InsightsPanel";
import QuickActions from "./dashboard/QuickActions";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>

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
