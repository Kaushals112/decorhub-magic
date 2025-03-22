
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Heart,
  Mail,
  Phone
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Services", href: "/services" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Wedding Decoration", href: "/services" },
        { name: "Birthday Parties", href: "/services" },
        { name: "Corporate Events", href: "/services" },
        { name: "Festival Decoration", href: "/services" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "FAQs", href: "#" }
      ]
    }
  ];
  
  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" }
  ];
  
  return (
    <footer className="bg-sage-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-serif font-bold">
                Vikash Vatika
                <span className="text-blush-300">.</span>
              </h2>
            </Link>
            <p className="text-sage-200 mb-6 max-w-md">
              Premium balloon and flower decoration services for all your special occasions. We turn ordinary spaces into extraordinary memories.
            </p>
            <div className="flex flex-col space-y-2">
              <a 
                href="tel:+919876543210" 
                className="flex items-center text-sage-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 mr-3" />
                +91 98765 43210
              </a>
              <a 
                href="mailto:info@vikashvatika.com" 
                className="flex items-center text-sage-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 mr-3" />
                info@vikashvatika.com
              </a>
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-medium mb-6">{group.title}</h3>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sage-300 hover:text-white transition-colors btn-hover"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-sage-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sage-400 text-sm mb-4 md:mb-0">
              © {currentYear} Vikash Vatika Decoration. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full text-sage-400 hover:text-white bg-sage-800/50 hover:bg-sage-700 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
