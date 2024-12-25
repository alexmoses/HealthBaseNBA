import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Plan {
  id: string;
  name: string;
  price: string;
  interval: string;
  features: string[];
  highlighted?: boolean;
}

interface SubscriptionManagerProps {
  currentPlan?: string;
  onSubscribe?: (planId: string) => void;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$0",
    interval: "month",
    features: [
      "Basic health tracking",
      "Daily activity logging",
      "Limited insights",
      "Community access",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    interval: "month",
    features: [
      "Advanced health analytics",
      "Unlimited activity tracking",
      "Personalized AI insights",
      "Priority support",
      "Custom goals",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19.99",
    interval: "month",
    features: [
      "Everything in Pro",
      "1-on-1 coaching",
      "Custom meal plans",
      "Advanced analytics",
      "Family accounts",
    ],
  },
];

export function SubscriptionManager({
  currentPlan,
  onSubscribe,
}: SubscriptionManagerProps) {
  const handleSubscribe = async (planId: string) => {
    try {
      // Here you would typically:
      // 1. Create a Stripe checkout session
      // 2. Redirect to Stripe checkout
      // 3. Handle webhook for successful payment
      // 4. Update user's subscription in Supabase
      onSubscribe?.(planId);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="mt-4 text-lg text-gray-600">
            Select the perfect plan for your health journey
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col p-8 ${
                plan.highlighted
                  ? "border-2 border-primary ring-2 ring-primary ring-opacity-50"
                  : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  {plan.highlighted && (
                    <Badge variant="secondary">
                      <Star className="mr-1 h-4 w-4" /> Popular
                    </Badge>
                  )}
                </div>

                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold">/</span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    {plan.interval}
                  </span>
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handleSubscribe(plan.id)}
                className={`mt-8 w-full ${plan.highlighted ? "bg-primary" : ""}`}
                variant={plan.highlighted ? "default" : "outline"}
              >
                {currentPlan === plan.id ? (
                  "Current Plan"
                ) : (
                  <>
                    Get Started
                    <Zap className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Prices in USD. Cancel anytime. All plans include a 14-day free trial.
        </div>
      </div>
    </div>
  );
}

export default SubscriptionManager;
