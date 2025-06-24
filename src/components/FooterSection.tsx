
import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FooterSection() {
  return (
    <footer className="mt-16 border-t border-blue-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Let's Connect
            </h3>
            <p className="text-gray-600">
              Follow me on social media or send me an email
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            >
              <a 
                href="https://www.linkedin.com/in/junaid-ahmad-646117330/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium">LinkedIn</span>
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              <a 
                href="https://github.com/junaidaslam2006" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" />
                <span className="font-medium">GitHub</span>
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
            >
              <a 
                href="mailto:aslamjunaid838@gmail.com"
                className="flex items-center gap-2"
              >
                <Mail className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Email</span>
              </a>
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500 pt-4 border-t border-blue-100 w-full">
            <p>&copy; 2024 ConnectHub. Built with passion for connecting minds.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
