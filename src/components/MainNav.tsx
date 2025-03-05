
import { useState } from "react";
import { Link } from "react-router-dom";
import { Stethoscope, Calculator, Book, Ambulance, Menu, X, BookOpen, LogIn, Play, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Diagnosis", icon: <Stethoscope className="w-5 h-5" />, path: "/diagnosis" },
    { name: "Calculator", icon: <Calculator className="w-5 h-5" />, path: "/calculator" },
    { name: "Emergency", icon: <Ambulance className="w-5 h-5" />, path: "/emergency" },
    { name: "Resources", icon: <Book className="w-5 h-5" />, path: "/resources" },
    { name: "Journal Club", icon: <BookOpen className="w-5 h-5" />, path: "/journal-club" },
    { name: "CaseMentor", icon: <Play className="w-5 h-5" />, path: "/case-mentor" },
    { name: "Pediatric Chat", icon: <MessageSquare className="w-5 h-5" />, path: "/pediatric-chat" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="animate-fade-in flex items-center">
                <Stethoscope className="w-8 h-8 text-primary animate-[spin_3s_ease-in-out_infinite]" />
                <span className="text-primary font-bold text-xl ml-2">NelsonAssist-AI</span>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            <Link to="/auth">
              <Button variant="outline" size="sm" className="ml-4 transition-all duration-300 hover:scale-105 hover:shadow-md">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            <Link
              to="/auth"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              <span className="ml-2">Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNav;
