import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Button from "./Button";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  postalCode: string;
  franchiseInterest: string;
  about: string;
}

// Configuration constants
const ADMIN_EMAIL = "damil.alantoai@gmail.com";
const WEBHOOK_URL = "https://hook.eu2.make.com/ubp6paow7pbkq1kibybtaz1ncbfx7cf9";

const LeadForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    postalCode: "",
    franchiseInterest: "",
    about: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendToWebhook = async (data: FormData) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        franchiseInterest: data.franchiseInterest,
        about: data.about || '',
        timestamp: new Date().toISOString(),
        source: window.location.href,
        adminEmail: ADMIN_EMAIL
      };

      console.log('Sending payload:', payload);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Data sent successfully to webhook');
      return true;
    } catch (error) {
      console.error('Error sending data to webhook:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.city || !formData.state || !formData.postalCode || !formData.franchiseInterest) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send data to webhook
      const webhookSuccess = await sendToWebhook(formData);
      
      if (webhookSuccess) {
        // Show success message
        toast({
          title: "Success!",
          description: "Thank you for your submission! We'll be in touch soon.",
        });
        
        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          postalCode: "",
          franchiseInterest: "",
          about: "",
        });
      } else {
        // If webhook failed but didn't throw an error
        toast({
          title: "Success!",
          description: "Thank you for your submission! We'll be in touch soon.",
        });
      }
      
    } catch (error) {
      console.error("Form submission error:", error);
      // Don't show error to user, just log it
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden" id="lead-form">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Ebook Cover */}
        <div className="bg-success-50 p-8 flex items-center justify-center">
          <div className="relative max-w-xs w-full mx-auto">
            <div className="absolute inset-0 bg-success-500/10 rounded-lg transform rotate-3"></div>
            <div className="relative bg-white rounded-lg shadow-lg p-6 transform -rotate-2 transition-transform hover:rotate-0 duration-300">
              <div className="text-center">
                <div className="text-success-600 uppercase tracking-wider text-sm font-semibold mb-2">Franchise Success Guide</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Wealth Within Reach</h3>
                <div className="w-24 h-1 bg-success-500 mx-auto mb-4"></div>
                <p className="text-gray-600 mb-6">
                  40 Reasons to Start a Franchise,<br />
                  8 Reasons Not To &<br />
                  8 Steps to<br />
                  Find the Right One for Success
                </p>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get Your Free Franchise Success Guide</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="input-franchise"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="input-franchise"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-franchise"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="input-franchise"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="input-franchise"
                    placeholder="Your city"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="input-franchise"
                    placeholder="Your state"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="input-franchise"
                    placeholder="Your postal code"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="franchiseInterest" className="block text-sm font-medium text-gray-700 mb-1">
                  Franchise Interest <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="franchiseInterest"
                  name="franchiseInterest"
                  value={formData.franchiseInterest}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="input-franchise resize-none"
                  placeholder="What type of franchise are you interested in? (e.g., food, retail, service, etc.)"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about yourself (Optional)
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-franchise resize-none"
                  placeholder="I'm interested in franchising because..."
                ></textarea>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isLoading}
                >
                  Get Access Now
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                By submitting this form, you agree to receive the free guide and occasional emails about franchising opportunities. 
                We respect your privacy and will never share your information.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
