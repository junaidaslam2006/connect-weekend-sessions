
import React, { useState } from 'react';
import { Calendar, MessageSquare, Phone, Video, Clock, Mail, User, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import TimeSlotPicker from '@/components/TimeSlotPicker';

const Index = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    selectedDate: '',
    selectedTime: ''
  });
  const { toast } = useToast();

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      selectedDate: '',
      selectedTime: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissions = JSON.parse(localStorage.getItem('connecthub_submissions') || '[]');
    const newSubmission = {
      id: Date.now(),
      type: selectedService,
      ...formData,
      timestamp: new Date().toISOString()
    };
    
    submissions.push(newSubmission);
    localStorage.setItem('connecthub_submissions', JSON.stringify(submissions));
    
    toast({
      title: "Success!",
      description: selectedService === 'message' 
        ? "Your message has been sent successfully!" 
        : "Your booking request has been submitted successfully!",
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      selectedDate: '',
      selectedTime: ''
    });
    setSelectedService(null);
  };

  const handleTimeSlotSelect = (date: string, time: string) => {
    setFormData({
      ...formData,
      selectedDate: date,
      selectedTime: time
    });
  };

  const services = [
    {
      id: 'message',
      title: 'Send a Message',
      description: 'Share your thoughts, questions, or ideas with me',
      icon: MessageSquare,
      gradient: 'from-yellow-400 via-amber-500 to-orange-500',
      glowColor: '0, 255, 255'
    },
    {
      id: 'phone',
      title: 'Book a Phone Call',
      description: 'Schedule a 30-minute phone conversation (weekends only)',
      icon: Phone,
      gradient: 'from-green-400 via-emerald-500 to-teal-500',
      glowColor: '34, 197, 94'
    },
    {
      id: 'video',
      title: 'Book a Video Call',
      description: 'Schedule a 30-minute video session (weekends only)',
      icon: Video,
      gradient: 'from-purple-400 via-violet-500 to-indigo-500',
      glowColor: '147, 51, 234'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Enhanced Design */}
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-4 relative">
              ConnectHub
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
            </h1>
            <div className="flex justify-center items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-600 animate-pulse" />
              <Zap className="w-8 h-8 text-amber-600 animate-bounce" />
              <Sparkles className="w-6 h-6 text-orange-600 animate-pulse delay-500" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Let's exchange ideas and work on amazing projects together
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-lg"></div>
        </div>

        {!selectedService ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id}
                  className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 border-0 overflow-hidden bg-white/80 backdrop-blur-sm relative"
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500`}></div>
                  
                  <div className="relative bg-white rounded-lg">
                    <div className={`h-3 bg-gradient-to-r ${service.gradient} shadow-lg`} />
                    <CardHeader className="text-center pb-4 pt-8">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-800">{service.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-lg leading-relaxed mt-3">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pb-8">
                      <Button className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-xl hover:shadow-yellow-500/25 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105`}>
                        Get Started
                        <Zap className="w-5 h-5 ml-2" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-2xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-75"></div>
              <div className="relative bg-white rounded-lg">
                <CardHeader className="text-center relative">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 left-4 hover:bg-yellow-100 transition-colors duration-200"
                  >
                    ← Back
                  </Button>
                  <div className="pt-12">
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      {services.find(s => s.id === selectedService)?.title}
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-600 mt-4">
                      Fill out the form below to {selectedService === 'message' ? 'send your message' : 'book your session'}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2 text-lg font-medium">
                          <User className="w-5 h-5 text-yellow-600" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="text-lg py-3 border-2 border-yellow-200 focus:border-yellow-400 transition-colors duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-lg font-medium">
                          <Mail className="w-5 h-5 text-yellow-600" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="text-lg py-3 border-2 border-yellow-200 focus:border-yellow-400 transition-colors duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2 text-lg font-medium">
                        <Phone className="w-5 h-5 text-yellow-600" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="text-lg py-3 border-2 border-yellow-200 focus:border-yellow-400 transition-colors duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center gap-2 text-lg font-medium">
                        <MessageSquare className="w-5 h-5 text-yellow-600" />
                        {selectedService === 'message' ? 'Your Message' : 'Additional Notes (Optional)'}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required={selectedService === 'message'}
                        className="text-lg min-h-[150px] border-2 border-yellow-200 focus:border-yellow-400 transition-colors duration-200"
                        placeholder={selectedService === 'message' 
                          ? "Share your thoughts, questions, or ideas..." 
                          : "Any specific topics you'd like to discuss? (Optional)"
                        }
                      />
                    </div>
                    
                    {(selectedService === 'phone' || selectedService === 'video') && (
                      <div className="space-y-4">
                        <Label className="flex items-center gap-2 text-lg font-medium">
                          <Clock className="w-5 h-5 text-yellow-600" />
                          Select Your Preferred Time Slot
                        </Label>
                        <TimeSlotPicker 
                          onTimeSlotSelect={handleTimeSlotSelect}
                          selectedDate={formData.selectedDate}
                          selectedTime={formData.selectedTime}
                        />
                      </div>
                    )}
                    
                    <div className="pt-6">
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white font-bold py-4 text-xl rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                        disabled={
                          !formData.name || 
                          !formData.email || 
                          !formData.phone || 
                          (selectedService === 'message' && !formData.message) ||
                          ((selectedService === 'phone' || selectedService === 'video') && (!formData.selectedDate || !formData.selectedTime))
                        }
                      >
                        {selectedService === 'message' ? 'Send Message' : 'Book Session'}
                        <Zap className="w-6 h-6 ml-2" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
