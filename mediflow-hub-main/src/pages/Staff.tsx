import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Search, UserCog, Clock, Phone, Mail, MoreVertical } from 'lucide-react';
import AddStaffDialog from '@/components/dialogs/AddStaffDialog';

const mockStaff = [
  {
    id: '1',
    name: 'Nancy White',
    role: 'Head Nurse',
    department: 'ICU',
    shift: '7:00 AM - 3:00 PM',
    phone: '+1234567900',
    email: 'nancy@hospital.com',
    status: 'on-duty',
  },
  {
    id: '2',
    name: 'Robert Brown',
    role: 'Lab Technician',
    department: 'Laboratory',
    shift: '8:00 AM - 4:00 PM',
    phone: '+1234567901',
    email: 'robert@hospital.com',
    status: 'on-duty',
  },
  {
    id: '3',
    name: 'Jennifer Martinez',
    role: 'Nurse',
    department: 'Emergency',
    shift: '3:00 PM - 11:00 PM',
    phone: '+1234567902',
    email: 'jennifer@hospital.com',
    status: 'off-duty',
  },
  {
    id: '4',
    name: 'David Wilson',
    role: 'Pharmacist',
    department: 'Pharmacy',
    shift: '9:00 AM - 5:00 PM',
    phone: '+1234567903',
    email: 'david@hospital.com',
    status: 'on-duty',
  },
  {
    id: '5',
    name: 'Maria Garcia',
    role: 'Nurse',
    department: 'Pediatrics',
    shift: '11:00 PM - 7:00 AM',
    phone: '+1234567904',
    email: 'maria@hospital.com',
    status: 'off-duty',
  },
  {
    id: '6',
    name: 'James Taylor',
    role: 'Radiologist',
    department: 'Radiology',
    shift: '8:00 AM - 4:00 PM',
    phone: '+1234567905',
    email: 'james@hospital.com',
    status: 'on-leave',
  },
];

const statusColors = {
  'on-duty': 'bg-success/10 text-success border-success/20',
  'off-duty': 'bg-muted text-muted-foreground border-muted',
  'on-leave': 'bg-warning/10 text-warning border-warning/20',
};

const Staff: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredStaff = mockStaff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header title="Staff Management" subtitle="Manage hospital staff and assignments" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
          </Button>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff, index) => (
            <Card
              key={staff.id}
              className="p-6 hover:shadow-lg transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <UserCog className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{staff.name}</h3>
                    <p className="text-sm text-primary font-medium">{staff.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">Department: {staff.department}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{staff.shift}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{staff.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{staff.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Badge className={statusColors[staff.status as keyof typeof statusColors]}>
                  {staff.status.replace('-', ' ')}
                </Badge>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <AddStaffDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

export default Staff;
