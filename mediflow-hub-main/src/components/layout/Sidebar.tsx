import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  FileText,
  Pill,
  BedDouble,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Stethoscope,
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
      )
    }
  >
    {icon}
    {children}
  </NavLink>
);

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const adminLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/patients', icon: <Users size={20} />, label: 'Patients' },
    { to: '/doctors', icon: <Stethoscope size={20} />, label: 'Doctors' },
    { to: '/appointments', icon: <Calendar size={20} />, label: 'Appointments' },
    { to: '/billing', icon: <CreditCard size={20} />, label: 'Billing' },
    { to: '/pharmacy', icon: <Pill size={20} />, label: 'Pharmacy' },
    { to: '/rooms', icon: <BedDouble size={20} />, label: 'Rooms & Beds' },
    { to: '/staff', icon: <UserCog size={20} />, label: 'Staff' },
    { to: '/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
  ];

  const doctorLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/patients', icon: <Users size={20} />, label: 'My Patients' },
    { to: '/appointments', icon: <Calendar size={20} />, label: 'Appointments' },
    { to: '/records', icon: <FileText size={20} />, label: 'Medical Records' },
  ];

  const receptionLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/patients', icon: <Users size={20} />, label: 'Patients' },
    { to: '/appointments', icon: <Calendar size={20} />, label: 'Appointments' },
    { to: '/billing', icon: <CreditCard size={20} />, label: 'Billing' },
  ];

  const links = user?.role === 'admin' ? adminLinks : user?.role === 'doctor' ? doctorLinks : receptionLinks;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-glow bg-white/5">
          <img src="/logo.svg" alt="MediCare" className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-lg font-display font-bold text-sidebar-foreground">MediCare</h1>
          <p className="text-xs text-sidebar-foreground/60">Hospital Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <SidebarLink key={link.to} to={link.to} icon={link.icon}>
            {link.label}
          </SidebarLink>
        ))}
      </nav>

      {/* User & Settings */}
      <div className="px-4 py-4 border-t border-sidebar-border space-y-2">
        <SidebarLink to="/settings" icon={<Settings size={20} />}>
          Settings
        </SidebarLink>
        
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent">
          <div className="w-9 h-9 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-sidebar-primary">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
