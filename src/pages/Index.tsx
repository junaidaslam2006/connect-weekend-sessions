
import React, { useState } from 'react';
import { MessageSquare, Phone, Video, Send, Calendar, Clock, User, Mail, PhoneIcon, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/MainSidebar';
import { FooterSection } from '@/components/FooterSection';

const Index = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
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
      color: 'from-blue-500 to-purple-600',
      hoverColor: 'hover:shadow-blue-500/25'
    },
    {
      id: 'phone',
      title: 'Phone Call',
      description: '30-minute phone conversation (weekends only)',
      icon: Phone,
      color: 'from-green-500 to-teal-600',
      hoverColor: 'hover:shadow-green-500/25'
    },
    {
      id: 'video',
      title: 'Video Call',
      description: '30-minute video session (weekends only)',
      icon: Video,
      color: 'from-purple-500 to-pink-600',
      hoverColor: 'hover:shadow-purple-500/25'
    }
  ];

  if (showAdminPanel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <Button 
              onClick={() => setShowAdminPanel(false)}
              variant="outline"
              className="border-blue-200 hover:bg-blue-50"
            >
              Back to Home
            </Button>
          </div>
          
          <div className="grid gap-6">
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="text-blue-800">Submissions</CardTitle>
                <CardDescription>All user submissions and requests</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {JSON.parse(localStorage.getItem('connecthub_submissions') || '[]').length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No submissions yet</p>
                ) : (
                  <div className="space-y-4">
                    {JSON.parse(localStorage.getItem('connecthub_submissions') || '[]').map((submission: any) => (
                      <div key={submission.id} className="p-4 border border-blue-100 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-blue-800 capitalize">{submission.type}</span>
                          <span className="text-sm text-gray-600">{new Date(submission.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                          <p><strong>Name:</strong> {submission.name}</p>
                          <p><strong>Email:</strong> {submission.email}</p>
                          <p><strong>Phone:</strong> {submission.phone}</p>
                          {submission.selectedDate && <p><strong>Date:</strong> {submission.selectedDate}</p>}
                          {submission.selectedTime && <p><strong>Time:</strong> {submission.selectedTime}</p>}
                        </div>
                        {submission.message && (
                          <p className="mt-2 text-sm"><strong>Message:</strong> {submission.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <MainSidebar onAdminClick={() => setShowAdminPanel(true)} />
        
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <main className="flex-1 relative z-10">
          <div className="container mx-auto px-4 py-8">
            {/* Header with Sidebar Trigger */}
            <div className="flex items-center gap-4 mb-8">
              <SidebarTrigger className="bg-blue-100 hover:bg-blue-200 text-blue-800 md:hidden" />
              <div className="text-center flex-1">
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                  ConnectHub
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                  Let's exchange ideas and work on amazing projects together
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
              </div>
            </div>

            {!selectedService ? (
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
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
              <div className="max-w-2xl mx-auto mb-16">
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center relative">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedService(null)}
                      className="absolute top-4 left-4 hover:bg-blue-100"
                    >
                      ← Back
                    </Button>
                    <div className="pt-8">
                      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                            <User className="w-4 h-4 text-blue-600" />
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="border-2 border-blue-200 focus:border-blue-400"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                            <Mail className="w-4 h-4 text-blue-600" />
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="border-2 border-blue-200 focus:border-blue-400"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2 font-medium">
                          <PhoneIcon className="w-4 h-4 text-blue-600" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="border-2 border-blue-200 focus:border-blue-400"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" className="flex items-center gap-2 font-medium">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                          {selectedService === 'message' ? 'Your Message' : 'Additional Notes (Optional)'}
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required={selectedService === 'message'}
                          className="min-h-[120px] border-2 border-blue-200 focus:border-blue-400"
                          placeholder={selectedService === 'message' 
                            ? "Share your thoughts and ideas..." 
                            : "Any specific topics you'd like to discuss?"
                          }
                        />
                      </div>
                      
                      {(selectedService === 'phone' || selectedService === 'video') && (
                        <div className="space-y-3">
                          <Label className="flex items-center gap-2 font-medium">
                            <Clock className="w-4 h-4 text-blue-600" />
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
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
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

          <FooterSection />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
