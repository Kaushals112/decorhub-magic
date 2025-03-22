
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Category } from "@/lib/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Sample gallery data
const galleryItems = Array(12).fill(null).map((_, index) => ({
  id: String(index + 1),
  image: "/placeholder.svg",
  title: `Decoration Setup ${index + 1}`,
  category: Object.values(Category)[index % Object.values(Category).length],
  description: "Beautiful decoration setup for a special occasion with flowers and balloons."
}));

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  // Filter categories
  const categories = ["All", ...Object.values(Category)];
  
  // Filter gallery items based on selected category
  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);
  
  // Handle image click to open lightbox
  const openLightbox = (imageId: string) => {
    const index = galleryItems.findIndex(item => item.id === imageId);
    setSelectedImage(imageId);
    setCurrentImageIndex(index);
  };
  
  // Navigate to next/previous image in lightbox
  const navigateImage = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentImageIndex((prev) => 
        prev === galleryItems.length - 1 ? 0 : prev + 1
      );
      setSelectedImage(galleryItems[currentImageIndex === galleryItems.length - 1 ? 0 : currentImageIndex + 1].id);
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? galleryItems.length - 1 : prev - 1
      );
      setSelectedImage(galleryItems[currentImageIndex === 0 ? galleryItems.length - 1 : currentImageIndex - 1].id);
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-sage-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 animate-fade-in">
            Our Decoration Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Browse through our portfolio of stunning flower and balloon decorations for various events and occasions.
          </p>
        </div>
      </section>
      
      {/* Gallery Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="group relative rounded-lg overflow-hidden h-72 shadow-sm hover:shadow-md transition-all animate-fade-in cursor-pointer"
                onClick={() => openLightbox(item.id)}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <span className="inline-block text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-serif font-medium">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-800 mb-2">No items found</h3>
              <p className="text-gray-600">
                Try selecting a different category filter
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Image Lightbox */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90">
            <div className="relative h-[80vh] flex items-center justify-center">
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-200 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>
              
              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img 
                  src={galleryItems[currentImageIndex].image} 
                  alt={galleryItems[currentImageIndex].title} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Navigation Buttons */}
              <button 
                className="absolute left-4 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                className="absolute right-4 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-xl font-serif font-medium">{galleryItems[currentImageIndex].title}</h3>
                <p className="text-white/80">{galleryItems[currentImageIndex].description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
