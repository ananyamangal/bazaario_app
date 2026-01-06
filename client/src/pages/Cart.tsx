import { useCart, useRemoveFromCart, useUpdateCartItem } from "@/hooks/use-bazaario";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Cart() {
  const { data: cartItems, isLoading } = useCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveFromCart();

  const total = cartItems?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) || 0;

  if (isLoading) return <div className="p-8 text-center">Loading cart...</div>;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-2">Your Bag is Empty</h2>
        <p className="text-muted-foreground mb-8 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/">
          <Button className="rounded-xl h-12 px-8 shadow-lg shadow-primary/20">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32 pt-4 px-4 min-h-screen bg-muted/10">
      <h1 className="text-3xl font-display font-bold mb-6">Shopping Bag</h1>
      
      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-card rounded-2xl p-3 flex gap-4 shadow-sm border border-border/40">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted shrink-0">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="font-bold text-sm line-clamp-2">{item.product.name}</h3>
                <p className="text-primary font-bold mt-1">₹{item.product.price}</p>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-1">
                  <button 
                    onClick={() => updateMutation.mutate({ id: item.id, quantity: Math.max(1, item.quantity - 1) })}
                    disabled={item.quantity <= 1 || updateMutation.isPending}
                    className="w-7 h-7 flex items-center justify-center rounded-md bg-white shadow-sm disabled:opacity-50"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-semibold w-3 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateMutation.mutate({ id: item.id, quantity: item.quantity + 1 })}
                    disabled={updateMutation.isPending}
                    className="w-7 h-7 flex items-center justify-center rounded-md bg-white shadow-sm"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeMutation.mutate(item.id)}
                  disabled={removeMutation.isPending}
                  className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border p-6 shadow-2xl rounded-t-3xl">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">₹{total}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
             <span className="text-muted-foreground">Shipping</span>
             <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="border-t border-border/50 my-2" />
          <div className="flex justify-between items-center text-lg font-bold mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          
          <Button className="w-full h-14 rounded-xl text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
