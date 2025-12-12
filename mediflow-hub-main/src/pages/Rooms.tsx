import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockRooms } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, BedDouble, DollarSign, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import AddRoomDialog from '@/components/dialogs/AddRoomDialog';

const typeColors = {
  ICU: 'bg-destructive/10 text-destructive border-destructive/20',
  General: 'bg-primary/10 text-primary border-primary/20',
  Private: 'bg-accent/10 text-accent border-accent/20',
  Emergency: 'bg-warning/10 text-warning border-warning/20',
};

const Rooms: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const totalBeds = mockRooms.reduce((sum, r) => sum + r.beds.length, 0);
  const availableBeds = mockRooms.reduce(
    (sum, r) => sum + r.beds.filter((b) => b.isAvailable).length,
    0
  );

  return (
    <div className="min-h-screen">
      <Header title="Rooms & Beds" subtitle="Manage room allocations and bed availability" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
                <p className="text-2xl font-display font-bold">{mockRooms.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Beds</p>
                <p className="text-2xl font-display font-bold">{totalBeds}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <BedDouble className="w-5 h-5 text-accent" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Beds</p>
                <p className="text-2xl font-display font-bold text-success">{availableBeds}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <BedDouble className="w-5 h-5 text-success" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupied Beds</p>
                <p className="text-2xl font-display font-bold text-destructive">
                  {totalBeds - availableBeds}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <BedDouble className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Add Room Button */}
        <div className="flex justify-end">
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </Button>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRooms.map((room, index) => {
            const roomAvailableBeds = room.beds.filter((b) => b.isAvailable).length;
            return (
              <Card
                key={room.id}
                className="p-6 hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground">
                      Room {room.roomNumber}
                    </h3>
                    <p className="text-sm text-muted-foreground">{room.floor}</p>
                  </div>
                  <Badge className={cn(typeColors[room.type])}>{room.type}</Badge>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">${room.pricePerDay}</span>
                  <span className="text-muted-foreground">/ day</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Beds ({roomAvailableBeds}/{room.beds.length} available)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {room.beds.map((bed) => (
                      <div
                        key={bed.id}
                        className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors',
                          bed.isAvailable
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-destructive/10 text-destructive border border-destructive/20'
                        )}
                      >
                        {bed.bedLabel}
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Manage Beds
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      <AddRoomDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

export default Rooms;
