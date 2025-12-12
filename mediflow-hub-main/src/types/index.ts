export type UserRole = 'admin' | 'doctor' | 'receptionist' | 'pharmacy' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  createdAt: string;
  assignedDoctor?: Doctor;
}

export interface Doctor {
  id: string;
  userId: string;
  user: User;
  specialization: string;
  qualification: string;
  consultationFee: number;
  bio?: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patient: Patient;
  doctor: Doctor;
  appointmentTime: string;
  durationMinutes: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  reason?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  visitDate: string;
  diagnosis: string;
  notes?: string;
  vitals?: {
    bp?: string;
    temp?: number;
    pulse?: number;
    weight?: number;
  };
}

export interface Medicine {
  id: string;
  name: string;
  brand?: string;
  sku?: string;
  description?: string;
  unitPrice: number;
  stock: number;
  minStockThreshold: number;
}

export interface Bill {
  id: string;
  patientId: string;
  patient: Patient;
  billDate: string;
  totalAmount: number;
  paidAmount: number;
  status: 'unpaid' | 'partial' | 'paid';
  items: BillItem[];
}

export interface BillItem {
  id: string;
  description: string;
  medicineId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Room {
  id: string;
  roomNumber: string;
  type: 'ICU' | 'General' | 'Private' | 'Emergency';
  floor: string;
  pricePerDay: number;
  beds: Bed[];
}

export interface Bed {
  id: string;
  roomId: string;
  bedLabel: string;
  isAvailable: boolean;
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  todayAppointments: number;
  monthlyRevenue: number;
  pendingBills: number;
  availableBeds: number;
}
