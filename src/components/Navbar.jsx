import React from "react";
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container py-4classNamebg-white text-gray-990 border-b">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="p-2 bg-primary rounded-xl shadow-glow group-hover:scale-105 transition-smooth ">
            <Leaf className="w-6 h-6 text-primary-foreground text-amber-50 bg-green-700" />
          </div>
          <div>
            <h1 onClick={goHome} className="font-display text-xl font-bold text-foreground cursor-pointer">
              FoodFacts
            </h1>
            <p className="text-xs text-muted-foreground font-body">
              Explore. Discover. Eat Smart.
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
export default Navbar;
