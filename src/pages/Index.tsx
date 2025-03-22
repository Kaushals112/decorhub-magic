
import React from "react";
import Hero from "@/components/Hero";
import FeaturedGallery from "@/components/FeaturedGallery";
import TestimonialCard from "@/components/TestimonialCard";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { Category, Testimonial, Product } from "@/lib/types";
import ServiceCard from "@/components/ServiceCard";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Sparkles, Heart, Users } from "lucide-react";

// Sample featured services
const featuredServices: Product[] = [
  {
    id: "service1",
    name: "Wedding Decoration Package",
    description: "Complete wedding decoration including flower arrangements, balloon setups, and stage decor for your perfect day.",
    price: 25000,
    category: Category.WEDDING,
    images: ["/placeholder.svg"],
    featured: true
  },
  {
    id: "service2",
    name: "Birthday Party Decoration",
    description: "Colorful and fun decorations to make your birthday celebration memorable with balloons, flowers, and themed setups.",
    price: 8500,
    category: Category.BIRTHDAY,
    images: ["/placeholder.svg"],
    featured: true
  },
  {
    id: "service3",
    name: "Corporate Event Setup",
    description: "Professional decor solutions for corporate events, conferences, and product launches to impress your clients.",
    price: 15000,
    category: Category.CORPORATE,
    images: ["/placeholder.svg"],
    featured: true
  }
];

// Sample testimonials
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Wedding Client",
    content: "The flower decorations for our wedding were absolutely stunning! Vikash Vatika Decoration exceeded our expectations and made our day truly special.",
    rating: 5
  },
  {
    id: "2",
    name: "Rahul Gupta",
    role: "Corporate Event",
    content: "Their decoration turned our ordinary office party into an extraordinary event. The attention to detail and professionalism were impressive.",
    rating: 5
  },
  {
    id: "3",
    name: "Anjali Mehta",
    role: "Birthday Celebration",
    content: "My daughter's birthday party looked magical with all the balloon arrangements. Will definitely hire them again for future events!",
    rating: 4
  }
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 section-bg-pattern">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Vikash Vatika
            </h2>
            <p className="text-lg text-gray-600">
              We provide exceptional decoration services with attention to detail and a commitment to creating memorable experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Premium Quality",
                description: "We use only the finest flowers and high-quality balloons for all our decoration projects."
              },
              {
                icon: Calendar,
                title: "Timely Delivery",
                description: "Our team ensures that everything is set up perfectly on time for your event."
              },
              {
                icon: Heart,
                title: "Personalized Design",
                description: "We create custom decoration designs tailored to your specific preferences and event theme."
              },
              {
                icon: Users,
                title: "Experienced Team",
                description: "Our decorators have years of experience in creating stunning setups for all types of events."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 text-center rounded-lg glass hover:shadow-md transition-all animate-fade-in"
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-sage-100 text-primary mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 section-bg-gradient">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Featured Services
            </h2>
            <p className="text-lg text-gray-600">
              Discover our most popular decoration packages for various occasions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => navigate("/services")}
              className="font-medium"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <FeaturedGallery />
      
      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 section-bg-waves">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Read testimonials from our satisfied customers who have experienced our decoration services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
