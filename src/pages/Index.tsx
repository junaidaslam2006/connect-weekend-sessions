import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/MainSidebar';
import { FooterSection } from '@/components/FooterSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Phone, Video, Calendar as CalendarIcon, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

const Index = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    selectedDate: undefined as Date | undefined,
    selectedTime: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = (type: string) => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if ((type === 'phone' || type === 'video') && (!formData.selectedDate || !formData.selectedTime)) {
      toast({
        title: "Missing Booking Details",
        description: "Please select a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }

    const submission = {
      id: Date.now(),
      type,
      ...formData,
      selectedDate: formData.selectedDate?.toISOString(),
      timestamp: new Date().toISOString()
    };

    const existingSubmissions = JSON.parse(localStorage.getItem('connecthub_submissions') || '[]');
    existingSubmissions.push(submission);
    localStorage.setItem('connecthub_submissions', JSON.stringify(existingSubmissions));

    toast({
      title: "Success!",
      description: `Your ${type} request has been submitted successfully.`,
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      selectedDate: undefined,
      selectedTime: ''
    });
    setActiveForm(null);
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const services = [
    {
      id: 'message',
      title: 'Send Message',
      description: 'Get in touch with us directly through our messaging system',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'phone',
      title: 'Phone Call',
      description: 'Schedule a phone call at your convenient time',
      icon: Phone,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'video',
      title: 'Video Call',
      description: 'Book a face-to-face video consultation',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <MainSidebar onAdminClick={handleAdminClick} />
        
        <main className="flex-1">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <SidebarTrigger className="bg-blue-100 hover:bg-blue-200 text-blue-800" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ConnectHub
                </h1>
                <p className="text-blue-700 mt-1">Your gateway to seamless communication</p>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center py-16 px-4 relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Connect With Ease
                  </h2>
                  <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
                </div>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Experience the future of communication with our seamless messaging, phone, and video call services.
                  Choose your preferred method and let's connect!
                </p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.id}
                    className={`relative overflow-hidden bg-gradient-to-br ${service.bgColor} ${service.borderColor} border-2 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
                    onClick={() => setActiveForm(service.id)}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative">
                      <CardHeader className="text-center pb-4">
                        <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-800">{service.title}</CardTitle>
                        <CardDescription className="text-gray-600 text-base">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform group-hover:scale-105`}>
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Active Form */}
            {activeForm && (
              <Card className="max-w-2xl mx-auto mb-16 shadow-2xl border-2 border-blue-200 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {services.find(s => s.id === activeForm)?.title}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Fill out the form below and we'll get back to you soon
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-lg font-medium text-blue-700">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2 text-lg py-3 border-2 border-blue-200 focus:border-blue-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-lg font-medium text-blue-700">Phone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2 text-lg py-3 border-2 border-blue-200 focus:border-blue-400"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-lg font-medium text-blue-700">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 text-lg py-3 border-2 border-blue-200 focus:border-blue-400"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {(activeForm === 'phone' || activeForm === 'video') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-lg font-medium text-blue-700">Select Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full mt-2 justify-start text-left font-normal py-3 text-lg border-2 border-blue-200 hover:border-blue-400"
                            >
                              <CalendarIcon className="mr-2 h-5 w-5" />
                              {formData.selectedDate ? format(formData.selectedDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.selectedDate}
                              onSelect={(date) => setFormData({ ...formData, selectedDate: date })}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label className="text-lg font-medium text-blue-700">Select Time *</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={formData.selectedTime === time ? "default" : "outline"}
                              size="sm"
                              className={`${
                                formData.selectedTime === time 
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                                  : 'border-blue-200 hover:border-blue-400'
                              }`}
                              onClick={() => setFormData({ ...formData, selectedTime: time })}
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="message" className="text-lg font-medium text-blue-700">
                      {activeForm === 'message' ? 'Message' : 'Additional Notes'}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 min-h-[120px] text-lg border-2 border-blue-200 focus:border-blue-400"
                      placeholder={
                        activeForm === 'message' 
                          ? "Type your message here..." 
                          : "Any specific topics you'd like to discuss?"
                      }
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={() => handleSubmit(activeForm)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Submit {services.find(s => s.id === activeForm)?.title}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveForm(null)}
                      className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-lg rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <FooterSection />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
