import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  "Apparel",
  "Jewelry",
  "Footwear",
  "Decor",
  "Electronics",
  "Bags",
  "Fabrics",
] as const;

type Category = (typeof categories)[number];

export default function RegisterSeller() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [shopDescription, setShopDescription] = useState("");

  const [market, setMarket] = useState("");
  const [city, setCity] = useState("");
  const [shopAddress, setShopAddress] = useState("");

  const [selected, setSelected] = useState<Set<Category>>(new Set());

  const canGoNext = useMemo(() => {
    if (step === 0) return shopName.trim().length > 0 && ownerName.trim().length > 0;
    if (step === 1)
      return market.trim().length > 0 && city.trim().length > 0 && shopAddress.trim().length > 0;
    return selected.size > 0;
  }, [city, market, ownerName, selected.size, shopAddress, shopName, step]);

  const handleBack = () => {
    if (step === 0) setLocation("/register");
    else setStep((s) => (s === 2 ? 1 : 0));
  };

  const handleNext = () => {
    if (!canGoNext) return;
    setStep((s) => (s === 0 ? 1 : 2));
  };

  const toggleCategory = (c: Category) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const handleLaunch = () => {
    if (!canGoNext) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      sessionStorage.setItem("bazaario_authed", "1");
      setLocation("/");
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-sm mx-auto w-full p-6 flex-1 flex flex-col">
        <button
          type="button"
          className="touch-target rounded-xl hover:bg-muted/50 transition-colors -ml-2"
          onClick={handleBack}
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="mt-2 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={[
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-muted",
              ].join(" ")}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="mt-6 flex-1 flex flex-col">
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-bold tracking-tight">
                Tell us about your Shop
              </h1>
              <p className="text-muted-foreground">
                Create your digital storefront in seconds.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopName">Shop Name</Label>
                <Input
                  id="shopName"
                  placeholder="e.g. Ramesh Textiles"
                  className="h-12 rounded-xl border-2 focus-visible:ring-primary/20"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input
                  id="ownerName"
                  placeholder="Your Full Name"
                  className="h-12 rounded-xl border-2 focus-visible:ring-primary/20"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">Shop Description</Label>
                <Textarea
                  id="desc"
                  placeholder="What do you sell? Any specialties?"
                  className="min-h-[120px] rounded-xl border-2 focus-visible:ring-primary/20"
                  value={shopDescription}
                  onChange={(e) => setShopDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                className="w-full h-14 text-lg rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.99]"
                onClick={handleNext}
                disabled={!canGoNext}
              >
                Next step
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 flex-1 flex flex-col">
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-bold tracking-tight">
                Where are you located?
              </h1>
              <p className="text-muted-foreground">
                Help customers find your physical store.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="market">Market</Label>
                <Input
                  id="market"
                  placeholder="Sarojini Nagar"
                  className="h-12 rounded-xl border-2 focus-visible:ring-primary/20"
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New Delhi"
                  className="h-12 rounded-xl border-2 focus-visible:ring-primary/20"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addr">Shop Number / Address</Label>
                <Input
                  id="addr"
                  placeholder="Shop 12, Main lane"
                  className="h-12 rounded-xl border-2 focus-visible:ring-primary/20"
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <Button
                className="w-full h-14 text-lg rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.99]"
                onClick={handleNext}
                disabled={!canGoNext}
              >
                Proceed
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 flex-1 flex flex-col">
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-bold tracking-tight">
                What do you sell?
              </h1>
              <p className="text-muted-foreground">
                Select all categories that apply.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {categories.map((c) => {
                const checked = selected.has(c);
                return (
                  <button
                    key={c}
                    type="button"
                    className={[
                      "w-full rounded-xl border-2 p-4 text-left",
                      "flex items-center gap-3",
                      "transition-colors",
                      checked ? "border-primary bg-primary/5" : "border-border bg-background",
                    ].join(" ")}
                    onClick={() => toggleCategory(c)}
                  >
                    <Checkbox checked={checked} />
                    <span className="font-medium">{c}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 mt-auto grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-14 rounded-2xl border-2 text-lg"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="h-14 rounded-2xl text-lg shadow-lg shadow-primary/20 active:scale-[0.99]"
                onClick={handleLaunch}
                disabled={!canGoNext || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Launching…
                  </span>
                ) : (
                  "Launch shop"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


