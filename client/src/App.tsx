import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNav } from "@/components/BottomNav";
import { TopBar } from "@/components/TopBar";

// Pages
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import MarketDetail from "@/pages/MarketDetail";
import StoreDetail from "@/pages/StoreDetail";
import VideoCall from "@/pages/VideoCall";
import Cart from "@/pages/Cart";
import Profile from "@/pages/Profile";
import Onboarding from "@/pages/Onboarding";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="max-w-lg mx-auto bg-background min-h-screen relative shadow-2xl shadow-black/5 overflow-hidden border-x border-border/40">
      <TopBar />
      <div className="min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/markets/:id" component={MarketDetail} />
          <Route path="/stores/:id" component={StoreDetail} />
          <Route path="/video" component={() => <VideoCall />} />
          <Route path="/video-call" component={VideoCall} />
          <Route path="/cart" component={Cart} />
          <Route path="/profile" component={Profile} />
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
