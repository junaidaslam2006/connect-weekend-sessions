
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
  Calendar1,
  Star,
  Atom,
  Orbit,
  Layers,
  Hexagon
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
      title: "🎉 Connection Established!",
      description: `Your ${type === 'message' ? 'message' : type === 'phone' ? 'voice session' : 'visual meeting'} has been secured in our quantum network.`,
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
      title: 'Quantum Message',
      description: 'Instantaneous communication through our advanced neural network infrastructure',
      icon: MessageSquare,
      color: 'from-yellow-400 via-yellow-500 to-yellow-600',
      bgColor: 'from-black/95 via-gray-900/95 to-yellow-900/20',
      borderColor: 'border-yellow-500/60',
      accent: 'text-yellow-400',
      glowColor: 'shadow-yellow-500/50'
    },
    {
      id: 'phone',
      title: 'Neural Voice Sync',
      description: 'High-fidelity voice connection with quantum-encrypted audio transmission',
      icon: Phone,
      color: 'from-yellow-500 via-yellow-400 to-yellow-600',
      bgColor: 'from-black/95 via-gray-900/95 to-yellow-900/20',
      borderColor: 'border-yellow-500/60',
      accent: 'text-yellow-400',
      glowColor: 'shadow-yellow-500/50'
    },
    {
      id: 'video',
      title: 'Holographic Connect',
      description: 'Ultra-immersive visual experience with next-generation display technology',
      icon: Video,
      color: 'from-yellow-600 via-yellow-500 to-yellow-400',
      bgColor: 'from-black/95 via-gray-900/95 to-yellow-900/20',
      borderColor: 'border-yellow-500/60',
      accent: 'text-yellow-400',
      glowColor: 'shadow-yellow-500/50'
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-black via-gray-900 to-yellow-900 relative overflow-hidden">
        {/* Ultra-Premium Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Multiple layered gradients for depth */}
          <div className="absolute -top-96 -right-96 w-[800px] h-[800px] bg-gradient-radial from-yellow-500/30 via-yellow-400/20 to-transparent rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] bg-gradient-radial from-yellow-400/25 via-yellow-300/15 to-transparent rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-yellow-300/20 via-yellow-500/10 to-transparent rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-500"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-400/40 rotate-45 animate-bounce delay-300 backdrop-blur-sm border border-yellow-500/30"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-yellow-500/50 rounded-full animate-bounce delay-700 backdrop-blur-sm"></div>
          <div className="absolute top-1/2 right-1/3 w-10 h-10 bg-yellow-300/30 rotate-12 animate-bounce delay-1000 backdrop-blur-sm border border-yellow-400/40"></div>
          <div className="absolute top-1/3 left-2/3 w-4 h-4 bg-yellow-600/40 rounded-full animate-bounce delay-1500 backdrop-blur-sm"></div>
          <div className="absolute top-2/3 left-1/5 w-12 h-1 bg-yellow-400/50 animate-pulse delay-800 backdrop-blur-sm"></div>
          
          {/* Orbiting elements */}
          <div className="absolute top-1/3 right-1/4 w-20 h-20 animate-spin-slow">
            <Orbit className="w-full h-full text-yellow-400/30" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 w-16 h-16 animate-pulse">
            <Hexagon className="w-full h-full text-yellow-500/25" />
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:50px_50px] opacity-20"></div>
        </div>

        <MainSidebar onAdminClick={handleAdminClick} />
        
        <main className="flex-1 relative z-10">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <SidebarTrigger className="bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 border border-yellow-500/50 backdrop-blur-sm transition-all duration-500 hover:scale-125 shadow-lg hover:shadow-yellow-500/25" />
              <div className="relative">
                <h1 className="text-8xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-pulse relative">
                  ConnectHub
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-500/20 blur-xl -z-10 animate-pulse"></div>
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <Atom className="w-8 h-8 text-yellow-400 animate-spin-slow" />
                  <p className="text-yellow-200/90 text-2xl font-bold tracking-wide">Neural Connection Matrix</p>
                  <Layers className="w-8 h-8 text-yellow-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Ultra-Premium Hero Section */}
            <div className="text-center py-32 px-4 relative">
              <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex items-center justify-center gap-8 mb-16">
                  <div className="relative">
                    <Crown className="w-24 h-24 text-yellow-400 animate-bounce" />
                    <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                  </div>
                  <h2 className="text-9xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent relative">
                    Connect With Us
                    <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-500/10 blur-2xl -z-10 animate-pulse"></div>
                  </h2>
                  <div className="relative">
                    <Shield className="w-24 h-24 text-yellow-500 animate-pulse" />
                    <div className="absolute -inset-2 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
                  </div>
                </div>
                
                <div className="relative mb-20">
                  <p className="text-5xl text-yellow-100/95 leading-relaxed font-bold tracking-wide relative z-10">
                    Experience the future of human connection through our
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"> quantum-powered neural network</span>
                  </p>
                  <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-500/5 blur-3xl -z-10 animate-pulse"></div>
                </div>

                {/* Floating connection nodes */}
                <div className="relative mb-24 h-40">
                  <div className="absolute top-0 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute top-10 right-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-ping delay-700"></div>
                  <div className="absolute bottom-0 left-1/2 w-5 h-5 bg-yellow-300 rounded-full animate-ping delay-1000"></div>
                  <div className="absolute top-1/2 left-1/5 w-2 h-2 bg-yellow-600 rounded-full animate-ping delay-300"></div>
                  <div className="absolute bottom-10 right-1/4 w-6 h-6 bg-yellow-400/50 rounded-full animate-pulse"></div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200">
                    <defs>
                      <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(234 179 8 / 0.6)" />
                        <stop offset="50%" stopColor="rgb(234 179 8 / 0.3)" />
                        <stop offset="100%" stopColor="rgb(234 179 8 / 0.6)" />
                      </linearGradient>
                    </defs>
                    <path d="M200,20 Q400,100 600,40" stroke="url(#connectionGrad)" strokeWidth="2" fill="none" className="animate-pulse" />
                    <path d="M150,80 Q400,20 650,120" stroke="url(#connectionGrad)" strokeWidth="2" fill="none" className="animate-pulse delay-500" />
                    <path d="M100,140 Q400,60 700,180" stroke="url(#connectionGrad)" strokeWidth="2" fill="none" className="animate-pulse delay-1000" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Ultra-Premium Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 max-w-8xl mx-auto">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.id}
                    className={`relative overflow-hidden bg-gradient-to-br ${service.bgColor} ${service.borderColor} border-2 hover:shadow-2xl ${service.glowColor} hover:shadow-2xl transition-all duration-1000 transform hover:scale-110 cursor-pointer group backdrop-blur-2xl`}
                    onClick={() => setActiveForm(service.id)}
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animation: 'fade-in 1s ease-out forwards'
                    }}
                  >
                    {/* Animated border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
                    
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5 rounded-2xl"></div>
                    
                    <div className="relative z-10">
                      <CardHeader className="text-center pb-10">
                        <div className="relative mb-10">
                          <div className={`w-32 h-32 mx-auto bg-gradient-to-r ${service.color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform duration-1000 relative`}>
                            <Icon className="w-16 h-16 text-black" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>
                            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/50 to-yellow-400/50 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                          </div>
                          <div className="absolute -top-4 -right-4">
                            <Sparkles className="w-10 h-10 text-yellow-300 animate-spin-slow" />
                          </div>
                          <div className="absolute -bottom-4 -left-4">
                            <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                          </div>
                        </div>
                        <CardTitle className="text-4xl font-black text-yellow-400 mb-6 group-hover:text-yellow-300 transition-colors duration-500">{service.title}</CardTitle>
                        <CardDescription className="text-yellow-100/95 text-xl leading-relaxed font-semibold">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center pb-8">
                        <Button className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-black font-black px-12 py-8 rounded-3xl transition-all duration-700 transform group-hover:scale-110 shadow-2xl text-xl relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                          <span className="relative z-10 flex items-center gap-3">
                            Initialize Connection
                            <ChevronRight className="w-6 h-6" />
                          </span>
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Ultra-Premium Active Form */}
            {activeForm && (
              <Card className="max-w-6xl mx-auto mb-24 shadow-2xl border-2 border-yellow-500/60 bg-gradient-to-br from-black/98 via-gray-900/98 to-yellow-900/20 backdrop-blur-2xl relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-2xl blur opacity-40 animate-pulse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.1),transparent_70%)] rounded-2xl"></div>
                
                <div className="relative z-10">
                  <CardHeader className="text-center py-12">
                    <div className="flex items-center justify-center gap-6 mb-8">
                      <Atom className="w-16 h-16 text-yellow-400 animate-spin-slow" />
                      <CardTitle className="text-7xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                        {services.find(s => s.id === activeForm)?.title}
                      </CardTitle>
                      <Rocket className="w-16 h-16 text-yellow-500 animate-bounce" />
                    </div>
                    <CardDescription className="text-yellow-100/95 text-2xl font-bold">
                      Initialize your quantum connection protocol
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-10 px-12 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <Label htmlFor="name" className="text-2xl font-black text-yellow-400 mb-4 block">Neural ID *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="text-xl py-6 bg-black/60 border-yellow-500/40 text-yellow-100 placeholder:text-yellow-500/60 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm rounded-2xl transition-all duration-300"
                          placeholder="Enter your quantum identifier"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-2xl font-black text-yellow-400 mb-4 block">Neural Link *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="text-xl py-6 bg-black/60 border-yellow-500/40 text-yellow-100 placeholder:text-yellow-500/60 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm rounded-2xl transition-all duration-300"
                          placeholder="Your connection frequency"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-2xl font-black text-yellow-400 mb-4 block">Quantum Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="text-xl py-6 bg-black/60 border-yellow-500/40 text-yellow-100 placeholder:text-yellow-500/60 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm rounded-2xl transition-all duration-300"
                        placeholder="your.neural@quantum.net"
                      />
                    </div>

                    {(activeForm === 'phone' || activeForm === 'video') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                          <Label className="text-2xl font-black text-yellow-400 mb-4 block">Connection Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal py-6 text-xl bg-black/60 border-yellow-500/40 text-yellow-100 hover:bg-black/80 backdrop-blur-sm rounded-2xl transition-all duration-300"
                              >
                                <Calendar1 className="mr-4 h-8 w-8" />
                                {formData.selectedDate ? format(formData.selectedDate, "PPP") : "Select neural sync date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-black/95 backdrop-blur-2xl border-yellow-500/60 rounded-2xl">
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
                          <Label className="text-2xl font-black text-yellow-400 mb-4 block">Time Frequency *</Label>
                          <div className="grid grid-cols-3 gap-4">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={formData.selectedTime === time ? "default" : "outline"}
                                size="sm"
                                className={`${
                                  formData.selectedTime === time 
                                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-xl font-black' 
                                    : 'bg-black/60 border-yellow-500/40 text-yellow-100 hover:bg-black/80 backdrop-blur-sm'
                                } transition-all duration-500 py-4 rounded-2xl text-lg hover:scale-105`}
                                onClick={() => setFormData({ ...formData, selectedTime: time })}
                              >
                                <Clock className="w-5 h-5 mr-2" />
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="message" className="text-2xl font-black text-yellow-400 mb-4 block">
                        {activeForm === 'message' ? 'Neural Message' : 'Connection Parameters'}
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="min-h-[200px] text-xl bg-black/60 border-yellow-500/40 text-yellow-100 placeholder:text-yellow-500/60 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-sm rounded-2xl transition-all duration-300"
                        placeholder={
                          activeForm === 'message' 
                            ? "Transmit your quantum message through our neural network..." 
                            : "Specify connection protocols and neural sync parameters..."
                        }
                      />
                    </div>

                    <div className="flex gap-8 pt-10">
                      <Button 
                        onClick={() => handleSubmit(activeForm)}
                        className="flex-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-600 text-black font-black py-8 text-2xl rounded-3xl transition-all duration-700 transform hover:scale-105 shadow-2xl relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                        <span className="relative z-10 flex items-center gap-4">
                          <Rocket className="w-8 h-8" />
                          Establish Quantum Link
                          <Sparkles className="w-8 h-8 animate-spin" />
                        </span>
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveForm(null)}
                        className="px-12 py-8 bg-black/60 border-yellow-500/40 text-yellow-100 hover:bg-black/80 text-2xl rounded-3xl backdrop-blur-sm transition-all duration-500 hover:scale-105"
                      >
                        Abort Connection
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
