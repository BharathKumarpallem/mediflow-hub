import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockBills, mockPatients } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plus,
  Search,
  FileText,
  DollarSign,
  Download,
  Eye,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AddBillDialog from '@/components/dialogs/AddBillDialog';

const statusColors = {
  paid: 'bg-success/10 text-success border-success/20',
  partial: 'bg-warning/10 text-warning border-warning/20',
  unpaid: 'bg-destructive/10 text-destructive border-destructive/20',
};

const Billing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredBills = mockBills.filter(
    (b) =>
      b.patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.patient.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = mockBills.reduce((sum, b) => sum + b.paidAmount, 0);
  const totalPending = mockBills.reduce((sum, b) => sum + (b.totalAmount - b.paidAmount), 0);
  const paidBills = mockBills.filter((b) => b.status === 'paid').length;

  return (
    <div className="min-h-screen">
      <Header title="Billing" subtitle="Manage patient bills and payments" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  ${totalPending.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid Bills</p>
                <p className="text-2xl font-display font-bold text-foreground">{paidBills}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bills</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  {mockBills.length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search bills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Bill
          </Button>
        </div>

        {/* Bills Table */}
        <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Bill ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill, index) => (
                <TableRow
                  key={bill.id}
                  className="hover:bg-muted/30 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <span className="font-mono text-sm">#{bill.id}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {bill.patient.firstName} {bill.patient.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{bill.patient.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {new Date(bill.billDate).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">${bill.totalAmount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-success font-medium">
                      ${bill.paidAmount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(statusColors[bill.status])}>{bill.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      {bill.status !== 'paid' && (
                        <Button variant="ghost" size="icon" className="text-success">
                          <DollarSign className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddBillDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

export default Billing;
