import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, Brain, Heart, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32 px-4">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your Personal</span>
                  <span className="block text-primary">AI Health Coach</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Transform your health journey with personalized AI-driven
                  insights, actionable recommendations, and progress tracking.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="rounded-md shadow">
                    <Button
                      onClick={() => navigate("/auth?tab=register")}
                      size="lg"
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button
                      onClick={() => navigate("/auth?tab=login")}
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to improve your health
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-primary" />}
                title="AI-Powered Insights"
                description="Get personalized health recommendations based on your data and goals."
              />
              <FeatureCard
                icon={<Activity className="h-6 w-6 text-primary" />}
                title="Activity Tracking"
                description="Monitor your daily activities and build healthy habits."
              />
              <FeatureCard
                icon={<TrendingUp className="h-6 w-6 text-primary" />}
                title="Progress Analytics"
                description="Visualize your health journey with detailed analytics and trends."
              />
              <FeatureCard
                icon={<Heart className="h-6 w-6 text-primary" />}
                title="Health Community"
                description="Connect with others on their health journey and share experiences."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="absolute top-6 left-6">{icon}</div>
      <div className="ml-12">
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
}
