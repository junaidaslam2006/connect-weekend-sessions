
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
  Star,
  Rocket,
  Globe,
  Heart
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
      title: "🎉 Success!",
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
      title: 'Instant Messaging',
      description: 'Lightning-fast communication with real-time responses',
      icon: MessageSquare,
      color: 'from-cyan-400 via-blue-500 to-purple-600',
      bgColor: 'from-cyan-50 via-blue-50 to-purple-50',
      borderColor: 'border-cyan-300',
      accent: 'text-cyan-600'
    },
    {
      id: 'phone',
      title: 'Smart Phone Call',
      description: 'Crystal clear voice calls with intelligent scheduling',
      icon: Phone,
      color: 'from-emerald-400 via-green-500 to-teal-600',
      bgColor: 'from-emerald-50 via-green-50 to-teal-50',
      borderColor: 'border-emerald-300',
      accent: 'text-emerald-600'
    },
    {
      id: 'video',
      title: 'HD Video Call',
      description: 'Ultra-HD video meetings with advanced features',
      icon: Video,
      color: 'from-pink-400 via-rose-500 to-red-600',
      bgColor: 'from-pink-50 via-rose-50 to-red-50',
      borderColor: 'border-pink-300',
      accent: 'text-pink-600'
    }
  ];

  const features = [
    { icon: Zap, text: 'Lightning Fast' },
    { icon: Star, text: 'Premium Quality' },
    { icon: Rocket, text: 'Next-Gen Tech' },
    { icon: Globe, text: 'Global Reach' }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400/50 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce delay-1000"></div>
        </div>

        <MainSidebar onAdminClick={handleAdminClick} />
        
        <main className="flex-1 relative z-10">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <SidebarTrigger className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300" />
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent animate-pulse">
                  ConnectHub
                </h1>
                <p className="text-white/80 mt-1 text-lg">The Future of Communication</p>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center py-20 px-4 relative">
              <div className="relative z-10 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Sparkles className="w-12 h-12 text-cyan-400 animate-spin" />
                  <h2 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Connect Beyond Limits
                  </h2>
                  <Heart className="w-12 h-12 text-pink-400 animate-pulse" />
                </div>
                
                <p className="text-2xl text-white/90 mb-12 leading-relaxed">
                  Experience the next generation of communication with our 
                  <span className="text-cyan-400 font-semibold"> AI-powered platform</span> that brings people together like never before.
                </p>

                {/* Features badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div 
                        key={index}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                      >
                        <Icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-white font-medium">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.id}
                    className={`relative overflow-hidden bg-gradient-to-br ${service.bgColor} ${service.borderColor} border-2 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 cursor-pointer group backdrop-blur-sm bg-white/10 hover:bg-white/20`}
                    onClick={() => setActiveForm(service.id)}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative">
                      <CardHeader className="text-center pb-6">
                        <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform duration-500 relative`}>
                          <Icon className="w-10 h-10 text-white" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-white mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-white/80 text-base leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-lg`}>
                          Launch Experience
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Active Form */}
            {activeForm && (
              <Card className="max-w-3xl mx-auto mb-16 shadow-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-lg blur opacity-30"></div>
                <div className="relative">
                  <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent mb-2">
                      {services.find(s => s.id === activeForm)?.title}
                    </CardTitle>
                    <CardDescription className="text-white/80 text-lg">
                      Ready to connect? Fill out the details below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-lg font-medium text-white">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-2 text-lg py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400 backdrop-blur-sm"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-lg font-medium text-white">Phone *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-2 text-lg py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400 backdrop-blur-sm"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-lg font-medium text-white">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2 text-lg py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400 backdrop-blur-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {(activeForm === 'phone' || activeForm === 'video') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-lg font-medium text-white">Select Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full mt-2 justify-start text-left font-normal py-3 text-lg bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                              >
                                <CalendarIcon className="mr-2 h-5 w-5" />
                                {formData.selectedDate ? format(formData.selectedDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm">
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
                          <Label className="text-lg font-medium text-white">Select Time *</Label>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={formData.selectedTime === time ? "default" : "outline"}
                                size="sm"
                                className={`${
                                  formData.selectedTime === time 
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg' 
                                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm'
                                } transition-all duration-300`}
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
                      <Label htmlFor="message" className="text-lg font-medium text-white">
                        {activeForm === 'message' ? 'Message' : 'Additional Notes'}
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-2 min-h-[120px] text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400 backdrop-blur-sm"
                        placeholder={
                          activeForm === 'message' 
                            ? "Share your thoughts..." 
                            : "Anything specific you'd like to discuss?"
                        }
                      />
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Button 
                        onClick={() => handleSubmit(activeForm)}
                        className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                      >
                        <Rocket className="w-5 h-5 mr-2" />
                        Launch {services.find(s => s.id === activeForm)?.title}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveForm(null)}
                        className="px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
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
