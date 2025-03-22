
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const slideImages = [
  "/slide1.jpg",
  "/slide2.jpg",
  "/slide3.jpg"
];

// We'll provide static placeholders for the initial version
// Later these can be replaced with actual images
const placeholderImages = Array(3).fill("/placeholder.svg");

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Simulate image loading
  useEffect(() => {
    // In a real app, you would preload actual images
    const timer = setTimeout(() => {
      setLoadedImages(placeholderImages);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-secondary/30">
      {/* Image Slider */}
      <div className="absolute inset-0 z-0">
        {slideImages.map((_, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              currentSlide === index 
                ? "opacity-100" 
                : "opacity-0"
            }`}
          >
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out ${
                currentSlide === index ? "scale-105" : "scale-100"
              }`}
              style={{
                backgroundImage: `url(${loadedImages[index] || placeholderImages[index]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-primary/20" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in">
          <div className="glass mx-auto inline-block px-4 py-1 rounded-full mb-6 border-dashed">
            <p className="text-sm text-primary font-medium">Premium Wedding Decoration Services</p>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight wedding-decor">
            Create Your Perfect Wedding Day
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Vikash Vatika offers premium balloon and flower decorations for your special day, creating unforgettable memories for your wedding celebration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="font-medium wedding-btn"
              onClick={() => navigate("/services")}
            >
              Explore Services
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="font-medium bg-white/10 hover:bg-white/20 text-white border-white/30"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {slideImages.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === index 
                ? "w-8 bg-primary" 
                : "w-4 bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
