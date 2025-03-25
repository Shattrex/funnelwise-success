import { useEffect, useRef } from "react";
import { ArrowDown, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import LeadForm from "@/components/LeadForm";
import TestimonialSlider from "@/components/TestimonialSlider";
import StickyFooter from "@/components/StickyFooter";

const Index = () => {
  const leadFormRef = useRef<HTMLDivElement>(null);
  
  const scrollToForm = () => {
    leadFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleBookCall = () => {
    window.open("http://meetings.hubspot.com/aleigh?uuid=a52fc7b4-d4b3-4d7a-9dd1-c7c243ea7290", "_blank");
  };
  
  useEffect(() => {
    // Intersection Observer for animation on scroll
    const animateOnScroll = () => {
      const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      elementsToAnimate.forEach((element) => {
        observer.observe(element);
      });
      
      return observer;
    };
    
    const observer = animateOnScroll();
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-sm md:text-base font-bold text-gray-900 mb-6 animate-on-scroll">
            <div className="bg-success-100 text-success-700 py-3 px-4 rounded-lg inline-block mb-4">
              Dreaming of Controlling Your Own Destiny?<br />
              Independence? A More Balanced Lifestyle? Financial Freedom?
            </div>
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 animate-on-scroll">
            Unlock Your Franchise Potential With Expert Guidance
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-10 animate-on-scroll">
            Join successful franchise owners who have built thriving businesses with our proven strategies and personalized coaching.
          </p>
          
          {/* Video Placeholder */}
          <div className="mb-10 rounded-xl overflow-hidden shadow-xl animate-on-scroll">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://drive.google.com/file/d/1ZSssGXaOtKP_2kOqeUS_nk__gY8aAfnD/preview" 
                title="Adrienne's Intro Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-on-scroll">
            <Button
              variant="primary"
              onClick={handleBookCall}
              className="flex items-center justify-center gap-2"
              size="lg"
            >
              <Calendar className="h-5 w-5" />
              Book a Free 15-Minute Consultation
            </Button>
            
            <Button
              variant="secondary"
              onClick={scrollToForm}
              className="flex items-center justify-center gap-2 group"
              size="lg"
            >
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Download Free Franchise Guide
            </Button>
          </div>
        </div>
      </section>
      
      {/* Lead Form Section */}
      <section className="py-16 px-6 bg-gray-100" ref={leadFormRef}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leading Franchise Expert Reveals Why 60% of Employees Age 45+<br />
              Are a Good Fit For Franchise Ownership –<br />
              And How To Tell If You are One of Them
            </h2>
          </div>
          
          <div className="animate-on-scroll">
            <LeadForm />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="inline-block bg-success-100 text-success-700 py-1 px-3 rounded-full text-sm font-medium mb-4">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hear From Our Clients
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See how our franchise expertise has helped business owners achieve their goals and build successful franchises.
            </p>
          </div>
          
          <div className="animate-on-scroll">
            <TestimonialSlider />
          </div>
          
          <div className="mt-12 text-center animate-on-scroll">
            <Button
              variant="primary"
              onClick={handleBookCall}
              className="flex items-center justify-center gap-2 mx-auto"
              size="lg"
            >
              <Calendar className="h-5 w-5" />
              Book a Free 15-Minute Consultation
            </Button>
          </div>
        </div>
      </section>
      
      {/* Sticky Footer */}
      <StickyFooter />
      
      {/* Basic Footer - Updated to use the new logo with white background */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-white inline-block p-2 rounded-md mb-4">
            <img 
              src="/lovable-uploads/15446c41-b44a-47cd-a95a-4ffdf5bf3273.png" 
              alt="Success Franchising" 
              className="h-12 mx-auto"
            />
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Success Franchising. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
