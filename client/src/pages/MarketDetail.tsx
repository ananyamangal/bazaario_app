import { useRoute, Link } from "wouter";
import { useMarket, useStores } from "@/hooks/use-bazaario";
import { ArrowLeft, Video, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MarketDetail() {
  const [, params] = useRoute("/markets/:id");
  const id = parseInt(params?.id || "0");
  
  const { data: market, isLoading: marketLoading } = useMarket(id);
  const { data: stores, isLoading: storesLoading } = useStores(String(id));

  if (marketLoading || !market) return <div className="p-8 text-center text-muted-foreground">Loading market...</div>;

  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Header Image */}
      <div className="relative h-64 w-full">
        <Link href="/explore">
          <button className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
        <img src={market.imageUrl} alt={market.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">{market.name}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center bg-muted/50 px-2 py-1 rounded-md">
              <MapPin className="w-4 h-4 mr-1" />
              {market.location}
            </span>
            <span className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md font-medium">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {market.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <p className="text-muted-foreground leading-relaxed mb-8">
          {market.description}
        </p>

        <h2 className="text-xl font-display font-bold mb-4">Shops in {market.name}</h2>
        
        <div className="grid gap-4">
          {storesLoading ? (
             Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
            ))
          ) : (
            stores?.map(store => (
              <div key={store.id} className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-muted">
                    <img src={store.imageUrl} alt={store.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{store.name}</h3>
                      {store.isOpen ? (
                        <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Open</span>
                      ) : (
                        <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Closed</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{store.description}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <Link href={`/stores/${store.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full rounded-lg text-xs font-semibold h-9">
                          Visit Shop
                        </Button>
                      </Link>
                      <Link href={`/video-call?storeId=${store.id}`}>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-lg text-xs font-semibold h-9 px-4 shadow-lg shadow-primary/20">
                          <Video className="w-3.5 h-3.5 mr-1.5" />
                          Call
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
