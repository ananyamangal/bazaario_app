import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import logoImg from "@images/Screenshot 2026-01-14 at 6.51.34 PM.png";

export default function VerifyOtp() {
  const [, setLocation] = useLocation();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      sessionStorage.setItem("bazaario_authed", "1");
      setIsLoading(false);
      setLocation("/");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center p-6">
      <div className="max-w-sm mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <img
            src={logoImg}
            alt="Bazaario"
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl object-contain mb-4 mx-auto"
            draggable={false}
          />
          <h1 className="text-2xl font-display font-bold tracking-tight">Verify OTP</h1>
          <p className="text-muted-foreground">Enter the OTP sent to your phone</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                placeholder="Enter 4-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="h-12 rounded-xl border-2 focus-visible:ring-primary/20 text-center tracking-widest text-lg"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
}
