
import React, { useState, useEffect } from 'react';
import { Mail, Phone, Video, Calendar, Clock, User, MessageSquare, Eye, Trash2, BarChart3, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Submission {
  id: number;
  type: 'message' | 'phone' | 'video';
  name: string;
  email: string;
  phone: string;
  message: string;
  selectedDate?: string;
  selectedTime?: string;
  timestamp: string;
}

interface AdminDashboardContentProps {
  activeView: string;
}

export function AdminDashboardContent({ activeView }: AdminDashboardContentProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const stored = localStorage.getItem('connecthub_submissions');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSubmissions(parsed.sort((a: Submission, b: Submission) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    }
  };

  const deleteSubmission = (id: number) => {
    const updated = submissions.filter(sub => sub.id !== id);
    setSubmissions(updated);
    localStorage.setItem('connecthub_submissions', JSON.stringify(updated));
    setSelectedSubmission(null);
    toast({
      title: "Deleted",
      description: "Submission has been deleted successfully.",
    });
  };

  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Error", 
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('admin_password', newPassword);
    setNewPassword('');
    setConfirmPassword('');
    toast({
      title: "Success",
      description: "Password changed successfully!",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'phone': return Phone;
      case 'video': return Video;
      default: return MessageSquare;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      message: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      phone: 'bg-orange-100 text-orange-800 border-orange-300',
      video: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[type as keyof typeof colors] || colors.message;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatBookingDate = (date?: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (activeView === 'messages') return sub.type === 'message';
    if (activeView === 'phone') return sub.type === 'phone';
    if (activeView === 'video') return sub.type === 'video';
    return true;
  });

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Total Submissions</p>
                <p className="text-3xl font-bold text-yellow-800">{submissions.length}</p>
              </div>
              <Mail className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Messages</p>
                <p className="text-3xl font-bold text-blue-800">
                  {submissions.filter(s => s.type === 'message').length}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Phone Bookings</p>
                <p className="text-3xl font-bold text-orange-800">
                  {submissions.filter(s => s.type === 'phone').length}
                </p>
              </div>
              <Phone className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Video Bookings</p>
                <p className="text-3xl font-bold text-red-800">
                  {submissions.filter(s => s.type === 'video').length}
                </p>
              </div>
              <Video className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Recent Submissions</CardTitle>
            <CardDescription>Latest user interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {submissions.slice(0, 5).map((submission) => {
                const Icon = getTypeIcon(submission.type);
                return (
                  <div key={submission.id} className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Icon className="w-5 h-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{submission.name}</p>
                      <p className="text-sm text-gray-600">{submission.email}</p>
                    </div>
                    <Badge className={getTypeBadge(submission.type)}>
                      {submission.type}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
              <span className="text-yellow-800 font-medium">This Week</span>
              <span className="text-2xl font-bold text-yellow-900">
                {submissions.filter(s => {
                  const submissionDate = new Date(s.timestamp);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return submissionDate > weekAgo;
                }).length}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
              <span className="text-orange-800 font-medium">Total Bookings</span>
              <span className="text-2xl font-bold text-orange-900">
                {submissions.filter(s => s.type !== 'message').length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSubmissionsList = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">
            {activeView === 'messages' ? 'Messages' : 
             activeView === 'phone' ? 'Phone Bookings' :
             activeView === 'video' ? 'Video Bookings' : 'All Submissions'}
          </CardTitle>
          <CardDescription>Click on any submission to view details</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {filteredSubmissions.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No submissions yet
              </div>
            ) : (
              filteredSubmissions.map((submission) => {
                const Icon = getTypeIcon(submission.type);
                return (
                  <div
                    key={submission.id}
                    className={`p-4 border-b hover:bg-yellow-50 cursor-pointer transition-colors ${
                      selectedSubmission?.id === submission.id ? 'bg-yellow-100' : ''
                    }`}
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 mt-1 text-yellow-600" />
                        <div>
                          <div className="font-medium text-gray-900">{submission.name}</div>
                          <div className="text-sm text-gray-600">{submission.email}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatDate(submission.timestamp)}
                          </div>
                        </div>
                      </div>
                      <Badge className={getTypeBadge(submission.type)}>
                        {submission.type}
                      </Badge>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">Submission Details</CardTitle>
          <CardDescription>
            {selectedSubmission ? 'View and manage selected submission' : 'Select a submission to view details'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedSubmission ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getTypeBadge(selectedSubmission.type)}>
                  {selectedSubmission.type.toUpperCase()}
                </Badge>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteSubmission(selectedSubmission.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium">{selectedSubmission.name}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-yellow-600" />
                  <span>{selectedSubmission.email}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-yellow-600" />
                  <span>{selectedSubmission.phone}</span>
                </div>
                
                {selectedSubmission.selectedDate && selectedSubmission.selectedTime && (
                  <>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-yellow-600" />
                      <span>{formatBookingDate(selectedSubmission.selectedDate)}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span>{selectedSubmission.selectedTime}</span>
                    </div>
                  </>
                )}
                
                <div className="pt-3">
                  <label className="text-sm font-medium text-yellow-700 mb-2 block">
                    {selectedSubmission.type === 'message' ? 'Message:' : 'Additional Notes:'}
                  </label>
                  <div className="p-3 bg-yellow-50 rounded-lg text-sm border border-yellow-200">
                    {selectedSubmission.message || 'No message provided'}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 pt-2">
                  Submitted: {formatDate(selectedSubmission.timestamp)}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Eye className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p>Select a submission from the list to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <Card className="max-w-md mx-auto border border-yellow-200">
      <CardHeader>
        <CardTitle className="text-yellow-800">Change Password</CardTitle>
        <CardDescription>Update your admin password</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="border-2 border-yellow-200 focus:border-yellow-400"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="border-2 border-yellow-200 focus:border-yellow-400"
          />
        </div>
        <Button 
          onClick={changePassword} 
          className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600"
          disabled={!newPassword || !confirmPassword}
        >
          Change Password
        </Button>
      </CardContent>
    </Card>
  );

  if (activeView === 'settings') {
    return renderSettings();
  }
  
  if (activeView === 'dashboard') {
    return renderDashboard();
  }

  return renderSubmissionsList();
}
