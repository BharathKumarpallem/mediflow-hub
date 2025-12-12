import React from 'react';
import { Clock, User, MoreVertical } from 'lucide-react';
import { Appointment } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppointmentListProps {
  appointments: Appointment[];
  title?: string;
}

const statusColors = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  confirmed: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  no_show: 'bg-muted text-muted-foreground border-muted',
};

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, title = "Today's Appointments" }) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-display font-semibold text-card-foreground">{title}</h3>
      </div>
      <div className="divide-y divide-border">
        {appointments.map((appointment, index) => (
          <div
            key={appointment.id}
            className="px-6 py-4 hover:bg-muted/50 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">
                    {appointment.patient.firstName} {appointment.patient.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{appointment.doctor.user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {formatTime(appointment.appointmentTime)}
                  </div>
                  <Badge className={cn('mt-1', statusColors[appointment.status])}>
                    {appointment.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {appointment.reason && (
              <p className="mt-2 text-sm text-muted-foreground pl-16">{appointment.reason}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
