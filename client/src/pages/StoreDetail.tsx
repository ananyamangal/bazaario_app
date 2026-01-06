import { useRoute, Link } from "wouter";
import { useStore, useProducts, useAddToCart } from "@/hooks/use-bazaario";
import { ArrowLeft, Video, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function StoreDetail() {
  const [, params] = useRoute("/stores/:id");
  const id = parseInt(params?.id || "0");
  const { toast } = useToast();
  
  const { data: store, isLoading: storeLoading } = useStore(id);
  const { data: products, isLoading: productsLoading } = useProducts({ storeId: String(id) });
  const addToCartMutation = useAddToCart();

  if (storeLoading || !store) return <div className="p-8 text-center">Loading store...</div>;

  const handleAddToCart = (productId: number) => {
    addToCartMutation.mutate({ productId, quantity: 1 }, {
      onSuccess: () => {
        toast({
          title: "Added to cart",
          description: "Item has been added to your shopping bag",
          duration: 2000,
        });
      }
    });
  };

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center px-4 h-14 gap-4">
          <Link href={`/markets/${store.marketId}`}>
            <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center -ml-2 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-lg line-clamp-1">{store.name}</h1>
            <p className="text-xs text-muted-foreground">Store ID: {store.id}</p>
          </div>
          <Link href={`/video-call?storeId=${store.id}`}>
            <Button size="sm" className="bg-primary rounded-full w-9 h-9 p-0 shadow-lg shadow-primary/20">
              <Video className="w-4 h-4 text-white" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-4">
        {/* Store Info Card */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-6 mb-8 flex items-center gap-4">
           <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
             <img src={store.imageUrl} alt={store.name} className="w-full h-full object-cover" />
           </div>
           <div>
             <p className="text-sm text-foreground/80 font-medium leading-relaxed">
               {store.description || "Welcome to our digital storefront. Browse our latest collection below."}
             </p>
             <div className="mt-2 flex items-center gap-2 text-xs font-bold text-primary">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               Accepting Video Calls
             </div>
           </div>
        </div>

        <h2 className="text-xl font-display font-bold mb-4">Latest Products</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {productsLoading ? (
             Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />
            ))
          ) : (
            products?.map(product => (
              <div key={product.id} className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-all">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest">
                      Out of Stock
                    </div>
                  )}
                  {product.inStock && (
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      disabled={addToCartMutation.isPending}
                      className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      {addToCartMutation.isPending ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/> : <Plus className="w-5 h-5" />}
                    </button>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1 mb-1">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-base">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                    )}
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
