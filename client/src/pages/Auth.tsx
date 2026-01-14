import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import splashImage from "@images/Screenshot 2026-01-14 at 4.18.41 PM.png";

export default function Auth() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-lg">
          <div className="px-6 pt-10">
            <img
              src={splashImage}
              alt="Bazaario"
              className="w-full h-[260px] object-contain"
              draggable={false}
            />
          </div>

          <div className="px-6 pt-6 pb-10">
            <div className="text-center">
              <div className="text-3xl font-display font-extrabold tracking-[0.25em] text-primary">
                BAZAARIO
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <Button
                className="w-full h-14 rounded-2xl text-lg shadow-lg shadow-primary/20 active:scale-[0.99]"
                onClick={() => setLocation("/login")}
              >
                Login
              </Button>

              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl text-lg border-2"
                onClick={() => setLocation("/register")}
              >
                Register
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <div className="text-xs text-muted-foreground">Or login with</div>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                className={cn(
                  "w-full h-12 rounded-xl border bg-white",
                  "flex items-center justify-center gap-3",
                  "shadow-sm hover:bg-muted/30 transition-colors",
                )}
                onClick={() => {}}
              >
                <FaGoogle className="text-base" />
                <span className="font-medium text-sm">Google</span>
              </button>

              <button
                type="button"
                className={cn(
                  "w-full h-12 rounded-xl",
                  "flex items-center justify-center gap-3",
                  "bg-[#1877F2] text-white",
                  "shadow-sm hover:brightness-95 transition",
                )}
                onClick={() => {}}
              >
                <FaFacebookF className="text-base" />
                <span className="font-medium text-sm">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


