import React from 'react';
import Header from '@/components/layout/Header';
import StatsCard from '@/components/dashboard/StatsCard';
import AppointmentList from '@/components/dashboard/AppointmentList';
import RevenueChart from '@/components/dashboard/RevenueChart';
import DepartmentChart from '@/components/dashboard/DepartmentChart';
import { mockDashboardStats, mockAppointments } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Users, Stethoscope, Calendar, DollarSign, FileWarning, BedDouble } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const stats = mockDashboardStats;
  const todayAppointments = mockAppointments.filter(
    (a) => a.appointmentTime.startsWith('2024-12-12')
  );

  const statsCards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients.toLocaleString(),
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: Users,
      iconColor: 'bg-primary/10 text-primary',
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      change: '3 on leave today',
      changeType: 'neutral' as const,
      icon: Stethoscope,
      iconColor: 'bg-accent/10 text-accent',
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      change: '+5 from yesterday',
      changeType: 'positive' as const,
      icon: Calendar,
      iconColor: 'bg-warning/10 text-warning',
    },
    {
      title: 'Monthly Revenue',
      value: `$${(stats.monthlyRevenue / 1000).toFixed(0)}k`,
      change: '+8.2% from last month',
      changeType: 'positive' as const,
      icon: DollarSign,
      iconColor: 'bg-success/10 text-success',
    },
    {
      title: 'Pending Bills',
      value: stats.pendingBills,
      change: '5 overdue',
      changeType: 'negative' as const,
      icon: FileWarning,
      iconColor: 'bg-destructive/10 text-destructive',
    },
    {
      title: 'Available Beds',
      value: stats.availableBeds,
      change: 'Out of 120 total',
      changeType: 'neutral' as const,
      icon: BedDouble,
      iconColor: 'bg-info/10 text-info',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title={`Good morning, ${user?.name?.split(' ')[0] || 'User'}!`}
        subtitle="Here's what's happening at your hospital today."
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((card, index) => (
            <StatsCard
              key={card.title}
              {...card}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <DepartmentChart />
        </div>

        {/* Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AppointmentList appointments={todayAppointments} />
          <AppointmentList
            appointments={mockAppointments.filter((a) => a.status === 'pending')}
            title="Pending Approvals"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
