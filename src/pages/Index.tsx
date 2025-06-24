
import React, { useState } from 'react';
import { MessageSquare, Phone, Video, Send, Calendar, Clock, User, Mail, PhoneIcon } from 'lucide-react';
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
      title: 'Send Message',
      description: 'Share your thoughts and ideas with me',
      icon: MessageSquare,
      color: 'from-yellow-400 to-orange-500',
      hoverColor: 'hover:shadow-yellow-500/20'
    },
    {
      id: 'phone',
      title: 'Phone Call',
      description: '30-minute phone conversation (weekends only)',
      icon: Phone,
      color: 'from-orange-400 to-red-500',
      hoverColor: 'hover:shadow-orange-500/20'
    },
    {
      id: 'video',
      title: 'Video Call',
      description: '30-minute video session (weekends only)',
      icon: Video,
      color: 'from-red-400 to-pink-500',
      hoverColor: 'hover:shadow-red-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            ConnectHub
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Let's exchange ideas and work on amazing projects together
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {!selectedService ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl ${service.hoverColor} hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg text-white font-semibold py-3 rounded-lg transition-all duration-300`}>
                      Get Started
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center relative">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 left-4 hover:bg-yellow-100"
                >
                  ← Back
                </Button>
                <div className="pt-8">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                    {services.find(s => s.id === selectedService)?.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 mt-2">
                    Fill out the form below to {selectedService === 'message' ? 'send your message' : 'book your session'}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                        <User className="w-4 h-4 text-yellow-600" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-yellow-200 focus:border-yellow-400"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                        <Mail className="w-4 h-4 text-yellow-600" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-yellow-200 focus:border-yellow-400"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 font-medium">
                      <PhoneIcon className="w-4 h-4 text-yellow-600" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-2 border-yellow-200 focus:border-yellow-400"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2 font-medium">
                      <MessageSquare className="w-4 h-4 text-yellow-600" />
                      {selectedService === 'message' ? 'Your Message' : 'Additional Notes (Optional)'}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required={selectedService === 'message'}
                      className="min-h-[120px] border-2 border-yellow-200 focus:border-yellow-400"
                      placeholder={selectedService === 'message' 
                        ? "Share your thoughts and ideas..." 
                        : "Any specific topics you'd like to discuss?"
                      }
                    />
                  </div>
                  
                  {(selectedService === 'phone' || selectedService === 'video') && (
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 font-medium">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        Select Preferred Time
                      </Label>
                      <TimeSlotPicker 
                        onTimeSlotSelect={handleTimeSlotSelect}
                        selectedDate={formData.selectedDate}
                        selectedTime={formData.selectedTime}
                      />
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold py-3 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
                      disabled={
                        !formData.name || 
                        !formData.email || 
                        !formData.phone || 
                        (selectedService === 'message' && !formData.message) ||
                        ((selectedService === 'phone' || selectedService === 'video') && (!formData.selectedDate || !formData.selectedTime))
                      }
                    >
                      {selectedService === 'message' ? 'Send Message' : 'Book Session'}
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
