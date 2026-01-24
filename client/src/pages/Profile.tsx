import { useEffect, useState } from "react";
import { User, Settings, Package, Heart, LogOut, ChevronRight, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocation } from "wouter";

export default function Profile() {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation("/login");
  };

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bazaario_theme");
      const initial = saved ? saved === "dark" : document.documentElement.classList.contains("dark");
      setIsDark(initial);
    } catch (e) {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = (val?: boolean) => {
    const next = typeof val === "boolean" ? val : !isDark;
    setIsDark(next);
    try {
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("bazaario_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("bazaario_theme", "light");
      }
    } catch (e) {
      // ignore
    }
  };

  const menuItems = [
    { icon: Package, label: "My Orders", href: "/orders" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-muted/10">
      <h1 className="text-3xl font-display font-bold mb-6">My Profile</h1>
      
      <div className="bg-card rounded-3xl p-6 shadow-sm border border-border/50 mb-6 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-background shadow-sm">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Rohan Sharma</h2>
          <p className="text-muted-foreground text-sm">+91 98765 43210</p>
          <button className="text-primary text-sm font-semibold mt-1">Edit Profile</button>
        </div>
      </div>

      <div className="bg-card rounded-3xl shadow-sm border border-border/50 overflow-hidden mb-6">
        {menuItems.map((item, i) => (
          <div key={item.label}>
             <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                   <item.icon className="w-5 h-5" />
                 </div>
                 <span className="font-medium">{item.label}</span>
               </div>
               <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
             </button>
             {i !== menuItems.length - 1 && <div className="h-[1px] bg-border/50 mx-4" />}
          </div>
        ))}
      </div>
      
         <div className="bg-card rounded-3xl p-4 shadow-sm border border-border/50 mb-8 flex items-center justify-between">
         <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
             <Moon className="w-5 h-5" />
           </div>
           <span className="font-medium">Dark Mode</span>
         </div>
         <Switch checked={isDark} onCheckedChange={toggleTheme} />
      </div>

      <Button 
        variant="destructive" 
        className="w-full h-12 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100 shadow-none"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>
    </div>
  );
}
