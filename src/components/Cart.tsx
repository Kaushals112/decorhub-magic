
import React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, X, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page or process
    onClose();
    navigate("/contact", { state: { fromCart: true } });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col overflow-hidden">
        <SheetHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 font-serif text-2xl">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
              {totalItems > 0 && (
                <span className="ml-2 text-sm text-muted-foreground font-sans">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              )}
            </SheetTitle>
            <SheetClose className="rounded-full hover:bg-muted p-2 transition-colors">
              <X className="h-5 w-5" />
            </SheetClose>
          </div>
        </SheetHeader>
        
        <Separator />
        
        <div className="flex-grow overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-muted-foreground mt-1">
                Add beautiful decorations to your cart
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  onClose();
                  navigate("/services");
                }}
              >
                View Services
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <CartItem 
                  key={item.product.id} 
                  item={item} 
                />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <>
            <Separator />
            
            <div className="pt-4 pb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button 
                  className="flex-[2]"
                  onClick={handleCheckout}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
