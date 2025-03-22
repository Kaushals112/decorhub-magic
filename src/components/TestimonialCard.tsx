
import React from "react";
import { Testimonial } from "@/lib/types";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, role, content, avatar, rating } = testimonial;
  
  // Generate initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  
  // Array for rendering stars
  const stars = Array(5).fill(0);
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md animate-fade-in">
      {/* Rating Stars */}
      <div className="flex mb-4">
        {stars.map((_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 ${
              index < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
            }`}
          />
        ))}
      </div>
      
      {/* Testimonial Content */}
      <p className="text-gray-600 mb-6 italic">"{content}"</p>
      
      {/* Client Info */}
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-sage-100 text-sage-700">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
