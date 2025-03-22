
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";
import Cart from "./Cart";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, isAdmin, user } = useAuth();
  const location = useLocation();

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Gallery", path: "/gallery" },
    { text: "Services", path: "/services" },
    { text: "Contact", path: "/contact" }
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    navLinks.push({ text: "Admin", path: "/admin" });
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center"
            >
              <h1 className="text-2xl font-serif font-bold text-primary">
                Vikash Vatika
                <span className="text-blush-500">.</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`btn-hover text-sm font-medium ${
                    location.pathname === link.path 
                      ? "text-primary" 
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowCart(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-fade-in">
                    {totalItems}
                  </span>
                )}
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">
                    Hi, {user?.name.split(' ')[0]}
                  </span>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="btn-hover"
                >
                  <User className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowCart(true)}
                className="relative mr-2"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-20 z-40 bg-white/95 backdrop-blur-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
          showMobileMenu ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-8">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-center py-2 text-base font-medium ${
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-gray-600"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                {link.text}
              </Link>
            ))}

            {!isAuthenticated && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setShowAuthModal(true);
                  setShowMobileMenu(false);
                }}
              >
                <User className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            )}
          </nav>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Cart Drawer */}
      <Cart 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
      />
    </>
  );
};

export default Navbar;
