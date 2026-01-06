import { useMarkets } from "@/hooks/use-bazaario";
import { Link } from "wouter";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Explore() {
  const { data: markets, isLoading } = useMarkets();

  return (
    <div className="pb-24 pt-4 px-4 min-h-screen">
      <h1 className="text-3xl font-display font-bold mb-6">Explore Markets</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          placeholder="Search markets, stores..." 
          className="pl-10 h-12 rounded-xl border-none bg-muted/50 focus-visible:ring-primary/20 focus-visible:bg-background transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-2xl" />
          ))
        ) : (
          markets?.map((market) => (
            <Link key={market.id} href={`/markets/${market.id}`}>
              <div className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={market.imageUrl} 
                    alt={market.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold flex items-center shadow-sm">
                    {market.rating} ★
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-1">{market.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3 mr-1" />
                    {market.location}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {market.description}
                  </p>
                  <button className="w-full py-2 rounded-xl bg-secondary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all">
                    View Stores
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
