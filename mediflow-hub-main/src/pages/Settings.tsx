import React from 'react';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { User, Bell, Shield, Palette, Globe, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header title="Settings" subtitle="Manage your account and system preferences" />

      <div className="p-6 max-w-4xl space-y-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Profile Settings</h3>
              <p className="text-sm text-muted-foreground">Update your personal information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user?.name} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user?.email} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue={user?.phone} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={user?.role} className="mt-2 capitalize" disabled />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button>Save Changes</Button>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Email Notifications', description: 'Receive updates via email' },
              { label: 'Push Notifications', description: 'Get browser notifications' },
              { label: 'Appointment Reminders', description: 'Reminders for upcoming appointments' },
              { label: 'Bill Alerts', description: 'Notifications for pending bills' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Switch defaultChecked={index < 3} />
              </div>
            ))}
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Security</h3>
              <p className="text-sm text-muted-foreground">Manage your account security</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" className="mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" className="mt-2" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="destructive">Update Password</Button>
          </div>
        </Card>

        {/* System Settings (Admin Only) */}
        {user?.role === 'admin' && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold">System Settings</h3>
                <p className="text-sm text-muted-foreground">Admin-only system configuration</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Maintenance Mode', description: 'Enable to perform system updates' },
                { label: 'Auto Backup', description: 'Daily automatic database backup' },
                { label: 'Debug Mode', description: 'Enable detailed error logging' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={index === 1} />
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;
