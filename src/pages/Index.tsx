
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
import { 
  MessageSquare, 
  Phone, 
  Video, 
  Calendar as CalendarIcon, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Zap,
  Crown,
  Rocket,
  Shield,
  ChevronRight,
  Users,
  Calendar1
} from 'lucide-react';
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
      title: "🎉 Connection Requested!",
      description: `Your ${type === 'message' ? 'message' : type === 'phone' ? 'call appointment' : 'video meeting'} has been scheduled successfully.`,
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
      title: 'Instant Connect',
      description: 'Send us a message and get connected instantly with our premium support team',
      icon: MessageSquare,
      color: 'from-yellow-400 via-yellow-500 to-yellow-600',
      bgColor: 'from-black/90 via-gray-900/90 to-black/90',
      borderColor: 'border-yellow-500/50',
      accent: 'text-yellow-400'
    },
    {
      id: 'phone',
      title: 'Voice Connect',
      description: 'Schedule a premium voice consultation with our expert team members',
      icon: Phone,
      color: 'from-yellow-500 via-yellow-400 to-yellow-600',
      bgColor: 'from-black/90 via-gray-900/90 to-black/90',
      borderColor: 'border-yellow-500/50',
      accent: 'text-yellow-400'
    },
    {
      id: 'video',
      title: 'Visual Connect',
      description: 'Book a face-to-face premium video session for the ultimate connection experience',
      icon: Video,
      color: 'from-yellow-600 via-yellow-500 to-yellow-400',
      bgColor: 'from-black/90 via-gray-900/90 to-black/90',
      borderColor: 'border-yellow-500/50',
      accent: 'text-yellow-400'
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-black via-gray-900 to-yellow-900 relative overflow-hidden">
        {/* Premium Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-300/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
          
          {/* Premium floating particles */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-yellow-400/60 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-yellow-500/80 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-yellow-300/70 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 bg-yellow-600/50 rounded-full animate-bounce delay-1500"></div>
        </div>

        <MainSidebar onAdminClick={handleAdminClick} />
        
        <main className="flex-1 relative z-10">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <SidebarTrigger className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-110" />
              <div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                  ConnectHub
                </h1>
                <p className="text-yellow-200/90 mt-1 text-xl font-medium">Premium Connection Platform</p>
              </div>
            </div>

            {/* Premium Hero Section */}
            <div className="text-center py-24 px-4 relative">
              <div className="relative z-10 max-w-5xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-12">
                  <Crown className="w-16 h-16 text-yellow-400 animate-bounce" />
                  <h2 className="text-7xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    Connect With Us
                  </h2>
                  <Shield className="w-16 h-16 text-yellow-500 animate-pulse" />
                </div>
                
                <p className="text-3xl text-yellow-100/90 mb-16 leading-relaxed font-medium">
                  Your premium gateway to seamless connections and professional networking
                </p>

                {/* Premium connection stats */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                  <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm px-8 py-4 rounded-2xl border border-yellow-500/30 hover:bg-black/70 transition-all duration-300 transform hover:scale-110">
                    <Users className="w-8 h-8 text-yellow-400" />
                    <div className="text-left">
                      <div className="text-2xl font-bold text-yellow-400">10K+</div>
                      <div className="text-yellow-200 font-medium">Premium Connections</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm px-8 py-4 rounded-2xl border border-yellow-500/30 hover:bg-black/70 transition-all duration-300 transform hover:scale-110">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <div className="text-left">
                      <div className="text-2xl font-bold text-yellow-400">24/7</div>
                      <div className="text-yellow-200 font-medium">Expert Support</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm px-8 py-4 rounded-2xl border border-yellow-500/30 hover:bg-black/70 transition-all duration-300 transform hover:scale-110">
                    <Rocket className="w-8 h-8 text-yellow-400" />
                    <div className="text-left">
                      <div className="text-2xl font-bold text-yellow-400">99%</div>
                      <div className="text-yellow-200 font-medium">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 max-w-7xl mx-auto">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.id}
                    className={`relative overflow-hidden bg-gradient-to-br ${service.bgColor} ${service.borderColor} border-2 hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-700 transform hover:scale-110 cursor-pointer group backdrop-blur-xl`}
                    onClick={() => setActiveForm(service.id)}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-700"></div>
                    <div className="relative">
                      <CardHeader className="text-center pb-8">
                        <div className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform duration-700 relative`}>
                          <Icon className="w-12 h-12 text-black" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" />
                        </div>
                        <CardTitle className="text-3xl font-black text-yellow-400 mb-4">{service.title}</CardTitle>
                        <CardDescription className="text-yellow-100/90 text-lg leading-relaxed font-medium">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-black font-black px-10 py-6 rounded-2xl transition-all duration-500 transform group-hover:scale-110 shadow-2xl text-lg`}>
                          Connect Now
                          <ChevronRight className="w-6 h-6 ml-2" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Premium Active Form */}
            {activeForm && (
              <Card className="max-w-4xl mx-auto mb-20 shadow-2xl border-2 border-yellow-500/50 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-lg blur opacity-30 animate-pulse"></div>
                <div className="relative">
                  <CardHeader className="text-center">
                    <CardTitle className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-4">
                      {services.find(s => s.id === activeForm)?.title}
                    </CardTitle>
                    <CardDescription className="text-yellow-100/90 text-xl font-medium">
                      Ready to connect? Fill out your premium connection request
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="name" className="text-xl font-bold text-yellow-400 mb-3 block">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="text-lg py-4 bg-black/50 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm rounded-xl"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-xl font-bold text-yellow-400 mb-3 block">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="text-lg py-4 bg-black/50 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm rounded-xl"
                          placeholder="Your contact number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-xl font-bold text-yellow-400 mb-3 block">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="text-lg py-4 bg-black/50 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm rounded-xl"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {(activeForm === 'phone' || activeForm === 'video') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <Label className="text-xl font-bold text-yellow-400 mb-3 block">Preferred Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal py-4 text-lg bg-black/50 border-yellow-500/30 text-yellow-100 hover:bg-black/70 backdrop-blur-sm rounded-xl"
                              >
                                <Calendar1 className="mr-3 h-6 w-6" />
                                {formData.selectedDate ? format(formData.selectedDate, "PPP") : "Select appointment date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-black/95 backdrop-blur-xl border-yellow-500/50">
                              <Calendar
                                mode="single"
                                selected={formData.selectedDate}
                                onSelect={(date) => setFormData({ ...formData, selectedDate: date })}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="text-yellow-100"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label className="text-xl font-bold text-yellow-400 mb-3 block">Preferred Time *</Label>
                          <div className="grid grid-cols-3 gap-3">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={formData.selectedTime === time ? "default" : "outline"}
                                size="sm"
                                className={`${
                                  formData.selectedTime === time 
                                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg font-bold' 
                                    : 'bg-black/50 border-yellow-500/30 text-yellow-100 hover:bg-black/70 backdrop-blur-sm'
                                } transition-all duration-300 py-3 rounded-xl`}
                                onClick={() => setFormData({ ...formData, selectedTime: time })}
                              >
                                <Clock className="w-4 h-4 mr-1" />
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="message" className="text-xl font-bold text-yellow-400 mb-3 block">
                        {activeForm === 'message' ? 'Your Message' : 'Additional Details'}
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="min-h-[150px] text-lg bg-black/50 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm rounded-xl"
                        placeholder={
                          activeForm === 'message' 
                            ? "Tell us what you'd like to connect about..." 
                            : "Any specific topics or questions you'd like to discuss?"
                        }
                      />
                    </div>

                    <div className="flex gap-6 pt-8">
                      <Button 
                        onClick={() => handleSubmit(activeForm)}
                        className="flex-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-600 text-black font-black py-6 text-xl rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl"
                      >
                        <Rocket className="w-6 h-6 mr-3" />
                        Submit Connection Request
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveForm(null)}
                        className="px-10 py-6 bg-black/50 border-yellow-500/30 text-yellow-100 hover:bg-black/70 text-xl rounded-2xl backdrop-blur-sm transition-all duration-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </div>
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
