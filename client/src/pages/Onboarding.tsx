import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Shop Your Favorite Markets",
    description: "Access Sarojini, Lajpat, and more offline markets from the comfort of your home.",
    image: "https://images.unsplash.com/photo-1574634534894-89d7576f8259?auto=format&fit=crop&q=80&w=800",
    color: "bg-orange-100"
  },
  {
    id: 2,
    title: "Live Video Shopping",
    description: "Connect directly with shopkeepers via video call. See exactly what you're buying.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    color: "bg-blue-100"
  },
  {
    id: 3,
    title: "Trusted & Fast Delivery",
    description: "Authentic products from verified sellers, delivered to your doorstep swiftly.",
    image: "https://images.unsplash.com/photo-1556740758-90de2929e507?auto=format&fit=crop&q=80&w=800",
    color: "bg-green-100"
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setLocation("/login");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col items-center justify-center p-6 text-center"
        >
          <div className={`w-full aspect-square max-w-sm rounded-3xl overflow-hidden shadow-2xl mb-8 ${slides[currentSlide].color}`}>
            {/* Using Unsplash images for onboarding visuals */}
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-3xl font-display font-bold mb-4 tracking-tight">
            {slides[currentSlide].title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xs">
            {slides[currentSlide].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="p-8 w-full max-w-md mx-auto">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div 
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <Button 
          onClick={handleNext}
          className="w-full h-14 text-lg rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
          size="lg"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
