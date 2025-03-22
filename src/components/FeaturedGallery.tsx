
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";
import { useNavigate } from "react-router-dom";

// Sample gallery items - these would typically come from an API or CMS
const galleryItems = [
  {
    id: "1",
    image: "/placeholder.svg",
    category: Category.WEDDING,
    title: "Elegant Wedding Setup"
  },
  {
    id: "2",
    image: "/placeholder.svg",
    category: Category.BIRTHDAY,
    title: "Colorful Birthday Decor"
  },
  {
    id: "3",
    image: "/placeholder.svg",
    category: Category.CORPORATE,
    title: "Professional Corporate Event"
  },
  {
    id: "4",
    image: "/placeholder.svg",
    category: Category.FESTIVAL,
    title: "Seasonal Festival Arrangements"
  },
  {
    id: "5",
    image: "/placeholder.svg",
    category: Category.WEDDING,
    title: "Romantic Wedding Arch"
  },
  {
    id: "6",
    image: "/placeholder.svg",
    category: Category.BIRTHDAY,
    title: "Themed Birthday Celebration"
  }
];

// Available filter categories
const categories = [
  "All",
  ...Object.values(Category)
];

const FeaturedGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);
    
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 celebration-pattern">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-gray-600">
            Browse through our stunning decoration projects for weddings, birthdays, corporate events, and more.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group relative rounded-lg overflow-hidden h-80 bg-gray-100 shadow-md transition-all animate-zoom-in"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${
                  hoveredItem === item.id ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <span className="inline-block text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-serif text-white font-medium mb-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            onClick={() => navigate("/gallery")}
            variant="outline"
            size="lg"
            className="font-medium btn-hover glass"
          >
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGallery;
