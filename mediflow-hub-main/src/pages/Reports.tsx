import React from 'react';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { revenueData, departmentData, appointmentTrendData } from '@/data/mockData';
import { Download, Calendar, TrendingUp, Users, Activity } from 'lucide-react';

const patientData = [
  { month: 'Jan', new: 120, returning: 85 },
  { month: 'Feb', new: 98, returning: 92 },
  { month: 'Mar', new: 145, returning: 78 },
  { month: 'Apr', new: 132, returning: 95 },
  { month: 'May', new: 156, returning: 88 },
  { month: 'Jun', new: 178, returning: 102 },
];

const Reports: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header title="Reports & Analytics" subtitle="View hospital performance metrics" />

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Monthly Revenue', value: '$485,000', change: '+12%', icon: TrendingUp, color: 'text-success' },
            { label: 'Total Patients', value: '1,247', change: '+8%', icon: Users, color: 'text-primary' },
            { label: 'Avg. Daily Visits', value: '42', change: '+5%', icon: Activity, color: 'text-accent' },
            { label: 'Satisfaction Rate', value: '94%', change: '+2%', icon: TrendingUp, color: 'text-warning' },
          ].map((stat, index) => (
            <Card key={index} className="p-4 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className={`text-sm font-medium ${stat.color}`}>{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-50`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Revenue Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(199, 89%, 48%)" fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Department Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Patients by Department</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="patients"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Appointment Trends */}
          <Card className="p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Weekly Appointments</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="day" tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="hsl(172, 66%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Patient Registration Trends */}
          <Card className="p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Patient Registration</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(215, 16%, 47%)', fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="new" stroke="hsl(199, 89%, 48%)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="returning" stroke="hsl(172, 66%, 50%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">New Patients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Returning Patients</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
