
import React, { useState, useEffect } from 'react';
import { Mail, Phone, Video, Calendar, Clock, User, MessageSquare, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
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
      message: 'bg-blue-100 text-blue-800',
      phone: 'bg-green-100 text-green-800',
      video: 'bg-purple-100 text-purple-800'
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ConnectHub Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage all your connection requests and bookings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-3xl font-bold text-gray-900">{submissions.length}</p>
                </div>
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {submissions.filter(s => s.type === 'message').length}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {submissions.filter(s => s.type === 'phone').length}
                  </p>
                </div>
                <Phone className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Video Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {submissions.filter(s => s.type === 'video').length}
                  </p>
                </div>
                <Video className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submissions List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Click on any submission to view details</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {submissions.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No submissions yet
                  </div>
                ) : (
                  submissions.map((submission) => {
                    const Icon = getTypeIcon(submission.type);
                    return (
                      <div
                        key={submission.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedSubmission?.id === submission.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Icon className="w-5 h-5 mt-1 text-gray-500" />
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

          {/* Submission Details */}
          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
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
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{selectedSubmission.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{selectedSubmission.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedSubmission.phone}</span>
                    </div>
                    
                    {selectedSubmission.selectedDate && selectedSubmission.selectedTime && (
                      <>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{formatBookingDate(selectedSubmission.selectedDate)}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{selectedSubmission.selectedTime}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="pt-3">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        {selectedSubmission.type === 'message' ? 'Message:' : 'Additional Notes:'}
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg text-sm">
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
      </div>
    </div>
  );
};

export default AdminDashboard;
