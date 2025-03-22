
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { CalendarIcon, Mail, Phone, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { ContactForm, Category } from "@/lib/types";
import { useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

// Simulated success response
const simulateFormSubmission = (): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1500);
  });
};

const Contact: React.FC = () => {
  const location = useLocation();
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
    eventDate: undefined,
    eventType: undefined
  });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Check if coming from cart
  useEffect(() => {
    if (location.state?.fromCart && items.length > 0) {
      // Prepare message with cart items
      const cartItemsList = items.map(item => 
        `${item.product.name} (₹${item.product.price}) x ${item.quantity}`
      ).join("\n");
      
      setFormData(prev => ({
        ...prev,
        message: `I'd like to book the following services:\n\n${cartItemsList}\n\nTotal: ₹${items.reduce((total, item) => total + (item.product.price * item.quantity), 0)}`
      }));
    }
  }, [location.state, items]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, eventType: value });
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    setFormData({ ...formData, eventDate: date });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      const response = await simulateFormSubmission();
      
      if (response.success) {
        toast.success("Your message has been sent! We'll contact you soon.");
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          eventDate: undefined,
          eventType: undefined
        });
        setDate(undefined);
        
        // Clear cart if submitted from cart
        if (location.state?.fromCart) {
          clearCart();
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-sage-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Reach out to us for inquiries, bookings, or any questions about our decoration services.
          </p>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Column */}
            <div className="bg-white rounded-lg shadow-md p-8 animate-fade-in">
              <h2 className="text-2xl font-serif font-bold mb-6">
                {location.state?.fromCart ? "Complete Your Booking" : "Send Us a Message"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name*</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select 
                      value={formData.eventType} 
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="eventType">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Category).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message*</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements"
                    className="min-h-32"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : location.state?.fromCart ? "Complete Booking" : "Send Message"}
                </Button>
              </form>
            </div>
            
            {/* Contact Information Column */}
            <div className="lg:pl-8">
              <h2 className="text-2xl font-serif font-bold mb-6 animate-fade-in">
                Contact Information
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    title: "Our Location",
                    details: "123 Decoration Street, Delhi, India",
                    link: "https://maps.google.com"
                  },
                  {
                    icon: Phone,
                    title: "Phone Number",
                    details: "+91 98765 43210",
                    link: "tel:+919876543210"
                  },
                  {
                    icon: Mail,
                    title: "Email Address",
                    details: "info@vikashvatika.com",
                    link: "mailto:info@vikashvatika.com"
                  },
                  {
                    icon: Clock,
                    title: "Working Hours",
                    details: "Monday to Saturday: 9am - 7pm\nSunday: By appointment only",
                    multiline: true
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-sage-100 text-primary mr-4">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                      {item.multiline ? (
                        <p className="text-gray-600 whitespace-pre-line">
                          {item.details}
                        </p>
                      ) : item.link ? (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary btn-hover"
                        >
                          {item.details}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Map */}
              <div className="mt-12 h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden relative animate-fade-in">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Interactive Map Will Load Here
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
