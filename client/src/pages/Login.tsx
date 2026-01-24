import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import logoImg from "@images/Screenshot 2026-01-14 at 6.51.34 PM.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("customer");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/verify-otp");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center p-6">
      <div className="max-w-sm mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <img
            src={logoImg}
            alt="Bazaario"
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl object-contain mb-4 mx-auto"
            draggable={false}
          />
          <h1 className="text-3xl font-display font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue to Bazaario</p>
        </div>

        <Tabs defaultValue="customer" className="w-full" onValueChange={setRole}>
          <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-xl h-12">
            <TabsTrigger 
              value="customer" 
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
            >
              Customer
            </TabsTrigger>
            <TabsTrigger 
              value="seller"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
            >
              Seller
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
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
            
            {role === "seller" && (
              <div className="space-y-2">
                <Label htmlFor="store-code">Store Code (Optional)</Label>
                <Input 
                  id="store-code" 
                  placeholder="STORE123" 
                  className="h-12 rounded-xl border-2 focus-visible:ring-primary/20"
                />
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Send OTP"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
