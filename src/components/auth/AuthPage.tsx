import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Github, Mail, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate, useSearchParams } from "react-router-dom";

export function AuthPage() {
  const [email, setEmail] = useState("demo@healthcoach.ai");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Create default user if it doesn't exist
    const createDefaultUser = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: "demo@healthcoach.ai",
        password: "demo123",
      });

      if (data.user && !error) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
          full_name: "Demo User",
        });
      }
    };

    createDefaultUser();
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError, data } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        if (signInError.message.includes("Email not confirmed")) {
          setError(
            "Please check your email to confirm your account before logging in.",
          );
          return;
        }
        throw signInError;
      }

      if (data?.user) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth?confirmed=true`,
        },
      });

      if (error) throw error;

      if (data.user) {
        if (data.session === null) {
          setConfirmationSent(true);
        } else {
          await supabase.from("profiles").insert({
            id: data.user.id,
            email: data.user.email,
            full_name: email.split("@")[0],
          });
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmation = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });
      if (error) throw error;
      setConfirmationSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (confirmationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md p-6 bg-white text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a confirmation link to <strong>{email}</strong>. Please
            check your email and click the link to activate your account.
          </p>
          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={resendConfirmation}
            disabled={loading}
          >
            {loading ? "Sending..." : "Resend Confirmation Email"}
          </Button>
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or click above to
            resend.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6 bg-white">
        <Tabs
          defaultValue={searchParams.get("tab") || "login"}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Magic Link
              </Button>
            </div>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}

export default AuthPage;
