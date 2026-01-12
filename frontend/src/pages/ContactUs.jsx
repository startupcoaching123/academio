import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Send,
  MapPin,
  Clock,
  Globe
} from 'lucide-react';
import logo from '../assets/logo1.png';

const ContactUs = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30 flex items-center justify-center py-20 mt-2 md:mt-15 p-4 md:p-8 font-sans">
      
      {/* Main Card */}
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Section */}
        <div className="text-center pt-10 pb-6 px-6 bg-gradient-to-r from-teal-700/5 to-slate-100/50">
       
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
            Get in <span className="text-teal-700">Touch</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Have questions about our courses? Need academic guidance? We're here to help! 
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Contact Information Section */}
          <div className="lg:col-span-1 bg-gradient-to-br from-teal-700 to-teal-900 p-8 text-white">
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-teal-100 text-sm">+91 98765 43210</p>
                  <p className="text-teal-100 text-sm">+91 87654 32109</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-teal-100 text-sm">info@academio.com</p>
                  <p className="text-teal-100 text-sm">support@academio.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Office Address</h3>
                  <p className="text-teal-100 text-sm">
                    123, Education Hub,<br />
                    Bangalore, Karnataka 560001<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Working Hours</h3>
                  <p className="text-teal-100 text-sm">
                    Mon - Fri: 9:00 AM - 8:00 PM<br />
                    Sat - Sun: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Global Presence</h3>
                  <p className="text-teal-100 text-sm">
                    Serving students worldwide<br />
                    Online & Offline classes available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <div className="w-24 relative flex-shrink-0">
                       <div className="absolute inset-y-0 left-0 flex items-center justify-center w-full pointer-events-none text-slate-500 text-sm font-medium border border-slate-200 bg-slate-50 rounded-xl">+91</div>
                    </div>
                    <div className="relative w-full group">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                       <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="98765 43210" 
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all appearance-none text-slate-700 cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="admission">Admission Query</option>
                      <option value="course">Course Information</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your query or requirement..." 
                    rows={5}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-teal-800 hover:bg-teal-900 disabled:bg-teal-600 disabled:cursor-not-allowed text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:shadow-teal-900/20 transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-teal-200 flex items-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
