
import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface ContactInfo {
  icon: React.ElementType;
  title: string;
  details: string;
  link?: string;
}

const contactInfo: ContactInfo[] = [
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
    details: "Mon-Sat: 9am - 7pm"
  }
];

const ContactSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-sage-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600">
            We'd love to hear from you. Contact us for any questions or to book our decoration services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md text-center group animate-fade-in"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-100 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <info.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium mb-2">{info.title}</h3>
              {info.link ? (
                <a 
                  href={info.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary btn-hover inline-block"
                >
                  {info.details}
                </a>
              ) : (
                <p className="text-gray-600">{info.details}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Map (placeholder) */}
            <div className="lg:col-span-3 h-80 lg:h-auto bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
                Interactive Map Will Load Here
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-serif font-bold mb-2">Vikash Vatika Decoration</h3>
              <p className="text-gray-600 mb-6">
                Turning your special moments into beautiful memories with our premium decoration services.
              </p>
              
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">{info.title}:</span> {' '}
                      {info.link ? (
                        <a 
                          href={info.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary transition-colors"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <span className="text-gray-600">{info.details}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
