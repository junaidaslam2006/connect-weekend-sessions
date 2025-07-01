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
import { MessageSquare, Phone, Video, Calendar as CalendarIcon, Clock, ArrowRight } from 'lucide-react';
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
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

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
      title: "🎉 Appointment Booked!",
      description: `Your ${type === 'message' ? 'message' : type === 'phone' ? 'phone call' : 'video call'} has been successfully scheduled.`
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
      description: 'Send me a message and I will get back to you as soon as possible',
      icon: MessageSquare,
    },
    {
      id: 'phone',
      title: 'Phone Call',
      description: 'Schedule a phone call appointment with me',
      icon: Phone,
    },
    {
      id: 'video',
      title: 'Video Call',
      description: 'Book a video call meeting with me for face-to-face conversation',
      icon: Video,
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <MainSidebar onAdminClick={handleAdminClick} />
        
        <main className="flex-1">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <SidebarTrigger className="bg-white/80 hover:bg-white text-slate-600 border border-slate-200 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md" />
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">
                  ConnectHub
                </h1>
                <p className="text-slate-600 text-lg font-medium">Connect With Us</p>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center py-16 px-4 mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-slate-800 mb-6">
                  Connect With Us
                </h2>
                
                <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
                  Book your appointment today. Let's grow together!
                </p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={service.id} 
                    className="bg-white/90 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-blue-200"
                    onClick={() => setActiveForm(service.id)}
                  >
                    <CardHeader className="text-center pb-6">
                      <div className="w-16 h-16 mx-auto bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-slate-800 mb-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pb-6">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-300 font-medium">
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Active Form */}
            {activeForm && (
              <Card className="max-w-4xl mx-auto mb-16 bg-white/95 backdrop-blur-sm border-slate-200 shadow-lg">
                <CardHeader className="text-center py-8">
                  <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
                    {services.find(s => s.id === activeForm)?.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-lg">
                    Fill out the form below to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-8 pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-slate-700 mb-2 block">
                        Full Name *
                      </Label>
                      <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white border-slate-300 text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your full name" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-2 block">
                        Phone Number *
                      </Label>
                      <Input 
                        id="phone" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white border-slate-300 text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Your phone number" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                      Email Address *
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white border-slate-300 text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="your.email@example.com" 
                    />
                  </div>

                  {(activeForm === 'phone' || activeForm === 'video') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-slate-700 mb-2 block">
                          Appointment Date *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="w-full justify-start text-left font-normal bg-white border-slate-300 text-slate-800 hover:bg-slate-50"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.selectedDate ? format(formData.selectedDate, "PPP") : "Select appointment date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-white border-slate-200">
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
                        <Label className="text-sm font-medium text-slate-700 mb-2 block">
                          Time Slot *
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={formData.selectedTime === time ? "default" : "outline"}
                              size="sm"
                              className={`${
                                formData.selectedTime === time 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                              } transition-colors duration-200 text-xs`}
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
                    <Label htmlFor="message" className="text-sm font-medium text-slate-700 mb-2 block">
                      {activeForm === 'message' ? 'Your Message' : 'Additional Notes'}
                    </Label>
                    <Textarea 
                      id="message" 
                      value={formData.message} 
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[120px] bg-white border-slate-300 text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder={activeForm === 'message' ? "Write your message here..." : "Any additional information or special requirements..."} 
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button 
                      onClick={() => handleSubmit(activeForm)} 
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 transition-colors duration-300"
                    >
                      Submit Request
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveForm(null)} 
                      className="px-8 bg-white border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors duration-300"
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
