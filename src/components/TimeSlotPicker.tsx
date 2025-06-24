
import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TimeSlotPickerProps {
  onTimeSlotSelect: (date: string, time: string) => void;
  selectedDate: string;
  selectedTime: string;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ 
  onTimeSlotSelect, 
  selectedDate, 
  selectedTime 
}) => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  useEffect(() => {
    // Generate next 8 weekends (Saturday and Sunday)
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Check if it's Saturday (6) or Sunday (0)
      if (date.getDay() === 0 || date.getDay() === 6) {
        const dateString = date.toISOString().split('T')[0];
        dates.push(dateString);
      }
      
      if (dates.length >= 16) break; // Get next 8 weekends
    }
    
    setAvailableDates(dates);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { dayName, monthDay };
  };

  const handleDateSelect = (date: string) => {
    onTimeSlotSelect(date, selectedTime);
  };

  const handleTimeSelect = (time: string) => {
    onTimeSlotSelect(selectedDate, time);
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Select a Date (Weekends Only)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {availableDates.map((date) => {
            const { dayName, monthDay } = formatDate(date);
            return (
              <Card
                key={date}
                className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedDate === date 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleDateSelect(date)}
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">{dayName}</div>
                  <div className="text-lg font-semibold">{monthDay}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Select a Time (30-minute sessions)
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => handleTimeSelect(time)}
                className={`text-sm ${
                  selectedTime === time 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'hover:bg-blue-50'
                }`}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">
              Selected: {formatDate(selectedDate).dayName}, {formatDate(selectedDate).monthDay} at {selectedTime}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
