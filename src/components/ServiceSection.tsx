import React, { useState } from 'react';
import { LanguageContent } from '../types';
import { ContactForm } from './ContactForm';
import { IMAGES } from '../constants';

interface ServiceSectionProps {
  service: LanguageContent['services']['items'][0];
  language: 'en' | 'ta';
}

const getServiceBackground = (serviceId: string): string => {
  const backgrounds = {
    'home-care': 'bg-gradient-to-br from-primary/5 via-background to-secondary/5',
    'rehabilitation': 'bg-gradient-to-br from-secondary/5 via-background to-accent/5',
    'primary-care': 'bg-gradient-to-br from-accent/5 via-background to-primary/5',
    'medical-equipment': 'bg-gradient-to-br from-primary/5 via-background to-accent/5'
  };
  return backgrounds[serviceId as keyof typeof backgrounds] || 'bg-background';
};

export const ServiceSection: React.FC<ServiceSectionProps> = ({ service, language }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const backgroundClass = getServiceBackground(service.id);

  return (
    <section id={service.id} className={`py-20 ${backgroundClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-[300px] md:h-[400px]">
            <img
              src={IMAGES.SERVICES[service.id as keyof typeof IMAGES.SERVICES]}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-4">{service.title}</h1>
              <p className="text-lg text-white/90 max-w-2xl">{service.description}</p>
            </div>
          </div>

          {/* Sub-services */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.subServices.map((subService, index) => (
                <div 
                  key={index} 
                  className="group bg-background/50 rounded-xl p-6 shadow-sm hover:shadow-md 
                    transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {subService.name}
                  </h3>
                  <p className="text-text-secondary mb-4">{subService.description}</p>
                  <p className="text-sm text-text-secondary">
                    {language === 'en' ? 'Starting from ' : 'தொடக்க விலை '}
                    <span className="font-medium text-accent">₹{subService.price}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showContactForm && (
        <ContactForm
          language={language}
          serviceName={service.title}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </section>
  );
};