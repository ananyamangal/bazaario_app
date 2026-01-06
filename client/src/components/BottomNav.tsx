import { Link, useLocation } from "wouter";
import { Home, Search, ShoppingBag, Video, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const tabs = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Video, label: "Call", href: "/video" },
    { icon: ShoppingBag, label: "Cart", href: "/cart" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  if (location === "/login" || location === "/onboarding") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border pb-safe-area shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = location === tab.href;
          return (
            <Link key={tab.label} href={tab.href} className="w-full h-full">
              <div 
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 cursor-pointer",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon 
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    isActive && "scale-110 stroke-[2.5px]"
                  )} 
                />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
