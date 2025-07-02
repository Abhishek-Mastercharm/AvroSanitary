import React from 'react';
import { Check, Globe, Package } from 'lucide-react';

const WhyChooseSection = () => {
  const features = [
    {
      icon: Globe,
      title: "Reliable Global Exporter",
      description: "Trusted worldwide delivery"
    },
    {
      icon: Package,
      title: "Wide Product Range",
      description: "Comprehensive solutions"
    },
    {
      icon: Check,
      title: "Custom Sourcing & Logistics",
      description: "Tailored support services"
    }
  ];

  return (
    <section id="why-choose" className="fade-in-row py-16 px-4 bg-zinc-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold text-charcoalBlack text-center mb-2">
          Why Choose <span className="text-goldenBronze">Us</span>
        </h2>
        <div className="mx-auto mb-12 w-32 h-1 rounded bg-gradient-to-r from-goldenBronze to-yellow-400 shadow-lg"></div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-pureWhite rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-goldenBronze"
            >
              <div className="w-16 h-16 bg-goldenBronze/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-goldenBronze" />
              </div>
              <h3 className="text-xl font-semibold text-charcoalBlack mb-2">{feature.title}</h3>
              <p className="text-charcoalBlack">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
