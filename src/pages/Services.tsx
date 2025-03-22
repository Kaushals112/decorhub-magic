import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Category, Product } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample services data
const services: Product[] = [
  // Wedding Services
  {
    id: "w1",
    name: "Complete Wedding Decoration",
    description: "Full wedding venue decoration including entrance, stage, seating area, and dining setup with premium flowers and balloons.",
    price: 45000,
    category: Category.WEDDING,
    images: ["/placeholder.svg"],
    featured: true
  },
  {
    id: "w2",
    name: "Wedding Stage Decoration",
    description: "Beautiful stage setup for the wedding ceremony with elegant flower arrangements and balloon decorations.",
    price: 25000,
    category: Category.WEDDING,
    images: ["/placeholder.svg"],
    featured: false
  },
  {
    id: "w3",
    name: "Wedding Entrance Decor",
    description: "Make a grand entrance with our spectacular entrance decoration featuring flower arches and balloon arrangements.",
    price: 15000,
    category: Category.WEDDING,
    images: ["/placeholder.svg"],
    featured: false
  },
  
  // Birthday Services
  {
    id: "b1",
    name: "Kids Birthday Package",
    description: "Colorful balloon decorations, themed setups, and playful arrangements perfect for children's birthday parties.",
    price: 8500,
    category: Category.BIRTHDAY,
    images: ["/placeholder.svg"],
    featured: true
  },
  {
    id: "b2",
    name: "Adult Birthday Decoration",
    description: "Elegant and sophisticated decoration setup for adult birthday celebrations with premium flower arrangements.",
    price: 12000,
    category: Category.BIRTHDAY,
    images: ["/placeholder.svg"],
    featured: false
  },
  {
    id: "b3",
    name: "Surprise Birthday Setup",
    description: "Special surprise decoration package including balloons, flowers, and personalized elements for a memorable celebration.",
    price: 7500,
    category: Category.BIRTHDAY,
    images: ["/placeholder.svg"],
    featured: false
  },
  
  // Corporate Services
  {
    id: "c1",
    name: "Corporate Event Package",
    description: "Professional decoration services for corporate events, conferences, product launches, and office celebrations.",
    price: 35000,
    category: Category.CORPORATE,
    images: ["/placeholder.svg"],
    featured: true
  },
  {
    id: "c2",
    name: "Office Party Decoration",
    description: "Fun and tasteful decorations for office parties and team celebrations with balloons and floral accents.",
    price: 18000,
    category: Category.CORPORATE,
    images: ["/placeholder.svg"],
    featured: false
  },
  
  // Festival Services
  {
    id: "f1",
    name: "Diwali Decoration",
    description: "Festive flower arrangements and colorful decoration setups to celebrate Diwali at home or office.",
    price: 9500,
    category: Category.FESTIVAL,
    images: ["/placeholder.svg"],
    featured: true
  },
  {
    id: "f2",
    name: "Christmas & New Year Setup",
    description: "Holiday-themed decorations with balloons, flowers, and festive elements for Christmas and New Year celebrations.",
    price: 12500,
    category: Category.FESTIVAL,
    images: ["/placeholder.svg"],
    featured: false
  },
  
  // Other Services
  {
    id: "o1",
    name: "Engagement Ceremony Decor",
    description: "Beautiful decoration setup for engagement ceremonies with elegant floral arrangements and balloons.",
    price: 18000,
    category: Category.OTHER,
    images: ["/placeholder.svg"],
    featured: false
  },
  {
    id: "o2",
    name: "Baby Shower Decoration",
    description: "Adorable and charming decoration packages for baby showers with gender-themed balloon and flower arrangements.",
    price: 9000,
    category: Category.OTHER,
    images: ["/placeholder.svg"],
    featured: true
  }
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter services based on active tab
  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(service => service.category === activeTab);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-sage-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 animate-fade-in">
            Our Decoration Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Browse our range of premium flower and balloon decoration services for all your special occasions.
          </p>
        </div>
      </section>
      
      {/* Services Tabs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-12">
              <TabsList className="h-12">
                <TabsTrigger value="all" className="px-4 text-sm sm:text-base">
                  All Services
                </TabsTrigger>
                {Object.values(Category).map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-4 text-sm sm:text-base"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="mt-0 animate-fade-in">
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No services found</h3>
                  <p className="text-gray-600">
                    Try selecting a different category
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Custom Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-sage-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Looking for Custom Decoration?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We offer personalized decoration services tailored to your specific requirements and preferences. Contact us to discuss your ideas.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Contact Us
              </a>
              <a 
                href="tel:+919876543210" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
