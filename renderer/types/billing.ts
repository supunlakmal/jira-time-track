export interface BillingSettings {
  globalHourlyRate?: number;
  projectRates: Record<string, number>; // project name -> hourly rate
  currency: string;
  taxRate?: number;
  companyName?: string;
  companyAddress?: string;
  invoicePrefix: string;
}

export interface CostCalculation {
  timeSpent: number; // milliseconds
  hourlyRate: number;
  totalCost: number;
  currency: string;
}

export interface TicketCost extends CostCalculation {
  ticketNumber: string;
  ticketName: string;
  projectName?: string;
}

export interface ProjectCost {
  projectName: string;
  totalTimeSpent: number; // milliseconds
  totalCost: number;
  averageHourlyRate: number;
  ticketCount: number;
  currency: string;
}

export interface InvoiceItem {
  ticketNumber: string;
  ticketName: string;
  timeSpent: number; // milliseconds
  timeSpentFormatted: string; // "2h 30m"
  hourlyRate: number;
  cost: number;
  date: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectName?: string;
  clientName?: string;
  dateRange: { 
    start: Date; 
    end: Date; 
  };
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  totalCost: number;
  totalHours: number;
  currency: string;
  generatedAt: Date;
  companyInfo?: {
    name: string;
    address: string;
  };
}

export interface BillingData {
  settings: BillingSettings;
  invoices: Invoice[];
}

export interface BillingStats {
  totalRevenue: number;
  totalHours: number;
  averageHourlyRate: number;
  totalInvoices: number;
  thisMonthRevenue: number;
  thisMonthHours: number;
  topProject: {
    name: string;
    revenue: number;
  } | null;
  currency: string;
}

export type BillingTab = 'settings' | 'overview' | 'invoices';

export interface RateFormData {
  globalHourlyRate: string;
  currency: string;
  taxRate: string;
  companyName: string;
  companyAddress: string;
  invoicePrefix: string;
}

export interface ProjectRateFormData {
  projectName: string;
  hourlyRate: string;
}

export interface InvoiceFormData {
  projectName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  includeOngoing: boolean;
}