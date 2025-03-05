
import { Link } from "react-router-dom";
import { Stethoscope, Calculator, Book, Ambulance, MessageSquare, Play, BookOpen } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Symptom-Based Diagnosis",
      description: "AI-powered differential diagnosis generator",
      icon: <Stethoscope className="w-12 h-12 text-primary" />,
      path: "/diagnosis",
    },
    {
      title: "Drug Calculator",
      description: "Pediatric medication dosage calculator",
      icon: <Calculator className="w-12 h-12 text-primary" />,
      path: "/calculator",
    },
    {
      title: "Emergency Protocols",
      description: "Quick access to emergency guidelines",
      icon: <Ambulance className="w-12 h-12 text-primary" />,
      path: "/emergency",
    },
    {
      title: "Learning Resources",
      description: "Case-based learning and reference materials",
      icon: <Book className="w-12 h-12 text-primary" />,
      path: "/resources",
    },
    {
      title: "Journal Club",
      description: "Stay updated with the latest research",
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      path: "/journal-club",
    },
    {
      title: "Case Mentor",
      description: "Interactive case-based learning",
      icon: <Play className="w-12 h-12 text-primary" />,
      path: "/case-mentor",
    },
    {
      title: "Pediatric Chat",
      description: "Ask questions based on Nelson Textbook",
      icon: <MessageSquare className="w-12 h-12 text-primary" />,
      path: "/pediatric-chat",
    },
  ];

  return (
    <div className="animate-fade-in">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-in">
          Welcome to NelsonAssist-AI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in [animation-delay:0.2s]">
          Your intelligent companion for pediatric healthcare, powered by the Nelson
          Textbook of Pediatrics
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link
            key={feature.title}
            to={feature.path}
            className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:text-accent">
                {feature.icon}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                {feature.title}
              </h2>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-12 text-center animate-fade-in [animation-delay:0.5s]">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Evidence-Based Practice
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Access reliable, up-to-date information from the Nelson Textbook of
          Pediatrics to support your clinical decisions
        </p>
      </section>
    </div>
  );
};

export default Index;
