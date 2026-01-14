import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNav } from "@/components/BottomNav";
import { TopBar } from "@/components/TopBar";
import { useEffect, useMemo, useState } from "react";

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
import Auth from "@/pages/Auth";
import Register from "@/pages/Register";
import RegisterCustomer from "@/pages/RegisterCustomer";
import RegisterSeller from "@/pages/RegisterSeller";
import NotFound from "@/pages/not-found";
import splashImage from "@images/Screenshot 2026-01-14 at 4.18.41 PM.png";

function SplashScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <img
        src={splashImage}
        alt="Bazaario"
        className="w-full max-w-lg h-[520px] object-contain"
        draggable={false}
      />
    </div>
  );
}

function Router() {
  const [location, setLocation] = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  const isAuthed = useMemo(
    () => sessionStorage.getItem("bazaario_authed") === "1",
    [],
  );

  const isPublicRoute = useMemo(() => {
    return (path: string) =>
      path === "/auth" ||
      path === "/login" ||
      path === "/onboarding" ||
      path.startsWith("/register");
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setShowSplash(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showSplash) return;
    if (!isAuthed && !isPublicRoute(location)) setLocation("/auth");
    if (isAuthed && location === "/auth") setLocation("/");
  }, [isAuthed, isPublicRoute, location, setLocation, showSplash]);

  if (showSplash) {
    return (
      <div className="max-w-lg mx-auto bg-white min-h-screen relative shadow-2xl shadow-black/5 overflow-hidden border-x border-border/40">
        <SplashScreen />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-background min-h-screen relative shadow-2xl shadow-black/5 overflow-hidden border-x border-border/40">
      <TopBar />
      <div className="min-h-screen">
        <Switch>
          <Route path="/auth" component={Auth} />
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
          <Route path="/register" component={Register} />
          <Route path="/register/customer" component={RegisterCustomer} />
          <Route path="/register/seller" component={RegisterSeller} />
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
