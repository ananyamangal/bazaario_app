import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterCustomer() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // After registering, send OTP and go to verification
      setLocation("/verify-otp");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-sm mx-auto w-full p-6">
        <button
          type="button"
          className="touch-target rounded-xl hover:bg-muted/50 transition-colors -ml-2"
          onClick={() => setLocation("/register")}
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="mt-4 space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tight">
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Name + phone number to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                className="h-12 rounded-xl border-2 focus-visible:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+91 98765 43210"
                type="tel"
                className="h-12 rounded-xl border-2 focus-visible:ring-primary/20"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
}


