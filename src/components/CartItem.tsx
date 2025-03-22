
import React from "react";
import { CartItem as CartItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-start gap-4 animate-fade-in">
      <div 
        className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0 bg-muted"
        style={{
          backgroundImage: `url(${product.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium">{product.name}</h4>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full"
            onClick={() => removeFromCart(product.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <span className="font-medium">
            ₹{(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
