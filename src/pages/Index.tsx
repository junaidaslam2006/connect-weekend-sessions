
import React, { useState } from 'react';
import { Calendar, MessageSquare, Phone, Video, Clock, Mail, User } from 'lucide-react';
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
    
    // Save to localStorage (simulating database storage)
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
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'phone',
      title: 'Book a Phone Call',
      description: 'Schedule a 30-minute phone conversation (weekends only)',
      icon: Phone,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'video',
      title: 'Book a Video Call',
      description: 'Schedule a 30-minute video session (weekends only)',
      icon: Video,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ConnectHub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your gateway to meaningful conversations. Choose how you'd like to connect with me.
          </p>
        </div>

        {!selectedService ? (
          /* Service Selection */
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 overflow-hidden"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 left-4"
                >
                  ← Back
                </Button>
                <CardTitle className="text-3xl font-bold text-gray-800">
                  {services.find(s => s.id === selectedService)?.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  Fill out the form below to {selectedService === 'message' ? 'send your message' : 'book your session'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      {selectedService === 'message' ? 'Your Message' : 'Additional Notes (Optional)'}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required={selectedService === 'message'}
                      className="mt-1 min-h-[120px]"
                      placeholder={selectedService === 'message' 
                        ? "Share your thoughts, questions, or ideas..." 
                        : "Any specific topics you'd like to discuss? (Optional)"
                      }
                    />
                  </div>
                  
                  {(selectedService === 'phone' || selectedService === 'video') && (
                    <div>
                      <Label className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4" />
                        Select Your Preferred Time Slot
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
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 text-lg rounded-lg transition-all duration-300"
                      disabled={
                        !formData.name || 
                        !formData.email || 
                        !formData.phone || 
                        (selectedService === 'message' && !formData.message) ||
                        ((selectedService === 'phone' || selectedService === 'video') && (!formData.selectedDate || !formData.selectedTime))
                      }
                    >
                      {selectedService === 'message' ? 'Send Message' : 'Book Session'}
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
