import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ServiceSection } from './components/ServiceSection';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { en } from './locales/en';
import { ta } from './locales/ta';

function App() {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const content = language === 'en' ? en : ta;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50">
              <Navigation
                content={content.nav}
                language={language}
                toggleLanguage={toggleLanguage}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              <Hero 
                content={content.hero} 
                language={language}
              />
              <Services content={content.services} />
              {content.services.items.map((service) => (
                <ServiceSection
                  key={service.id}
                  service={service}
                  language={language}
                />
              ))}
              <About content={content.about} />
              <Contact 
                content={content.contact}
                language={language}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;