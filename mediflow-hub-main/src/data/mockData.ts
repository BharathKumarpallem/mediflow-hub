import { Patient, Doctor, Appointment, Medicine, Bill, Room, DashboardStats, User } from '@/types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    userId: '2',
    user: { id: '2', name: 'Dr. Sarah Johnson', email: 'sarah@hospital.com', role: 'doctor', phone: '+1234567891' },
    specialization: 'Cardiology',
    qualification: 'MBBS, MD, DM',
    consultationFee: 500,
    bio: 'Expert in cardiovascular diseases with 15 years of experience.',
    available: true,
  },
  {
    id: '2',
    userId: '6',
    user: { id: '6', name: 'Dr. Michael Chen', email: 'michael@hospital.com', role: 'doctor', phone: '+1234567896' },
    specialization: 'Neurology',
    qualification: 'MBBS, MD',
    consultationFee: 600,
    bio: 'Specialized in neurological disorders and brain surgery.',
    available: true,
  },
  {
    id: '3',
    userId: '7',
    user: { id: '7', name: 'Dr. Emily Brown', email: 'emily@hospital.com', role: 'doctor', phone: '+1234567897' },
    specialization: 'Pediatrics',
    qualification: 'MBBS, DCH',
    consultationFee: 400,
    bio: 'Dedicated to child healthcare and development.',
    available: false,
  },
  {
    id: '4',
    userId: '8',
    user: { id: '8', name: 'Dr. James Wilson', email: 'james@hospital.com', role: 'doctor', phone: '+1234567898' },
    specialization: 'Orthopedics',
    qualification: 'MBBS, MS Ortho',
    consultationFee: 550,
    bio: 'Expert in bone and joint surgeries.',
    available: true,
  },
];

export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    dob: '1988-05-14',
    gender: 'male',
    phone: '+1234567800',
    email: 'john.doe@email.com',
    address: '123 Main Street, New York, NY 10001',
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+1234567801',
    createdAt: '2024-01-15',
    assignedDoctor: mockDoctors[0],
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Miller',
    dob: '1992-08-22',
    gender: 'female',
    phone: '+1234567802',
    email: 'sarah.miller@email.com',
    address: '456 Oak Avenue, Los Angeles, CA 90001',
    createdAt: '2024-02-10',
    assignedDoctor: mockDoctors[1],
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Garcia',
    dob: '1975-03-30',
    gender: 'male',
    phone: '+1234567803',
    email: 'michael.garcia@email.com',
    address: '789 Pine Road, Chicago, IL 60601',
    emergencyContactName: 'Maria Garcia',
    emergencyContactPhone: '+1234567804',
    createdAt: '2024-02-28',
    assignedDoctor: mockDoctors[0],
  },
  {
    id: '4',
    firstName: 'Emma',
    lastName: 'Thompson',
    dob: '2015-11-05',
    gender: 'female',
    phone: '+1234567805',
    email: 'thompson.family@email.com',
    address: '321 Elm Street, Houston, TX 77001',
    emergencyContactName: 'Robert Thompson',
    emergencyContactPhone: '+1234567806',
    createdAt: '2024-03-05',
    assignedDoctor: mockDoctors[2],
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Lee',
    dob: '1965-07-18',
    gender: 'male',
    phone: '+1234567807',
    email: 'david.lee@email.com',
    address: '654 Maple Drive, Phoenix, AZ 85001',
    createdAt: '2024-03-12',
    assignedDoctor: mockDoctors[3],
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patient: mockPatients[0],
    doctor: mockDoctors[0],
    appointmentTime: '2024-12-12T09:00:00',
    durationMinutes: 30,
    status: 'confirmed',
    reason: 'Regular checkup',
  },
  {
    id: '2',
    patient: mockPatients[1],
    doctor: mockDoctors[1],
    appointmentTime: '2024-12-12T10:30:00',
    durationMinutes: 45,
    status: 'pending',
    reason: 'Headache and dizziness',
  },
  {
    id: '3',
    patient: mockPatients[2],
    doctor: mockDoctors[0],
    appointmentTime: '2024-12-12T14:00:00',
    durationMinutes: 30,
    status: 'confirmed',
    reason: 'Follow-up consultation',
  },
  {
    id: '4',
    patient: mockPatients[3],
    doctor: mockDoctors[2],
    appointmentTime: '2024-12-12T11:00:00',
    durationMinutes: 30,
    status: 'completed',
    reason: 'Vaccination',
  },
  {
    id: '5',
    patient: mockPatients[4],
    doctor: mockDoctors[3],
    appointmentTime: '2024-12-13T09:30:00',
    durationMinutes: 60,
    status: 'pending',
    reason: 'Knee pain evaluation',
  },
];

export const mockMedicines: Medicine[] = [
  { id: '1', name: 'Paracetamol', brand: 'Tylenol', sku: 'MED001', unitPrice: 5, stock: 500, minStockThreshold: 100 },
  { id: '2', name: 'Amoxicillin', brand: 'Amoxil', sku: 'MED002', unitPrice: 15, stock: 200, minStockThreshold: 50 },
  { id: '3', name: 'Ibuprofen', brand: 'Advil', sku: 'MED003', unitPrice: 8, stock: 350, minStockThreshold: 75 },
  { id: '4', name: 'Omeprazole', brand: 'Prilosec', sku: 'MED004', unitPrice: 12, stock: 180, minStockThreshold: 40 },
  { id: '5', name: 'Metformin', brand: 'Glucophage', sku: 'MED005', unitPrice: 10, stock: 250, minStockThreshold: 60 },
];

export const mockRooms: Room[] = [
  {
    id: '1',
    roomNumber: '101',
    type: 'General',
    floor: '1st Floor',
    pricePerDay: 150,
    beds: [
      { id: 'b1', roomId: '1', bedLabel: 'A', isAvailable: true },
      { id: 'b2', roomId: '1', bedLabel: 'B', isAvailable: false },
      { id: 'b3', roomId: '1', bedLabel: 'C', isAvailable: true },
    ],
  },
  {
    id: '2',
    roomNumber: '201',
    type: 'Private',
    floor: '2nd Floor',
    pricePerDay: 350,
    beds: [
      { id: 'b4', roomId: '2', bedLabel: 'A', isAvailable: true },
    ],
  },
  {
    id: '3',
    roomNumber: 'ICU-01',
    type: 'ICU',
    floor: '3rd Floor',
    pricePerDay: 800,
    beds: [
      { id: 'b5', roomId: '3', bedLabel: 'A', isAvailable: false },
      { id: 'b6', roomId: '3', bedLabel: 'B', isAvailable: true },
    ],
  },
  {
    id: '4',
    roomNumber: 'ER-01',
    type: 'Emergency',
    floor: 'Ground Floor',
    pricePerDay: 500,
    beds: [
      { id: 'b7', roomId: '4', bedLabel: 'A', isAvailable: true },
      { id: 'b8', roomId: '4', bedLabel: 'B', isAvailable: true },
    ],
  },
];

export const mockBills: Bill[] = [
  {
    id: '1',
    patientId: '1',
    patient: mockPatients[0],
    billDate: '2024-12-10',
    totalAmount: 1250,
    paidAmount: 1250,
    status: 'paid',
    items: [
      { id: 'bi1', description: 'Consultation Fee', quantity: 1, unitPrice: 500, totalPrice: 500 },
      { id: 'bi2', description: 'Blood Test', quantity: 1, unitPrice: 200, totalPrice: 200 },
      { id: 'bi3', description: 'Medicines', quantity: 1, unitPrice: 550, totalPrice: 550 },
    ],
  },
  {
    id: '2',
    patientId: '2',
    patient: mockPatients[1],
    billDate: '2024-12-11',
    totalAmount: 850,
    paidAmount: 0,
    status: 'unpaid',
    items: [
      { id: 'bi4', description: 'Consultation Fee', quantity: 1, unitPrice: 600, totalPrice: 600 },
      { id: 'bi5', description: 'MRI Scan', quantity: 1, unitPrice: 250, totalPrice: 250 },
    ],
  },
];

export const mockDashboardStats: DashboardStats = {
  totalPatients: 1247,
  totalDoctors: 48,
  todayAppointments: 32,
  monthlyRevenue: 485000,
  pendingBills: 23,
  availableBeds: 45,
};

export const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 45000 },
  { month: 'Apr', revenue: 52000 },
  { month: 'May', revenue: 48000 },
  { month: 'Jun', revenue: 55000 },
  { month: 'Jul', revenue: 51000 },
  { month: 'Aug', revenue: 49000 },
  { month: 'Sep', revenue: 58000 },
  { month: 'Oct', revenue: 62000 },
  { month: 'Nov', revenue: 56000 },
  { month: 'Dec', revenue: 48500 },
];

export const departmentData = [
  { name: 'Cardiology', patients: 320, color: '#0ea5e9' },
  { name: 'Neurology', patients: 280, color: '#14b8a6' },
  { name: 'Pediatrics', patients: 245, color: '#f59e0b' },
  { name: 'Orthopedics', patients: 198, color: '#8b5cf6' },
  { name: 'General', patients: 204, color: '#ec4899' },
];

export const appointmentTrendData = [
  { day: 'Mon', appointments: 28 },
  { day: 'Tue', appointments: 32 },
  { day: 'Wed', appointments: 25 },
  { day: 'Thu', appointments: 38 },
  { day: 'Fri', appointments: 30 },
  { day: 'Sat', appointments: 18 },
  { day: 'Sun', appointments: 12 },
];
