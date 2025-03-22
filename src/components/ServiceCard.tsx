
import React from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Heart } from "lucide-react";

interface ServiceCardProps {
  service: Product;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group relative wedding-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all animate-fade-in">
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white shadow-sm">
          <Heart className="h-4 w-4 text-primary" />
        </button>
      </div>
      
      <div 
        className="h-60 bg-gray-100 overflow-hidden"
        style={{
          backgroundImage: `url(${service.images[0] || "/placeholder.svg"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="h-full w-full bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-medium">{service.name}</h3>
          <span className="px-3 py-1 bg-secondary/50 text-primary rounded-full text-sm font-medium shadow-sm">
            ₹{service.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-2">{service.description}</p>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={() => addToCart(service)}
            className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            variant="outline"
            className="flex-1 border-secondary hover:bg-secondary/20 text-primary hover:text-primary/80"
            onClick={() => {
              addToCart(service);
              // Open the cart or show a confirmation message
            }}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
