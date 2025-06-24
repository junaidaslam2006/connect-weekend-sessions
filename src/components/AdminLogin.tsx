
import React, { useState } from 'react';
import { Lock, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const storedPassword = localStorage.getItem('admin_password') || 'admin123';
      
      if (password === storedPassword) {
        onLogin();
        toast({
          title: "Access Granted",
          description: "Welcome to the ConnectHub admin dashboard!",
        });
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 relative overflow-hidden bg-white/90 backdrop-blur-sm">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-75"></div>
        <div className="relative bg-white rounded-lg">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow-xl relative">
              <Shield className="w-10 h-10 text-white" />
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-25 animate-pulse"></div>
            </div>
            <div className="flex justify-center items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-600 animate-pulse" />
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Admin Access
              </CardTitle>
              <Sparkles className="w-5 h-5 text-orange-600 animate-pulse delay-500" />
            </div>
            <CardDescription className="text-lg text-gray-600">
              Enter your password to access the ConnectHub admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="password" className="flex items-center gap-2 text-lg font-medium text-yellow-700">
                  <Lock className="w-5 h-5" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 text-lg py-3 border-2 border-yellow-200 focus:border-yellow-400 transition-colors duration-200"
                  placeholder="Enter admin password"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Access Dashboard'}
              </Button>
            </form>
            <div className="p-4 bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800 text-center">
                <strong>Default Password:</strong> admin123
              </p>
              <p className="text-xs text-yellow-700 text-center mt-1">
                Change your password in the admin settings
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
