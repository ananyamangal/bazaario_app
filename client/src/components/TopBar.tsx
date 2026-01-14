import { Bell, Search } from "lucide-react";
import { Link, useLocation } from "wouter";

export function TopBar() {
  const [location] = useLocation();
  
  // Hide on onboarding, login, or screens that have their own headers like video call
  if (
    ["/onboarding", "/login", "/auth", "/video-call"].includes(location) ||
    location.startsWith("/register")
  )
    return null;

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold font-display text-lg shadow-sm">
            B
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-primary">
            Bazaario
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
          <button className="touch-target rounded-full hover:bg-muted/50 transition-colors">
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <button className="touch-target rounded-full hover:bg-muted/50 transition-colors relative">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
