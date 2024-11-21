import { Link } from "react-router-dom";
import { Stethoscope, Calculator, Book, Ambulance } from "lucide-react";

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
  ];

  return (
    <div className="animate-fade-in">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to NelsonAssist-AI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your intelligent companion for pediatric healthcare, powered by the Nelson
          Textbook of Pediatrics
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.path}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-col items-center text-center">
              {feature.icon}
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h2>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-12 text-center">
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