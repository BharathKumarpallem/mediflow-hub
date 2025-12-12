import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { mockMedicines } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Pill, Package, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import AddMedicineDialog from '@/components/dialogs/AddMedicineDialog';

const Pharmacy: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredMedicines = mockMedicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = mockMedicines.filter((m) => m.stock <= m.minStockThreshold).length;

  return (
    <div className="min-h-screen">
      <Header title="Pharmacy" subtitle="Manage medicine inventory and stock" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-md border border-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Pill className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Medicines</p>
              <p className="text-2xl font-display font-bold">{mockMedicines.length}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-md border border-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Stock Value</p>
              <p className="text-2xl font-display font-bold">
                ${mockMedicines.reduce((sum, m) => sum + m.stock * m.unitPrice, 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-md border border-border flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              <p className="text-2xl font-display font-bold">{lowStockCount}</p>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Medicine
          </Button>
        </div>

        {/* Medicines Table */}
        <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Medicine</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedicines.map((medicine, index) => {
                const stockPercentage = (medicine.stock / (medicine.minStockThreshold * 5)) * 100;
                const isLowStock = medicine.stock <= medicine.minStockThreshold;

                return (
                  <TableRow
                    key={medicine.id}
                    className="hover:bg-muted/30 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Pill className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{medicine.name}</p>
                          <p className="text-sm text-muted-foreground">{medicine.brand}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{medicine.sku}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">${medicine.unitPrice.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 min-w-[150px]">
                        <div className="flex justify-between text-sm">
                          <span>{medicine.stock} units</span>
                          <span className="text-muted-foreground">
                            Min: {medicine.minStockThreshold}
                          </span>
                        </div>
                        <Progress
                          value={Math.min(stockPercentage, 100)}
                          className={cn(
                            'h-2',
                            isLowStock ? '[&>div]:bg-warning' : '[&>div]:bg-success'
                          )}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          isLowStock
                            ? 'bg-warning/10 text-warning border-warning/20'
                            : 'bg-success/10 text-success border-success/20'
                        )}
                      >
                        {isLowStock ? 'Low Stock' : 'In Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddMedicineDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

export default Pharmacy;
