import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import splashImage from "@images/Screenshot 2026-01-14 at 4.18.41 PM.png";

export default function Register() {
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

          <div className="px-6 pt-4 pb-10">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-display font-bold tracking-tight">
                Join Bazaario
              </h1>
              <p className="text-muted-foreground">
                Choose how you want to use Bazaario.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <Button
                className="w-full h-14 rounded-2xl text-lg shadow-lg shadow-primary/20 active:scale-[0.99]"
                onClick={() => setLocation("/register/customer")}
              >
                Join as Customer
              </Button>

              <Button
                variant="secondary"
                className="w-full h-14 rounded-2xl text-lg"
                onClick={() => setLocation("/register/seller")}
              >
                Join as Seller
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                className="underline underline-offset-4 hover:text-primary"
                onClick={() => setLocation("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


