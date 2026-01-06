import { useMarkets, useStores, useCategories } from "@/hooks/use-bazaario";
import { Link } from "wouter";
import { ArrowRight, Star, Video } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: markets, isLoading: marketsLoading } = useMarkets();
  const { data: stores, isLoading: storesLoading } = useStores();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  return (
    <div className="pb-24 pt-4">
      {/* Hero Section */}
      <section className="px-4 mb-8">
        <div className="relative rounded-3xl overflow-hidden h-48 shadow-lg group cursor-pointer">
          {/* Unsplash image: Busy Indian Market Scene */}
          <img 
            src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=1200" 
            alt="Hero" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-6">
            <h1 className="text-3xl font-display font-bold text-white mb-2 max-w-[200px]">
              Shop from Offline Stores
            </h1>
            <p className="text-white/80 mb-4 text-sm font-medium">Original prices, authentic goods</p>
            <button className="bg-primary text-white px-5 py-2 rounded-full w-fit text-sm font-semibold shadow-lg shadow-primary/30 active:scale-95 transition-all">
              Start Exploring
            </button>
          </div>
        </div>
      </section>

      {/* Featured Markets */}
      <section className="mb-8">
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-xl font-display font-bold">Popular Markets</h2>
          <Link href="/explore" className="text-primary text-sm font-semibold flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar snap-x">
          {marketsLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="min-w-[140px] h-[180px] bg-muted animate-pulse rounded-2xl" />
            ))
          ) : (
            markets?.slice(0, 5).map((market) => (
              <Link key={market.id} href={`/markets/${market.id}`} className="min-w-[140px] snap-start">
                <div className="relative h-[180px] rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                  <img 
                    src={market.imageUrl} 
                    alt={market.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                    <h3 className="text-white font-bold text-lg leading-tight">{market.name}</h3>
                    <div className="flex items-center text-yellow-400 text-xs mt-1 font-medium">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      {market.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mb-8 px-4">
        <h2 className="text-xl font-display font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-4">
          {categoriesLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
                <div className="w-12 h-3 bg-muted animate-pulse rounded" />
              </div>
            ))
          ) : (
            categories?.slice(0, 8).map((cat) => (
              <Link key={cat.id} href={`/explore?category=${cat.id}`} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {/* Assuming icon is URL or using Lucide based on name, simplified here */}
                  <img src={cat.imageUrl || `https://source.unsplash.com/100x100/?${cat.name}`} alt={cat.name} className="w-full h-full object-cover rounded-full opacity-90" />
                </div>
                <span className="text-xs font-medium text-center line-clamp-1">{cat.name}</span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Featured Stores */}
      <section className="px-4">
        <h2 className="text-xl font-display font-bold mb-4">Top Stores</h2>
        <div className="grid gap-4">
          {storesLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
            ))
          ) : (
            stores?.slice(0, 4).map((store) => (
              <div key={store.id} className="bg-card border border-border/50 rounded-2xl p-3 flex gap-4 shadow-sm hover:shadow-md transition-all">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                  <img src={store.imageUrl} alt={store.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-lg leading-tight line-clamp-1">{store.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{store.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs font-medium text-muted-foreground">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      {store.rating} Rating
                    </div>
                    <Link href={`/stores/${store.id}`}>
                      <button className="text-primary text-xs font-bold border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-lg flex items-center hover:bg-primary hover:text-white transition-all">
                        <Video className="w-3 h-3 mr-1.5" />
                        Visit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
