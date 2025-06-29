
import React, { useState } from 'react';
import { Lock, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
  onLogin
}) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    toast
  } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (password === 'admin1122') {
        onLogin();
        toast({
          title: "Access Granted",
          description: "Welcome to the ConnectHub admin dashboard!"
        });
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid password. Please try again.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-300/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-500/80 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-yellow-300/70 rounded-full animate-bounce delay-1000"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 relative overflow-hidden bg-black/80 backdrop-blur-xl">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg blur opacity-75 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 rounded-lg border border-yellow-500/30">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-4 shadow-2xl relative group">
              <Shield className="w-12 h-12 text-black animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur opacity-25 animate-pulse group-hover:opacity-50 transition-all duration-500"></div>
              <Zap className="absolute top-2 right-2 w-4 h-4 text-yellow-300 animate-bounce" />
            </div>
            <CardTitle className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              ADMIN ACCESS
            </CardTitle>
            <CardDescription className="text-xl text-yellow-100/80 font-medium">
              Enter credentials to access the premium dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <Label htmlFor="password" className="flex items-center gap-3 text-xl font-bold text-yellow-400 mb-3">
                  <Lock className="w-6 h-6 animate-pulse" />
                  Security Key
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  className="text-xl py-4 border-2 border-yellow-500/30 focus:border-yellow-400 transition-all duration-300 bg-black/50 text-yellow-100 placeholder:text-yellow-500/50 backdrop-blur-sm rounded-xl" 
                  placeholder="Enter admin key" 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-600 text-black font-black py-6 text-xl rounded-xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50 border-2 border-yellow-400/50" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    AUTHENTICATING...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    ACCESS DASHBOARD
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>;
};

export default AdminLogin;
