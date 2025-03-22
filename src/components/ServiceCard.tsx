
import React from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface ServiceCardProps {
  service: Product;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md animate-fade-in">
      <div 
        className="h-60 bg-gray-100 overflow-hidden"
        style={{
          backgroundImage: `url(${service.images[0] || "/placeholder.svg"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="h-full w-full bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-medium">{service.name}</h3>
          <span className="px-3 py-1 bg-sage-50 text-sage-800 rounded-full text-sm font-medium">
            ₹{service.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-2">{service.description}</p>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={() => addToCart(service)}
            className="flex-1"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
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
