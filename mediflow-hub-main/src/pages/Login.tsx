import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Activity, User, Stethoscope, ClipboardList, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
const roleOptions: {
  role: UserRole;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [{
  role: 'admin',
  label: 'Admin',
  icon: <User className="w-5 h-5 bg-accent-foreground" />,
  description: 'Full system access'
}, {
  role: 'doctor',
  label: 'Doctor',
  icon: <Stethoscope className="w-5 h-5 bg-destructive" />,
  description: 'Patient care & records'
}, {
  role: 'receptionist',
  label: 'Reception',
  icon: <ClipboardList className="w-5 h-5 bg-lime-500" />,
  description: 'Appointments & billing'
}];
const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    login
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        toast({
          title: 'Welcome back!',
          description: 'Successfully logged in.'
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Please check your credentials.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-background flex">
      {/* Left side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-sidebar-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-display font-bold text-cyan-200 text-4xl">MediCare</h1>
              <p className="text-lg text-cyan-300">Hospital Management System</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4 font-serif text-center text-sidebar-ring bg-inherit">
            Streamline Your
            <br />
            <span className="text-primary">Healthcare Operations</span>
          </h2>
          <p className="max-w-md text-xl font-serif text-center text-emerald-400">
            Comprehensive hospital management solution for modern healthcare facilities.
            Manage patients, appointments, billing, and more from a single platform.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-4 text-cyan-900">
            {[{
            label: 'Active Patients',
            value: '2,847'
          }, {
            label: 'Doctors',
            value: '48'
          }, {
            label: 'Appointments Today',
            value: '156'
          }, {
            label: 'Satisfaction Rate',
            value: '98%'
          }].map((stat, i) => <div key={i} className="bg-sidebar-accent/50 rounded-xl p-4">
                <p className="text-2xl font-display font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-sidebar-foreground/70">{stat.label}</p>
              </div>)}
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-cyan-600">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">MediCare</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-foreground mb-3 block">Select your role</Label>
            <div className="grid grid-cols-3 gap-3">
              {roleOptions.map(option => <button key={option.role} type="button" onClick={() => setSelectedRole(option.role)} className={cn('flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200', selectedRole === option.role ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground')}>
                  {option.icon}
                  <span className="font-medium text-slate-950 font-serif text-base bg-inherit">{option.label}</span>
                </button>)}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@hospital.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-2" required />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Demo credentials: Use any email and password
          </p>
        </div>
      </div>
    </div>;
};
export default Login;