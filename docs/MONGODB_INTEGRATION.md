# MongoDB Integration Guide

Complete guide for adding optional MongoDB support to the Jira Time Track application as an alternative to the default electron-store local storage.

## Table of Contents

1. [Overview & Benefits](#overview--benefits)
2. [Prerequisites & Setup](#prerequisites--setup)
3. [Technical Architecture](#technical-architecture)
4. [Database Schema](#database-schema)
5. [Implementation Guide](#implementation-guide)
6. [Configuration Options](#configuration-options)
7. [Migration Process](#migration-process)
8. [Security Considerations](#security-considerations)
9. [Error Handling](#error-handling)
10. [Testing & Validation](#testing--validation)
11. [Deployment Guide](#deployment-guide)
12. [Troubleshooting](#troubleshooting)

---

## Overview & Benefits

### What is this feature?
This feature allows users to optionally connect the Jira Time Track application to a MongoDB database instead of using the default local electron-store storage. This enables:

- **Centralized Data Storage**: Share data across multiple devices and users
- **Team Collaboration**: Multiple team members can track time on shared projects
- **Data Backup & Recovery**: Automatic cloud backup and disaster recovery
- **Scalability**: Handle larger datasets and more complex queries
- **Integration**: Connect with existing business intelligence and reporting tools

### Benefits Over Local Storage
- ✅ **Multi-device sync**: Access your data from any device
- ✅ **Team sharing**: Collaborate on projects with team members
- ✅ **Automatic backups**: Never lose your time tracking data
- ✅ **Advanced queries**: Generate complex reports and analytics
- ✅ **Data integrity**: ACID compliance and data consistency
- ✅ **Scalability**: Handle unlimited projects and time entries

### Backward Compatibility
The MongoDB integration is **completely optional**. The application will continue to work with local electron-store by default, ensuring no breaking changes for existing users.

---

## Prerequisites & Setup

### System Requirements
- **Node.js**: Version 16.0 or higher
- **MongoDB**: Version 4.4 or higher (local or cloud instance)
- **Network**: Stable internet connection for cloud MongoDB
- **Memory**: Additional 50MB RAM for MongoDB driver

### MongoDB Setup Options

#### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Configure network access (allow your IP or 0.0.0.0/0 for development)
4. Create database user with read/write permissions
5. Get connection string from Atlas dashboard

#### Option 2: Local MongoDB Installation
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Windows (using Chocolatey)
choco install mongodb

# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB service
sudo systemctl start mongod
```

#### Option 3: Docker MongoDB
```bash
# Pull and run MongoDB container
docker run -d \
  --name jira-time-track-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest
```

### Dependencies Installation
```bash
# Install MongoDB driver and related packages
npm install mongodb mongoose dotenv
npm install --save-dev @types/mongodb
```

---

## Technical Architecture

### Database Abstraction Layer

The implementation uses a **Database Abstraction Layer** pattern to support both local storage and MongoDB without changing the application logic.

```
┌─────────────────────────────────────┐
│           Application Layer          │
│     (Components, Pages, Hooks)      │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         Data Access Layer           │
│        (IPC Handlers & APIs)        │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│      Database Abstraction Layer     │
│         (StorageManager)            │
└─────────┬───────────────────┬───────┘
          │                   │
┌─────────▼─────────┐ ┌───────▼────────┐
│  LocalStorage     │ │ MongoDBStorage │
│ (electron-store)  │ │   (mongoose)   │
└───────────────────┘ └────────────────┘
```

### Core Components

#### 1. StorageManager Interface
```typescript
interface IStorageManager {
  // Sessions management
  getSessions(): Promise<Record<string, SessionData>>;
  saveSession(ticketNumber: string, session: SessionData): Promise<void>;
  deleteSession(ticketNumber: string): Promise<void>;
  
  // Projects management
  getProjects(): Promise<ProjectData[]>;
  saveProject(project: ProjectData): Promise<void>;
  deleteProject(projectId: string): Promise<void>;
  
  // Manual tasks management
  getManualTasks(): Promise<ManualTaskData[]>;
  saveManualTask(task: ManualTaskData): Promise<void>;
  deleteManualTask(taskId: string): Promise<void>;
  
  // Billing data management
  getBillingData(): Promise<BillingData>;
  saveBillingData(billing: BillingData): Promise<void>;
  
  // Connection management
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  healthCheck(): Promise<boolean>;
}
```

#### 2. Storage Factory Pattern
```typescript
class StorageFactory {
  static create(type: 'local' | 'mongodb', config?: MongoConfig): IStorageManager {
    switch (type) {
      case 'mongodb':
        return new MongoDBStorageManager(config);
      case 'local':
      default:
        return new LocalStorageManager();
    }
  }
}
```

---

## Database Schema

### MongoDB Collections Structure

#### 1. Sessions Collection
```javascript
// Collection: sessions
{
  _id: ObjectId("..."),
  ticketNumber: "PROJ-123",
  projectName: "Project Alpha",
  description: "Feature development",
  startTime: ISODate("2024-01-15T09:00:00Z"),
  endTime: ISODate("2024-01-15T17:00:00Z"),
  duration: 28800000, // milliseconds
  status: "completed", // "active", "paused", "completed", "stopped"
  tags: ["development", "frontend"],
  userId: "user123", // for multi-user support
  createdAt: ISODate("2024-01-15T09:00:00Z"),
  updatedAt: ISODate("2024-01-15T17:00:00Z")
}
```

#### 2. Projects Collection
```javascript
// Collection: projects
{
  _id: ObjectId("..."),
  projectId: "proj_alpha_001",
  name: "Project Alpha",
  description: "Main development project",
  status: "active", // "active", "completed", "archived"
  color: "#3B82F6",
  hourlyRate: 75.00,
  currency: "USD",
  client: {
    name: "Acme Corporation",
    email: "contact@acme.com",
    address: "123 Business St, City, State"
  },
  estimatedHours: 160,
  actualHours: 45.5,
  budget: 12000.00,
  spentBudget: 3412.50,
  startDate: ISODate("2024-01-01T00:00:00Z"),
  endDate: ISODate("2024-03-31T23:59:59Z"),
  tags: ["web-development", "react"],
  userId: "user123",
  teamMembers: ["user123", "user456"],
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-01-15T10:30:00Z")
}
```

#### 3. Manual Tasks Collection
```javascript
// Collection: manual_tasks
{
  _id: ObjectId("..."),
  taskId: "task_001",
  title: "Code review for PR #145",
  description: "Review pull request for new authentication feature",
  projectId: "proj_alpha_001",
  duration: 3600000, // 1 hour in milliseconds
  date: ISODate("2024-01-15T00:00:00Z"),
  category: "code-review",
  billable: true,
  hourlyRate: 75.00,
  tags: ["review", "authentication"],
  userId: "user123",
  createdAt: ISODate("2024-01-15T14:00:00Z"),
  updatedAt: ISODate("2024-01-15T14:00:00Z")
}
```

#### 4. Billing Data Collection
```javascript
// Collection: billing_settings
{
  _id: ObjectId("..."),
  userId: "user123",
  settings: {
    globalHourlyRate: 75.00,
    projectRates: {
      "proj_alpha_001": 80.00,
      "proj_beta_002": 70.00
    },
    currency: "USD",
    taxRate: 8.5,
    companyName: "Freelance Developer LLC",
    companyAddress: "456 Developer Ave, Tech City, TC 12345",
    companyEmail: "billing@freelancedev.com",
    companyPhone: "+1-555-0123",
    invoicePrefix: "INV",
    invoiceNumberCounter: 1001,
    paymentTerms: "Net 30",
    bankDetails: {
      accountName: "Freelance Developer LLC",
      accountNumber: "****1234",
      routingNumber: "****5678",
      bankName: "Tech Credit Union"
    }
  },
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-01-15T10:30:00Z")
}
```

#### 5. Invoices Collection
```javascript
// Collection: invoices
{
  _id: ObjectId("..."),
  invoiceId: "INV-1001",
  invoiceNumber: "INV-1001",
  clientId: "client_acme_001",
  projectId: "proj_alpha_001",
  status: "sent", // "draft", "sent", "paid", "overdue", "cancelled"
  issueDate: ISODate("2024-01-15T00:00:00Z"),
  dueDate: ISODate("2024-02-14T00:00:00Z"),
  paidDate: null,
  items: [
    {
      description: "Frontend Development - Week 1",
      quantity: 40,
      rate: 75.00,
      amount: 3000.00
    },
    {
      description: "Code Review Sessions",
      quantity: 5,
      rate: 75.00,
      amount: 375.00
    }
  ],
  subtotal: 3375.00,
  taxRate: 8.5,
  taxAmount: 286.88,
  total: 3661.88,
  currency: "USD",
  notes: "Thank you for your business!",
  userId: "user123",
  createdAt: ISODate("2024-01-15T00:00:00Z"),
  updatedAt: ISODate("2024-01-15T00:00:00Z")
}
```

### Database Indexes

```javascript
// Optimize queries with indexes
db.sessions.createIndex({ "ticketNumber": 1 });
db.sessions.createIndex({ "userId": 1, "startTime": -1 });
db.sessions.createIndex({ "status": 1, "userId": 1 });

db.projects.createIndex({ "projectId": 1 }, { unique: true });
db.projects.createIndex({ "userId": 1, "status": 1 });
db.projects.createIndex({ "teamMembers": 1 });

db.manual_tasks.createIndex({ "userId": 1, "date": -1 });
db.manual_tasks.createIndex({ "projectId": 1 });

db.billing_settings.createIndex({ "userId": 1 }, { unique: true });

db.invoices.createIndex({ "invoiceId": 1 }, { unique: true });
db.invoices.createIndex({ "userId": 1, "status": 1 });
db.invoices.createIndex({ "clientId": 1 });
```

---

## Implementation Guide

### Step 1: Install Dependencies

```bash
npm install mongodb mongoose dotenv uuid
npm install --save-dev @types/mongodb @types/mongoose
```

### Step 2: Create Environment Configuration

Create `.env` file in project root:
```env
# MongoDB Configuration
MONGODB_ENABLED=false
MONGODB_URI=mongodb://localhost:27017/jira-time-track
MONGODB_DATABASE=jira_time_track
MONGODB_USER=
MONGODB_PASSWORD=

# MongoDB Atlas Example
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jira-time-track?retryWrites=true&w=majority

# Security
MONGODB_SSL=true
MONGODB_AUTH_SOURCE=admin

# Connection Pool Settings
MONGODB_MAX_POOL_SIZE=10
MONGODB_MIN_POOL_SIZE=2
MONGODB_MAX_IDLE_TIME_MS=30000
MONGODB_SERVER_SELECTION_TIMEOUT_MS=5000
```

### Step 3: Create Storage Interface

```typescript
// main/storage/IStorageManager.ts
export interface SessionData {
  ticketNumber: string;
  projectName: string;
  description: string;
  startTime: number;
  endTime?: number;
  duration: number;
  status: 'active' | 'paused' | 'completed' | 'stopped';
  tags?: string[];
}

export interface ProjectData {
  projectId: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'archived';
  color?: string;
  hourlyRate?: number;
  currency?: string;
  client?: {
    name?: string;
    email?: string;
    address?: string;
  };
  estimatedHours?: number;
  budget?: number;
  startDate?: number;
  endDate?: number;
  tags?: string[];
}

export interface ManualTaskData {
  taskId: string;
  title: string;
  description?: string;
  projectId?: string;
  duration: number;
  date: number;
  category?: string;
  billable?: boolean;
  hourlyRate?: number;
  tags?: string[];
}

export interface BillingData {
  settings: {
    globalHourlyRate?: number;
    projectRates: Record<string, number>;
    currency: string;
    taxRate?: number;
    companyName?: string;
    companyAddress?: string;
    companyEmail?: string;
    companyPhone?: string;
    invoicePrefix: string;
    invoiceNumberCounter?: number;
    paymentTerms?: string;
    bankDetails?: {
      accountName?: string;
      accountNumber?: string;
      routingNumber?: string;
      bankName?: string;
    };
  };
  invoices: InvoiceData[];
}

export interface InvoiceData {
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  projectId?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: number;
  dueDate: number;
  paidDate?: number;
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  subtotal: number;
  taxRate?: number;
  taxAmount?: number;
  total: number;
  currency: string;
  notes?: string;
}

export interface IStorageManager {
  // Connection management
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  healthCheck(): Promise<boolean>;

  // Sessions management
  getSessions(): Promise<Record<string, SessionData>>;
  saveSession(ticketNumber: string, session: SessionData): Promise<void>;
  deleteSession(ticketNumber: string): Promise<void>;
  updateSessionStatus(ticketNumber: string, status: SessionData['status']): Promise<void>;

  // Projects management
  getProjects(): Promise<ProjectData[]>;
  saveProject(project: ProjectData): Promise<void>;
  updateProject(projectId: string, updates: Partial<ProjectData>): Promise<void>;
  deleteProject(projectId: string): Promise<void>;

  // Manual tasks management
  getManualTasks(): Promise<ManualTaskData[]>;
  saveManualTask(task: ManualTaskData): Promise<void>;
  updateManualTask(taskId: string, updates: Partial<ManualTaskData>): Promise<void>;
  deleteManualTask(taskId: string): Promise<void>;

  // Billing data management
  getBillingData(): Promise<BillingData>;
  saveBillingData(billing: BillingData): Promise<void>;
  updateBillingSettings(settings: Partial<BillingData['settings']>): Promise<void>;

  // Invoices management
  saveInvoice(invoice: InvoiceData): Promise<void>;
  updateInvoice(invoiceId: string, updates: Partial<InvoiceData>): Promise<void>;
  deleteInvoice(invoiceId: string): Promise<void>;
  getInvoices(filters?: { status?: string; clientId?: string; projectId?: string }): Promise<InvoiceData[]>;

  // Data export/import
  exportAllData(): Promise<{
    sessions: Record<string, SessionData>;
    projects: ProjectData[];
    manualTasks: ManualTaskData[];
    billing: BillingData;
  }>;
  importAllData(data: any): Promise<void>;

  // Utility methods
  getUserId(): string;
  setUserId(userId: string): void;
}
```

### Step 4: Implement MongoDB Storage Manager

```typescript
// main/storage/MongoDBStorageManager.ts
import { MongoClient, Db, Collection } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { 
  IStorageManager, 
  SessionData, 
  ProjectData, 
  ManualTaskData, 
  BillingData,
  InvoiceData 
} from './IStorageManager';

export interface MongoConfig {
  uri: string;
  database: string;
  options?: {
    maxPoolSize?: number;
    minPoolSize?: number;
    maxIdleTimeMS?: number;
    serverSelectionTimeoutMS?: number;
    ssl?: boolean;
    authSource?: string;
  };
}

export class MongoDBStorageManager implements IStorageManager {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private config: MongoConfig;
  private userId: string;

  constructor(config: MongoConfig, userId?: string) {
    this.config = config;
    this.userId = userId || uuidv4();
  }

  async connect(): Promise<void> {
    try {
      this.client = new MongoClient(this.config.uri, {
        maxPoolSize: this.config.options?.maxPoolSize || 10,
        minPoolSize: this.config.options?.minPoolSize || 2,
        maxIdleTimeMS: this.config.options?.maxIdleTimeMS || 30000,
        serverSelectionTimeoutMS: this.config.options?.serverSelectionTimeoutMS || 5000,
        ssl: this.config.options?.ssl || true,
        authSource: this.config.options?.authSource || 'admin',
      });

      await this.client.connect();
      this.db = this.client.db(this.config.database);

      // Create indexes
      await this.createIndexes();

      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw new Error(`MongoDB connection failed: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('Disconnected from MongoDB');
    }
  }

  isConnected(): boolean {
    return this.client !== null && this.db !== null;
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.db) return false;
      await this.db.admin().ping();
      return true;
    } catch (error) {
      console.error('MongoDB health check failed:', error);
      return false;
    }
  }

  private async createIndexes(): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    // Sessions indexes
    const sessionsCollection = this.db.collection('sessions');
    await sessionsCollection.createIndex({ ticketNumber: 1 });
    await sessionsCollection.createIndex({ userId: 1, startTime: -1 });
    await sessionsCollection.createIndex({ status: 1, userId: 1 });

    // Projects indexes
    const projectsCollection = this.db.collection('projects');
    await projectsCollection.createIndex({ projectId: 1 }, { unique: true });
    await projectsCollection.createIndex({ userId: 1, status: 1 });

    // Manual tasks indexes
    const tasksCollection = this.db.collection('manual_tasks');
    await tasksCollection.createIndex({ userId: 1, date: -1 });
    await tasksCollection.createIndex({ projectId: 1 });

    // Billing settings indexes
    const billingCollection = this.db.collection('billing_settings');
    await billingCollection.createIndex({ userId: 1 }, { unique: true });

    // Invoices indexes
    const invoicesCollection = this.db.collection('invoices');
    await invoicesCollection.createIndex({ invoiceId: 1 }, { unique: true });
    await invoicesCollection.createIndex({ userId: 1, status: 1 });
  }

  // Sessions Management
  async getSessions(): Promise<Record<string, SessionData>> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('sessions');
    const sessions = await collection.find({ userId: this.userId }).toArray();

    const result: Record<string, SessionData> = {};
    sessions.forEach(session => {
      const { _id, userId, createdAt, updatedAt, ...sessionData } = session;
      result[session.ticketNumber] = sessionData as SessionData;
    });

    return result;
  }

  async saveSession(ticketNumber: string, session: SessionData): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('sessions');
    const now = new Date();

    await collection.updateOne(
      { ticketNumber, userId: this.userId },
      {
        $set: {
          ...session,
          userId: this.userId,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );
  }

  async deleteSession(ticketNumber: string): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('sessions');
    await collection.deleteOne({ ticketNumber, userId: this.userId });
  }

  async updateSessionStatus(ticketNumber: string, status: SessionData['status']): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('sessions');
    await collection.updateOne(
      { ticketNumber, userId: this.userId },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );
  }

  // Projects Management
  async getProjects(): Promise<ProjectData[]> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('projects');
    const projects = await collection
      .find({ userId: this.userId })
      .sort({ updatedAt: -1 })
      .toArray();

    return projects.map(project => {
      const { _id, userId, createdAt, updatedAt, ...projectData } = project;
      return projectData as ProjectData;
    });
  }

  async saveProject(project: ProjectData): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('projects');
    const now = new Date();

    await collection.updateOne(
      { projectId: project.projectId, userId: this.userId },
      {
        $set: {
          ...project,
          userId: this.userId,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );
  }

  async updateProject(projectId: string, updates: Partial<ProjectData>): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('projects');
    await collection.updateOne(
      { projectId, userId: this.userId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );
  }

  async deleteProject(projectId: string): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('projects');
    await collection.deleteOne({ projectId, userId: this.userId });
  }

  // Manual Tasks Management
  async getManualTasks(): Promise<ManualTaskData[]> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('manual_tasks');
    const tasks = await collection
      .find({ userId: this.userId })
      .sort({ date: -1 })
      .toArray();

    return tasks.map(task => {
      const { _id, userId, createdAt, updatedAt, ...taskData } = task;
      return taskData as ManualTaskData;
    });
  }

  async saveManualTask(task: ManualTaskData): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('manual_tasks');
    const now = new Date();

    await collection.updateOne(
      { taskId: task.taskId, userId: this.userId },
      {
        $set: {
          ...task,
          userId: this.userId,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );
  }

  async updateManualTask(taskId: string, updates: Partial<ManualTaskData>): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('manual_tasks');
    await collection.updateOne(
      { taskId, userId: this.userId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );
  }

  async deleteManualTask(taskId: string): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('manual_tasks');
    await collection.deleteOne({ taskId, userId: this.userId });
  }

  // Billing Data Management
  async getBillingData(): Promise<BillingData> {
    if (!this.db) throw new Error('Database not connected');

    const settingsCollection = this.db.collection('billing_settings');
    const invoicesCollection = this.db.collection('invoices');

    const [settingsDoc, invoices] = await Promise.all([
      settingsCollection.findOne({ userId: this.userId }),
      invoicesCollection.find({ userId: this.userId }).sort({ issueDate: -1 }).toArray()
    ]);

    const settings = settingsDoc?.settings || {
      projectRates: {},
      currency: 'USD',
      invoicePrefix: 'INV',
    };

    const invoiceData = invoices.map(invoice => {
      const { _id, userId, createdAt, updatedAt, ...invoiceInfo } = invoice;
      return invoiceInfo as InvoiceData;
    });

    return {
      settings,
      invoices: invoiceData,
    };
  }

  async saveBillingData(billing: BillingData): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const settingsCollection = this.db.collection('billing_settings');
    const invoicesCollection = this.db.collection('invoices');
    const now = new Date();

    // Save billing settings
    await settingsCollection.updateOne(
      { userId: this.userId },
      {
        $set: {
          settings: billing.settings,
          userId: this.userId,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );

    // Save invoices
    for (const invoice of billing.invoices) {
      await this.saveInvoice(invoice);
    }
  }

  async updateBillingSettings(settings: Partial<BillingData['settings']>): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('billing_settings');
    await collection.updateOne(
      { userId: this.userId },
      {
        $set: {
          'settings': { ...settings },
          updatedAt: new Date(),
        },
      }
    );
  }

  // Invoices Management
  async saveInvoice(invoice: InvoiceData): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('invoices');
    const now = new Date();

    await collection.updateOne(
      { invoiceId: invoice.invoiceId, userId: this.userId },
      {
        $set: {
          ...invoice,
          userId: this.userId,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );
  }

  async updateInvoice(invoiceId: string, updates: Partial<InvoiceData>): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('invoices');
    await collection.updateOne(
      { invoiceId, userId: this.userId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );
  }

  async deleteInvoice(invoiceId: string): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('invoices');
    await collection.deleteOne({ invoiceId, userId: this.userId });
  }

  async getInvoices(filters?: { status?: string; clientId?: string; projectId?: string }): Promise<InvoiceData[]> {
    if (!this.db) throw new Error('Database not connected');

    const collection = this.db.collection('invoices');
    const query: any = { userId: this.userId };

    if (filters?.status) query.status = filters.status;
    if (filters?.clientId) query.clientId = filters.clientId;
    if (filters?.projectId) query.projectId = filters.projectId;

    const invoices = await collection
      .find(query)
      .sort({ issueDate: -1 })
      .toArray();

    return invoices.map(invoice => {
      const { _id, userId, createdAt, updatedAt, ...invoiceData } = invoice;
      return invoiceData as InvoiceData;
    });
  }

  // Data Export/Import
  async exportAllData(): Promise<{
    sessions: Record<string, SessionData>;
    projects: ProjectData[];
    manualTasks: ManualTaskData[];
    billing: BillingData;
  }> {
    const [sessions, projects, manualTasks, billing] = await Promise.all([
      this.getSessions(),
      this.getProjects(),
      this.getManualTasks(),
      this.getBillingData(),
    ]);

    return {
      sessions,
      projects,
      manualTasks,
      billing,
    };
  }

  async importAllData(data: any): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    // Import sessions
    if (data.sessions) {
      for (const [ticketNumber, session] of Object.entries(data.sessions)) {
        await this.saveSession(ticketNumber, session as SessionData);
      }
    }

    // Import projects
    if (data.projects) {
      for (const project of data.projects) {
        await this.saveProject(project);
      }
    }

    // Import manual tasks
    if (data.manualTasks) {
      for (const task of data.manualTasks) {
        await this.saveManualTask(task);
      }
    }

    // Import billing data
    if (data.billing) {
      await this.saveBillingData(data.billing);
    }
  }

  // Utility Methods
  getUserId(): string {
    return this.userId;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }
}
```

### Step 5: Implement Local Storage Manager (Existing)

```typescript
// main/storage/LocalStorageManager.ts
import Store from 'electron-store';
import { v4 as uuidv4 } from 'uuid';
import { 
  IStorageManager, 
  SessionData, 
  ProjectData, 
  ManualTaskData, 
  BillingData,
  InvoiceData 
} from './IStorageManager';

interface AppData {
  sessions: { [ticketNumber: string]: SessionData };
  projectData: ProjectData[];
  manualTasks: ManualTaskData[];
  projects: ProjectData[];
  billing: BillingData;
}

export class LocalStorageManager implements IStorageManager {
  private store: Store<AppData>;
  private userId: string;

  constructor() {
    this.userId = uuidv4();
    this.store = new Store<AppData>({
      name: "app-data",
      defaults: {
        sessions: {},
        projectData: [],
        manualTasks: [],
        projects: [],
        billing: {
          settings: {
            projectRates: {},
            currency: "USD",
            invoicePrefix: "INV",
          },
          invoices: [],
        },
      },
    });
  }

  // Connection management (no-op for local storage)
  async connect(): Promise<void> {
    // Local storage is always "connected"
  }

  async disconnect(): Promise<void> {
    // No cleanup needed for local storage
  }

  isConnected(): boolean {
    return true; // Local storage is always available
  }

  async healthCheck(): Promise<boolean> {
    try {
      // Test read/write operation
      const testKey = '__health_check__';
      this.store.set(testKey, Date.now());
      this.store.delete(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Sessions Management
  async getSessions(): Promise<Record<string, SessionData>> {
    return this.store.get('sessions', {});
  }

  async saveSession(ticketNumber: string, session: SessionData): Promise<void> {
    const sessions = this.store.get('sessions', {});
    sessions[ticketNumber] = session;
    this.store.set('sessions', sessions);
  }

  async deleteSession(ticketNumber: string): Promise<void> {
    const sessions = this.store.get('sessions', {});
    delete sessions[ticketNumber];
    this.store.set('sessions', sessions);
  }

  async updateSessionStatus(ticketNumber: string, status: SessionData['status']): Promise<void> {
    const sessions = this.store.get('sessions', {});
    if (sessions[ticketNumber]) {
      sessions[ticketNumber].status = status;
      this.store.set('sessions', sessions);
    }
  }

  // Projects Management
  async getProjects(): Promise<ProjectData[]> {
    return this.store.get('projects', []);
  }

  async saveProject(project: ProjectData): Promise<void> {
    const projects = this.store.get('projects', []);
    const existingIndex = projects.findIndex(p => p.projectId === project.projectId);
    
    if (existingIndex >= 0) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }
    
    this.store.set('projects', projects);
  }

  async updateProject(projectId: string, updates: Partial<ProjectData>): Promise<void> {
    const projects = this.store.get('projects', []);
    const projectIndex = projects.findIndex(p => p.projectId === projectId);
    
    if (projectIndex >= 0) {
      projects[projectIndex] = { ...projects[projectIndex], ...updates };
      this.store.set('projects', projects);
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    const projects = this.store.get('projects', []);
    const filteredProjects = projects.filter(p => p.projectId !== projectId);
    this.store.set('projects', filteredProjects);
  }

  // Manual Tasks Management
  async getManualTasks(): Promise<ManualTaskData[]> {
    return this.store.get('manualTasks', []);
  }

  async saveManualTask(task: ManualTaskData): Promise<void> {
    const tasks = this.store.get('manualTasks', []);
    const existingIndex = tasks.findIndex(t => t.taskId === task.taskId);
    
    if (existingIndex >= 0) {
      tasks[existingIndex] = task;
    } else {
      tasks.push(task);
    }
    
    this.store.set('manualTasks', tasks);
  }

  async updateManualTask(taskId: string, updates: Partial<ManualTaskData>): Promise<void> {
    const tasks = this.store.get('manualTasks', []);
    const taskIndex = tasks.findIndex(t => t.taskId === taskId);
    
    if (taskIndex >= 0) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
      this.store.set('manualTasks', tasks);
    }
  }

  async deleteManualTask(taskId: string): Promise<void> {
    const tasks = this.store.get('manualTasks', []);
    const filteredTasks = tasks.filter(t => t.taskId !== taskId);
    this.store.set('manualTasks', filteredTasks);
  }

  // Billing Data Management
  async getBillingData(): Promise<BillingData> {
    return this.store.get('billing', {
      settings: {
        projectRates: {},
        currency: "USD",
        invoicePrefix: "INV",
      },
      invoices: [],
    });
  }

  async saveBillingData(billing: BillingData): Promise<void> {
    this.store.set('billing', billing);
  }

  async updateBillingSettings(settings: Partial<BillingData['settings']>): Promise<void> {
    const billing = this.store.get('billing');
    billing.settings = { ...billing.settings, ...settings };
    this.store.set('billing', billing);
  }

  // Invoices Management
  async saveInvoice(invoice: InvoiceData): Promise<void> {
    const billing = this.store.get('billing');
    const existingIndex = billing.invoices.findIndex(inv => inv.invoiceId === invoice.invoiceId);
    
    if (existingIndex >= 0) {
      billing.invoices[existingIndex] = invoice;
    } else {
      billing.invoices.push(invoice);
    }
    
    this.store.set('billing', billing);
  }

  async updateInvoice(invoiceId: string, updates: Partial<InvoiceData>): Promise<void> {
    const billing = this.store.get('billing');
    const invoiceIndex = billing.invoices.findIndex(inv => inv.invoiceId === invoiceId);
    
    if (invoiceIndex >= 0) {
      billing.invoices[invoiceIndex] = { ...billing.invoices[invoiceIndex], ...updates };
      this.store.set('billing', billing);
    }
  }

  async deleteInvoice(invoiceId: string): Promise<void> {
    const billing = this.store.get('billing');
    billing.invoices = billing.invoices.filter(inv => inv.invoiceId !== invoiceId);
    this.store.set('billing', billing);
  }

  async getInvoices(filters?: { status?: string; clientId?: string; projectId?: string }): Promise<InvoiceData[]> {
    const billing = this.store.get('billing');
    let invoices = billing.invoices;

    if (filters?.status) {
      invoices = invoices.filter(inv => inv.status === filters.status);
    }
    if (filters?.clientId) {
      invoices = invoices.filter(inv => inv.clientId === filters.clientId);
    }
    if (filters?.projectId) {
      invoices = invoices.filter(inv => inv.projectId === filters.projectId);
    }

    return invoices.sort((a, b) => b.issueDate - a.issueDate);
  }

  // Data Export/Import
  async exportAllData(): Promise<{
    sessions: Record<string, SessionData>;
    projects: ProjectData[];
    manualTasks: ManualTaskData[];
    billing: BillingData;
  }> {
    return {
      sessions: this.store.get('sessions', {}),
      projects: this.store.get('projects', []),
      manualTasks: this.store.get('manualTasks', []),
      billing: this.store.get('billing', {
        settings: { projectRates: {}, currency: "USD", invoicePrefix: "INV" },
        invoices: [],
      }),
    };
  }

  async importAllData(data: any): Promise<void> {
    if (data.sessions) this.store.set('sessions', data.sessions);
    if (data.projects) this.store.set('projects', data.projects);
    if (data.manualTasks) this.store.set('manualTasks', data.manualTasks);
    if (data.billing) this.store.set('billing', data.billing);
  }

  // Utility Methods
  getUserId(): string {
    return this.userId;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }
}
```

### Step 6: Create Storage Factory

```typescript
// main/storage/StorageFactory.ts
import { IStorageManager } from './IStorageManager';
import { LocalStorageManager } from './LocalStorageManager';
import { MongoDBStorageManager, MongoConfig } from './MongoDBStorageManager';

export type StorageType = 'local' | 'mongodb';

export interface StorageConfiguration {
  type: StorageType;
  mongodb?: MongoConfig;
  userId?: string;
}

export class StorageFactory {
  static create(config: StorageConfiguration): IStorageManager {
    switch (config.type) {
      case 'mongodb':
        if (!config.mongodb) {
          throw new Error('MongoDB configuration is required when type is "mongodb"');
        }
        return new MongoDBStorageManager(config.mongodb, config.userId);
      
      case 'local':
      default:
        return new LocalStorageManager();
    }
  }

  static createFromEnvironment(): IStorageManager {
    const mongoEnabled = process.env.MONGODB_ENABLED === 'true';
    
    if (mongoEnabled) {
      const mongoUri = process.env.MONGODB_URI;
      const mongoDatabase = process.env.MONGODB_DATABASE || 'jira_time_track';
      
      if (!mongoUri) {
        console.warn('MONGODB_ENABLED is true but MONGODB_URI is not set. Falling back to local storage.');
        return new LocalStorageManager();
      }

      const mongoConfig: MongoConfig = {
        uri: mongoUri,
        database: mongoDatabase,
        options: {
          maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE || '10'),
          minPoolSize: parseInt(process.env.MONGODB_MIN_POOL_SIZE || '2'),
          maxIdleTimeMS: parseInt(process.env.MONGODB_MAX_IDLE_TIME_MS || '30000'),
          serverSelectionTimeoutMS: parseInt(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || '5000'),
          ssl: process.env.MONGODB_SSL !== 'false',
          authSource: process.env.MONGODB_AUTH_SOURCE || 'admin',
        },
      };

      return new MongoDBStorageManager(mongoConfig);
    }

    return new LocalStorageManager();
  }
}
```

### Step 7: Update Main Process DataManager

```typescript
// main/background.ts - Updated sections
import { StorageFactory } from './storage/StorageFactory';
import { IStorageManager } from './storage/IStorageManager';

// Replace existing DataManager with storage abstraction
let storageManager: IStorageManager;

async function initializeStorage() {
  try {
    storageManager = StorageFactory.createFromEnvironment();
    await storageManager.connect();
    console.log('Storage initialized successfully');
  } catch (error) {
    console.error('Failed to initialize storage:', error);
    // Fallback to local storage
    storageManager = StorageFactory.create({ type: 'local' });
    await storageManager.connect();
    console.log('Fallback to local storage');
  }
}

// Update IPC handlers to use storageManager instead of direct store access
ipcMain.handle("get-all-data", async () => {
  try {
    const data = await storageManager.exportAllData();
    return { success: true, data };
  } catch (error) {
    console.error("Error getting all data:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("save-session", async (_, { ticketNumber, session }) => {
  try {
    await storageManager.saveSession(ticketNumber, session);
    return { success: true };
  } catch (error) {
    console.error("Error saving session:", error);
    return { success: false, error: error.message };
  }
});

// Add new IPC handlers for MongoDB-specific features
ipcMain.handle("storage-health-check", async () => {
  try {
    const isHealthy = await storageManager.healthCheck();
    return { success: true, healthy: isHealthy };
  } catch (error) {
    return { success: false, healthy: false, error: error.message };
  }
});

ipcMain.handle("get-storage-info", async () => {
  try {
    return {
      success: true,
      info: {
        type: storageManager.constructor.name.includes('MongoDB') ? 'mongodb' : 'local',
        connected: storageManager.isConnected(),
        userId: storageManager.getUserId(),
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Initialize storage when app starts
app.whenReady().then(async () => {
  await initializeStorage();
  createWindow();
});

// Cleanup storage when app quits
app.on("before-quit", async () => {
  if (storageManager) {
    await storageManager.disconnect();
  }
});
```

### Step 8: Add Settings UI for MongoDB Configuration

```typescript
// renderer/components/settings/DatabaseSettings.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { TextInput } from '../ui/TextInput';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface StorageInfo {
  type: 'local' | 'mongodb';
  connected: boolean;
  userId: string;
}

const DatabaseSettings: React.FC = () => {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [mongoConfig, setMongoConfig] = useState({
    uri: '',
    database: 'jira_time_track',
    enabled: false,
  });

  useEffect(() => {
    loadStorageInfo();
  }, []);

  const loadStorageInfo = async () => {
    try {
      const result = await window.ipc.invoke('get-storage-info');
      if (result.success) {
        setStorageInfo(result.info);
      }
    } catch (error) {
      console.error('Failed to load storage info:', error);
    }
  };

  const testConnection = async () => {
    setConnectionStatus('testing');
    try {
      const result = await window.ipc.invoke('storage-health-check');
      if (result.success && result.healthy) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    }
  };

  const handleSaveConfiguration = async () => {
    setIsConnecting(true);
    try {
      // This would require additional IPC handlers to update configuration
      await window.ipc.invoke('update-storage-config', mongoConfig);
      await loadStorageInfo();
    } catch (error) {
      console.error('Failed to update storage configuration:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const exportData = async () => {
    try {
      const result = await window.ipc.invoke('export-all-data');
      if (result.success) {
        // Trigger download of exported data
        const blob = new Blob([JSON.stringify(result.data, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jira-time-track-backup-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Database Settings
      </h2>

      {/* Current Storage Info */}
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Current Storage
        </h3>
        {storageInfo ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Type:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {storageInfo.type === 'mongodb' ? 'MongoDB' : 'Local Storage'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Status:</span>
              <span className={`font-medium ${
                storageInfo.connected 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {storageInfo.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">User ID:</span>
              <span className="font-mono text-sm text-gray-900 dark:text-white">
                {storageInfo.userId}
              </span>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>

      {/* MongoDB Configuration */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          MongoDB Configuration
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableMongoDB"
              checked={mongoConfig.enabled}
              onChange={(e) => setMongoConfig(prev => ({ ...prev, enabled: e.target.checked }))}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="enableMongoDB" className="text-gray-900 dark:text-white">
              Enable MongoDB Storage
            </label>
          </div>

          {mongoConfig.enabled && (
            <>
              <TextInput
                label="MongoDB Connection URI"
                value={mongoConfig.uri}
                onChange={(e) => setMongoConfig(prev => ({ ...prev, uri: e.target.value }))}
                placeholder="mongodb://localhost:27017 or mongodb+srv://..."
                className="w-full"
              />
              
              <TextInput
                label="Database Name"
                value={mongoConfig.database}
                onChange={(e) => setMongoConfig(prev => ({ ...prev, database: e.target.value }))}
                placeholder="jira_time_track"
                className="w-full"
              />

              <div className="flex space-x-3">
                <Button
                  onClick={testConnection}
                  disabled={!mongoConfig.uri || connectionStatus === 'testing'}
                  variant="secondary"
                >
                  {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
                </Button>
                
                {connectionStatus === 'success' && (
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    ✓ Connection successful
                  </span>
                )}
                
                {connectionStatus === 'error' && (
                  <span className="flex items-center text-red-600 dark:text-red-400">
                    ✗ Connection failed
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Data Management */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Data Management
        </h3>
        
        <div className="space-y-3">
          <Button onClick={exportData} variant="secondary">
            Export All Data
          </Button>
          
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Export all your time tracking data as a JSON backup file.
          </p>
        </div>
      </div>

      {/* Save Configuration */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveConfiguration}
          disabled={isConnecting}
        >
          {isConnecting ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>
    </div>
  );
};

export default DatabaseSettings;
```

---

## Configuration Options

### Environment Variables

Create a `.env` file in your project root:

```env
# MongoDB Configuration
MONGODB_ENABLED=false
MONGODB_URI=mongodb://localhost:27017/jira-time-track
MONGODB_DATABASE=jira_time_track
MONGODB_USER=
MONGODB_PASSWORD=

# MongoDB Atlas Cloud Example
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jira-time-track?retryWrites=true&w=majority

# Security Settings
MONGODB_SSL=true
MONGODB_AUTH_SOURCE=admin

# Connection Pool Settings
MONGODB_MAX_POOL_SIZE=10
MONGODB_MIN_POOL_SIZE=2
MONGODB_MAX_IDLE_TIME_MS=30000
MONGODB_SERVER_SELECTION_TIMEOUT_MS=5000

# User Settings
DEFAULT_USER_ID=auto-generated
ENABLE_MULTI_USER=false
```

### Configuration in Code

```typescript
// main/config/database.ts
export interface DatabaseConfig {
  mongodb: {
    enabled: boolean;
    uri: string;
    database: string;
    options: {
      maxPoolSize: number;
      minPoolSize: number;
      maxIdleTimeMS: number;
      serverSelectionTimeoutMS: number;
      ssl: boolean;
      authSource: string;
    };
  };
  local: {
    storePath: string;
    backupEnabled: boolean;
    backupInterval: number; // in hours
  };
}

export const getDatabaseConfig = (): DatabaseConfig => {
  return {
    mongodb: {
      enabled: process.env.MONGODB_ENABLED === 'true',
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/jira-time-track',
      database: process.env.MONGODB_DATABASE || 'jira_time_track',
      options: {
        maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE || '10'),
        minPoolSize: parseInt(process.env.MONGODB_MIN_POOL_SIZE || '2'),
        maxIdleTimeMS: parseInt(process.env.MONGODB_MAX_IDLE_TIME_MS || '30000'),
        serverSelectionTimeoutMS: parseInt(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || '5000'),
        ssl: process.env.MONGODB_SSL !== 'false',
        authSource: process.env.MONGODB_AUTH_SOURCE || 'admin',
      },
    },
    local: {
      storePath: process.env.LOCAL_STORE_PATH || 'userData',
      backupEnabled: process.env.LOCAL_BACKUP_ENABLED === 'true',
      backupInterval: parseInt(process.env.LOCAL_BACKUP_INTERVAL_HOURS || '24'),
    },
  };
};
```

---

## Migration Process

### 1. Data Migration Script

```typescript
// scripts/migrate-to-mongodb.ts
import { LocalStorageManager } from '../main/storage/LocalStorageManager';
import { MongoDBStorageManager } from '../main/storage/MongoDBStorageManager';
import { StorageFactory } from '../main/storage/StorageFactory';

interface MigrationOptions {
  mongoUri: string;
  mongoDatabase: string;
  backupPath?: string;
  dryRun?: boolean;
}

class DataMigrator {
  private localStorage: LocalStorageManager;
  private mongoStorage: MongoDBStorageManager;

  constructor(options: MigrationOptions) {
    this.localStorage = new LocalStorageManager();
    this.mongoStorage = new MongoDBStorageManager({
      uri: options.mongoUri,
      database: options.mongoDatabase,
    });
  }

  async migrate(options: MigrationOptions): Promise<void> {
    console.log('Starting data migration from local storage to MongoDB...');

    try {
      // Connect to MongoDB
      await this.mongoStorage.connect();
      console.log('✓ Connected to MongoDB');

      // Export all data from local storage
      console.log('📤 Exporting data from local storage...');
      const localData = await this.localStorage.exportAllData();
      
      // Create backup if requested
      if (options.backupPath) {
        const fs = await import('fs');
        fs.writeFileSync(
          options.backupPath, 
          JSON.stringify(localData, null, 2)
        );
        console.log(`✓ Backup created at ${options.backupPath}`);
      }

      // Dry run - show what would be migrated
      if (options.dryRun) {
        console.log('🔍 DRY RUN - Data that would be migrated:');
        console.log(`- Sessions: ${Object.keys(localData.sessions).length} items`);
        console.log(`- Projects: ${localData.projects.length} items`);
        console.log(`- Manual Tasks: ${localData.manualTasks.length} items`);
        console.log(`- Invoices: ${localData.billing.invoices.length} items`);
        return;
      }

      // Import data to MongoDB
      console.log('📥 Importing data to MongoDB...');
      await this.mongoStorage.importAllData(localData);
      console.log('✓ Data imported successfully');

      // Verify migration
      const mongoData = await this.mongoStorage.exportAllData();
      const verification = this.verifyMigration(localData, mongoData);
      
      if (verification.success) {
        console.log('✓ Migration verification passed');
        console.log(`- Sessions: ${verification.stats.sessions.migrated}/${verification.stats.sessions.total}`);
        console.log(`- Projects: ${verification.stats.projects.migrated}/${verification.stats.projects.total}`);
        console.log(`- Manual Tasks: ${verification.stats.manualTasks.migrated}/${verification.stats.manualTasks.total}`);
        console.log(`- Invoices: ${verification.stats.invoices.migrated}/${verification.stats.invoices.total}`);
      } else {
        console.error('❌ Migration verification failed');
        console.error(verification.errors);
        throw new Error('Migration verification failed');
      }

      console.log('🎉 Migration completed successfully!');

    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    } finally {
      await this.mongoStorage.disconnect();
    }
  }

  private verifyMigration(localData: any, mongoData: any): {
    success: boolean;
    stats: {
      sessions: { total: number; migrated: number };
      projects: { total: number; migrated: number };
      manualTasks: { total: number; migrated: number };
      invoices: { total: number; migrated: number };
    };
    errors: string[];
  } {
    const errors: string[] = [];
    
    const stats = {
      sessions: {
        total: Object.keys(localData.sessions).length,
        migrated: Object.keys(mongoData.sessions).length,
      },
      projects: {
        total: localData.projects.length,
        migrated: mongoData.projects.length,
      },
      manualTasks: {
        total: localData.manualTasks.length,
        migrated: mongoData.manualTasks.length,
      },
      invoices: {
        total: localData.billing.invoices.length,
        migrated: mongoData.billing.invoices.length,
      },
    };

    // Check if all data was migrated
    if (stats.sessions.total !== stats.sessions.migrated) {
      errors.push(`Sessions count mismatch: ${stats.sessions.total} vs ${stats.sessions.migrated}`);
    }
    if (stats.projects.total !== stats.projects.migrated) {
      errors.push(`Projects count mismatch: ${stats.projects.total} vs ${stats.projects.migrated}`);
    }
    if (stats.manualTasks.total !== stats.manualTasks.migrated) {
      errors.push(`Manual tasks count mismatch: ${stats.manualTasks.total} vs ${stats.manualTasks.migrated}`);
    }
    if (stats.invoices.total !== stats.invoices.migrated) {
      errors.push(`Invoices count mismatch: ${stats.invoices.total} vs ${stats.invoices.migrated}`);
    }

    return {
      success: errors.length === 0,
      stats,
      errors,
    };
  }
}

// Usage example
async function runMigration() {
  const migrator = new DataMigrator({
    mongoUri: 'mongodb://localhost:27017',
    mongoDatabase: 'jira_time_track',
  });

  await migrator.migrate({
    mongoUri: 'mongodb://localhost:27017',
    mongoDatabase: 'jira_time_track',
    backupPath: './data-backup.json',
    dryRun: false, // Set to true for dry run
  });
}

// Run migration if this file is executed directly
if (require.main === module) {
  runMigration().catch(console.error);
}
```

### 2. Gradual Migration Strategy

```typescript
// main/storage/HybridStorageManager.ts - For gradual migration
export class HybridStorageManager implements IStorageManager {
  private localStorage: LocalStorageManager;
  private mongoStorage: MongoDBStorageManager;
  private migrationMode: 'read-local' | 'read-both' | 'read-mongo';

  constructor(mongoConfig: MongoConfig, migrationMode: string = 'read-local') {
    this.localStorage = new LocalStorageManager();
    this.mongoStorage = new MongoDBStorageManager(mongoConfig);
    this.migrationMode = migrationMode as any;
  }

  async connect(): Promise<void> {
    await this.localStorage.connect();
    try {
      await this.mongoStorage.connect();
      console.log('Both storage systems connected');
    } catch (error) {
      console.warn('MongoDB connection failed, using local storage only');
      this.migrationMode = 'read-local';
    }
  }

  async getSessions(): Promise<Record<string, SessionData>> {
    switch (this.migrationMode) {
      case 'read-local':
        return this.localStorage.getSessions();
      case 'read-mongo':
        return this.mongoStorage.getSessions();
      case 'read-both':
        try {
          // Try MongoDB first, fallback to local
          return await this.mongoStorage.getSessions();
        } catch (error) {
          console.warn('MongoDB read failed, falling back to local storage');
          return this.localStorage.getSessions();
        }
      default:
        return this.localStorage.getSessions();
    }
  }

  async saveSession(ticketNumber: string, session: SessionData): Promise<void> {
    // Always write to both during migration
    await Promise.allSettled([
      this.localStorage.saveSession(ticketNumber, session),
      this.mongoStorage.saveSession(ticketNumber, session),
    ]);
  }

  // Implement other methods similarly...
}
```

### 3. Migration UI Component

```typescript
// renderer/components/migration/MigrationWizard.tsx
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface MigrationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const MigrationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [migrationResults, setMigrationResults] = useState<any>(null);

  const steps: MigrationStep[] = [
    {
      id: 'backup',
      title: 'Create Backup',
      description: 'Create a backup of your current data',
      completed: false,
    },
    {
      id: 'connection',
      title: 'Test MongoDB Connection',
      description: 'Verify connection to MongoDB database',
      completed: false,
    },
    {
      id: 'migrate',
      title: 'Migrate Data',
      description: 'Transfer all data to MongoDB',
      completed: false,
    },
    {
      id: 'verify',
      title: 'Verify Migration',
      description: 'Confirm all data was migrated correctly',
      completed: false,
    },
  ];

  const runMigration = async () => {
    setIsRunning(true);
    try {
      const result = await window.ipc.invoke('run-data-migration', {
        createBackup: true,
        verifyData: true,
      });
      setMigrationResults(result);
    } catch (error) {
      console.error('Migration failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Data Migration to MongoDB
      </h2>

      {/* Progress Steps */}
      <div className="mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
              step.completed 
                ? 'bg-green-500 text-white' 
                : index === currentStep
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {step.completed ? '✓' : index + 1}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Migration Results */}
      {migrationResults && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Migration Results
          </h3>
          <div className="space-y-1 text-sm">
            <div>Sessions migrated: {migrationResults.stats?.sessions?.migrated || 0}</div>
            <div>Projects migrated: {migrationResults.stats?.projects?.migrated || 0}</div>
            <div>Tasks migrated: {migrationResults.stats?.manualTasks?.migrated || 0}</div>
            <div>Invoices migrated: {migrationResults.stats?.invoices?.migrated || 0}</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="secondary" disabled={isRunning}>
          Cancel
        </Button>
        <Button onClick={runMigration} disabled={isRunning}>
          {isRunning ? (
            <>
              <LoadingSpinner className="mr-2" />
              Migrating...
            </>
          ) : (
            'Start Migration'
          )}
        </Button>
      </div>
    </div>
  );
};

export default MigrationWizard;
```

---

## Security Considerations

### 1. Connection Security

```typescript
// main/security/mongodb-security.ts
export class MongoDBSecurity {
  static validateConnectionString(uri: string): boolean {
    // Validate MongoDB URI format
    const mongoUriRegex = /^mongodb(\+srv)?:\/\/.+/;
    return mongoUriRegex.test(uri);
  }

  static sanitizeConnectionString(uri: string): string {
    // Remove sensitive information from logs
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
  }

  static getSecureConnectionOptions() {
    return {
      ssl: true,
      sslValidate: true,
      sslCA: process.env.MONGODB_SSL_CA_FILE,
      authSource: 'admin',
      retryWrites: true,
      w: 'majority',
    };
  }
}
```

### 2. Data Encryption

```typescript
// main/security/data-encryption.ts
import crypto from 'crypto';

export class DataEncryption {
  private static algorithm = 'aes-256-gcm';
  private static keyLength = 32;

  static generateKey(): string {
    return crypto.randomBytes(this.keyLength).toString('hex');
  }

  static encrypt(text: string, key: string): { encrypted: string; iv: string; tag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, key);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex'),
    };
  }

  static decrypt(encryptedData: { encrypted: string; iv: string; tag: string }, key: string): string {
    const decipher = crypto.createDecipher(this.algorithm, key);
    decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

// Usage in MongoDB storage manager
export class SecureMongoDBStorageManager extends MongoDBStorageManager {
  private encryptionKey: string;

  constructor(config: MongoConfig, encryptionKey?: string) {
    super(config);
    this.encryptionKey = encryptionKey || process.env.DATA_ENCRYPTION_KEY || DataEncryption.generateKey();
  }

  async saveSession(ticketNumber: string, session: SessionData): Promise<void> {
    // Encrypt sensitive data before saving
    const encryptedSession = {
      ...session,
      description: this.encryptField(session.description),
      // Encrypt other sensitive fields as needed
    };
    
    await super.saveSession(ticketNumber, encryptedSession);
  }

  private encryptField(value: string): string {
    if (!value) return value;
    const encrypted = DataEncryption.encrypt(value, this.encryptionKey);
    return JSON.stringify(encrypted);
  }

  private decryptField(encryptedValue: string): string {
    if (!encryptedValue) return encryptedValue;
    try {
      const encryptedData = JSON.parse(encryptedValue);
      return DataEncryption.decrypt(encryptedData, this.encryptionKey);
    } catch (error) {
      // Return original value if decryption fails (for backward compatibility)
      return encryptedValue;
    }
  }
}
```

### 3. Access Control

```typescript
// main/security/access-control.ts
export class AccessControl {
  private static allowedOrigins = [
    'file://',
    'http://localhost',
    'https://localhost',
  ];

  static validateRequest(origin: string): boolean {
    return this.allowedOrigins.some(allowed => origin.startsWith(allowed));
  }

  static sanitizeUserInput(input: any): any {
    if (typeof input === 'string') {
      // Remove potentially dangerous characters
      return input.replace(/[<>\"'%;()&+]/g, '');
    }
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeUserInput(item));
    }
    if (typeof input === 'object' && input !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(input)) {
        sanitized[this.sanitizeUserInput(key)] = this.sanitizeUserInput(value);
      }
      return sanitized;
    }
    return input;
  }

  static rateLimitCheck(userId: string, operation: string): boolean {
    // Implement rate limiting logic
    // This is a simplified example
    const key = `${userId}:${operation}`;
    const now = Date.now();
    
    // Allow max 100 operations per minute per user
    // Implementation would use a proper rate limiting library
    return true; // Placeholder
  }
}
```

---

## Error Handling

### 1. Connection Error Handling

```typescript
// main/error-handling/mongodb-errors.ts
export class MongoDBErrorHandler {
  static handleConnectionError(error: any): {
    message: string;
    code: string;
    recoverable: boolean;
    suggestions: string[];
  } {
    const suggestions: string[] = [];
    let recoverable = false;

    switch (error.name) {
      case 'MongoNetworkError':
        suggestions.push('Check your internet connection');
        suggestions.push('Verify the MongoDB server is running');
        suggestions.push('Check firewall settings');
        recoverable = true;
        break;

      case 'MongoAuthenticationError':
        suggestions.push('Verify your username and password');
        suggestions.push('Check the authentication database');
        suggestions.push('Ensure user has proper permissions');
        recoverable = false;
        break;

      case 'MongoTimeoutError':
        suggestions.push('Check network latency');
        suggestions.push('Increase connection timeout');
        suggestions.push('Verify server is not overloaded');
        recoverable = true;
        break;

      case 'MongoParseError':
        suggestions.push('Check the connection string format');
        suggestions.push('Verify URI encoding for special characters');
        recoverable = false;
        break;

      default:
        suggestions.push('Check MongoDB server logs');
        suggestions.push('Verify connection configuration');
        recoverable = true;
    }

    return {
      message: error.message,
      code: error.name || 'UnknownError',
      recoverable,
      suggestions,
    };
  }

  static async handleOperationError(error: any, operation: string, retryCount: number = 0): Promise<void> {
    console.error(`MongoDB operation '${operation}' failed:`, error);

    if (retryCount < 3 && this.isRetryableError(error)) {
      console.log(`Retrying operation '${operation}' (attempt ${retryCount + 1}/3)`);
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
      throw new Error('RETRY_OPERATION');
    }

    throw error;
  }

  private static isRetryableError(error: any): boolean {
    const retryableErrors = [
      'MongoNetworkError',
      'MongoTimeoutError',
      'MongoNotConnectedError',
    ];
    return retryableErrors.includes(error.name);
  }
}
```

### 2. Automatic Fallback System

```typescript
// main/storage/FallbackStorageManager.ts
export class FallbackStorageManager implements IStorageManager {
  private primaryStorage: IStorageManager;
  private fallbackStorage: IStorageManager;
  private useFallback: boolean = false;

  constructor(primary: IStorageManager, fallback: IStorageManager) {
    this.primaryStorage = primary;
    this.fallbackStorage = fallback;
  }

  async connect(): Promise<void> {
    try {
      await this.primaryStorage.connect();
      this.useFallback = false;
      console.log('Connected to primary storage (MongoDB)');
    } catch (error) {
      console.warn('Primary storage connection failed, using fallback:', error);
      await this.fallbackStorage.connect();
      this.useFallback = true;
      console.log('Connected to fallback storage (Local)');
    }
  }

  private async executeWithFallback<T>(
    operation: (storage: IStorageManager) => Promise<T>
  ): Promise<T> {
    const storage = this.useFallback ? this.fallbackStorage : this.primaryStorage;
    
    try {
      return await operation(storage);
    } catch (error) {
      if (!this.useFallback) {
        console.warn('Primary storage operation failed, trying fallback:', error);
        this.useFallback = true;
        return await operation(this.fallbackStorage);
      }
      throw error;
    }
  }

  async getSessions(): Promise<Record<string, SessionData>> {
    return this.executeWithFallback(storage => storage.getSessions());
  }

  async saveSession(ticketNumber: string, session: SessionData): Promise<void> {
    return this.executeWithFallback(storage => storage.saveSession(ticketNumber, session));
  }

  // Implement other methods similarly...

  isConnected(): boolean {
    return this.useFallback ? this.fallbackStorage.isConnected() : this.primaryStorage.isConnected();
  }

  async healthCheck(): Promise<boolean> {
    const storage = this.useFallback ? this.fallbackStorage : this.primaryStorage;
    return storage.healthCheck();
  }
}
```

### 3. Error Recovery UI

```typescript
// renderer/components/error/DatabaseErrorHandler.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

interface DatabaseError {
  message: string;
  code: string;
  recoverable: boolean;
  suggestions: string[];
}

const DatabaseErrorHandler: React.FC = () => {
  const [error, setError] = useState<DatabaseError | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Listen for database errors
    const cleanup = window.ipc.on('database-error', (errorData: DatabaseError) => {
      setError(errorData);
    });

    return cleanup;
  }, []);

  const retryConnection = async () => {
    setIsRetrying(true);
    try {
      await window.ipc.invoke('retry-database-connection');
      setError(null);
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  const switchToLocalStorage = async () => {
    try {
      await window.ipc.invoke('switch-to-local-storage');
      setError(null);
    } catch (error) {
      console.error('Switch to local storage failed:', error);
    }
  };

  if (!error) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-xl">!</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Database Connection Error
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {error.message}
        </p>

        {error.suggestions.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Suggestions:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {error.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex space-x-3">
          {error.recoverable && (
            <Button
              onClick={retryConnection}
              disabled={isRetrying}
              className="flex-1"
            >
              {isRetrying ? 'Retrying...' : 'Retry Connection'}
            </Button>
          )}
          <Button
            onClick={switchToLocalStorage}
            variant="secondary"
            className="flex-1"
          >
            Use Local Storage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseErrorHandler;
```

---

## Testing & Validation

### 1. Unit Tests

```typescript
// tests/storage/mongodb-storage.test.ts
import { MongoDBStorageManager } from '../../main/storage/MongoDBStorageManager';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('MongoDBStorageManager', () => {
  let mongoServer: MongoMemoryServer;
  let storageManager: MongoDBStorageManager;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    storageManager = new MongoDBStorageManager({
      uri: mongoUri,
      database: 'test_db',
    });
    
    await storageManager.connect();
  });

  afterAll(async () => {
    await storageManager.disconnect();
    await mongoServer.stop();
  });

  describe('Sessions Management', () => {
    it('should save and retrieve sessions', async () => {
      const session = {
        ticketNumber: 'TEST-123',
        projectName: 'Test Project',
        description: 'Test session',
        startTime: Date.now(),
        duration: 3600000,
        status: 'completed' as const,
      };

      await storageManager.saveSession('TEST-123', session);
      const sessions = await storageManager.getSessions();
      
      expect(sessions['TEST-123']).toEqual(session);
    });

    it('should delete sessions', async () => {
      await storageManager.deleteSession('TEST-123');
      const sessions = await storageManager.getSessions();
      
      expect(sessions['TEST-123']).toBeUndefined();
    });
  });

  describe('Projects Management', () => {
    it('should save and retrieve projects', async () => {
      const project = {
        projectId: 'proj_001',
        name: 'Test Project',
        description: 'A test project',
        status: 'active' as const,
        hourlyRate: 75,
        currency: 'USD',
      };

      await storageManager.saveProject(project);
      const projects = await storageManager.getProjects();
      
      expect(projects).toContainEqual(project);
    });
  });

  describe('Error Handling', () => {
    it('should handle connection errors gracefully', async () => {
      const invalidStorageManager = new MongoDBStorageManager({
        uri: 'mongodb://invalid-host:27017',
        database: 'test_db',
      });

      await expect(invalidStorageManager.connect()).rejects.toThrow();
    });
  });
});
```

### 2. Integration Tests

```typescript
// tests/integration/storage-compatibility.test.ts
import { LocalStorageManager } from '../../main/storage/LocalStorageManager';
import { MongoDBStorageManager } from '../../main/storage/MongoDBStorageManager';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Storage Compatibility', () => {
  let mongoServer: MongoMemoryServer;
  let localStorage: LocalStorageManager;
  let mongoStorage: MongoDBStorageManager;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    localStorage = new LocalStorageManager();
    mongoStorage = new MongoDBStorageManager({
      uri: mongoServer.getUri(),
      database: 'compatibility_test',
    });

    await localStorage.connect();
    await mongoStorage.connect();
  });

  afterAll(async () => {
    await mongoStorage.disconnect();
    await mongoServer.stop();
  });

  it('should migrate data between storage systems', async () => {
    // Add test data to local storage
    const testData = {
      sessions: {
        'TEST-001': {
          ticketNumber: 'TEST-001',
          projectName: 'Migration Test',
          description: 'Test migration',
          startTime: Date.now(),
          duration: 7200000,
          status: 'completed' as const,
        },
      },
      projects: [{
        projectId: 'migration_proj',
        name: 'Migration Project',
        status: 'active' as const,
      }],
      manualTasks: [{
        taskId: 'task_001',
        title: 'Test Task',
        duration: 3600000,
        date: Date.now(),
      }],
      billing: {
        settings: {
          projectRates: {},
          currency: 'USD',
          invoicePrefix: 'MIG',
        },
        invoices: [],
      },
    };

    // Import to local storage
    await localStorage.importAllData(testData);

    // Export from local storage
    const exportedData = await localStorage.exportAllData();

    // Import to MongoDB
    await mongoStorage.importAllData(exportedData);

    // Verify data in MongoDB
    const mongoData = await mongoStorage.exportAllData();

    expect(mongoData.sessions).toEqual(testData.sessions);
    expect(mongoData.projects).toEqual(testData.projects);
    expect(mongoData.manualTasks).toEqual(testData.manualTasks);
  });
});
```

### 3. Performance Tests

```typescript
// tests/performance/storage-performance.test.ts
describe('Storage Performance', () => {
  const generateTestData = (count: number) => {
    const sessions: Record<string, any> = {};
    const projects: any[] = [];
    const tasks: any[] = [];

    for (let i = 0; i < count; i++) {
      sessions[`PERF-${i}`] = {
        ticketNumber: `PERF-${i}`,
        projectName: `Performance Test ${i}`,
        description: `Performance test session ${i}`,
        startTime: Date.now() - i * 1000,
        duration: Math.random() * 7200000,
        status: 'completed',
      };

      projects.push({
        projectId: `perf_proj_${i}`,
        name: `Performance Project ${i}`,
        status: 'active',
        hourlyRate: 50 + Math.random() * 100,
      });

      tasks.push({
        taskId: `perf_task_${i}`,
        title: `Performance Task ${i}`,
        duration: Math.random() * 3600000,
        date: Date.now() - i * 86400000,
      });
    }

    return { sessions, projects, tasks };
  };

  it('should handle large datasets efficiently', async () => {
    const testData = generateTestData(1000);
    
    const startTime = Date.now();
    
    // Test bulk operations
    for (const [ticketNumber, session] of Object.entries(testData.sessions)) {
      await storageManager.saveSession(ticketNumber, session);
    }
    
    const saveTime = Date.now() - startTime;
    
    // Retrieve all sessions
    const retrieveStartTime = Date.now();
    const sessions = await storageManager.getSessions();
    const retrieveTime = Date.now() - retrieveStartTime;
    
    console.log(`Save time for 1000 sessions: ${saveTime}ms`);
    console.log(`Retrieve time for 1000 sessions: ${retrieveTime}ms`);
    
    expect(Object.keys(sessions)).toHaveLength(1000);
    expect(saveTime).toBeLessThan(10000); // Should complete within 10 seconds
    expect(retrieveTime).toBeLessThan(1000); // Should retrieve within 1 second
  });
});
```

---

## Deployment Guide

### 1. Production Environment Setup

```yaml
# docker-compose.yml for MongoDB setup
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    container_name: jira-time-track-mongo
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: jira_time_track
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init:/docker-entrypoint-initdb.d
    networks:
      - jira-time-track-network

  mongo-express:
    image: mongo-express:latest
    container_name: jira-time-track-mongo-express
    restart: unless-stopped
    depends_on:
      - mongodb
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_ROOT_PASSWORD}
      ME_CONFIG_MONGODB_SERVER: mongodb
      ME_CONFIG_BASICAUTH_USERNAME: ${MONGO_EXPRESS_USER}
      ME_CONFIG_BASICAUTH_PASSWORD: ${MONGO_EXPRESS_PASSWORD}
    ports:
      - "8081:8081"
    networks:
      - jira-time-track-network

volumes:
  mongodb_data:

networks:
  jira-time-track-network:
    driver: bridge
```

### 2. MongoDB Atlas Setup Guide

```bash
# 1. Create MongoDB Atlas Account
# Go to https://cloud.mongodb.com/

# 2. Create a New Cluster
# Choose M0 Sandbox (Free Tier) for development
# Select cloud provider and region

# 3. Configure Network Access
# Add IP addresses that can connect to your cluster
# For development: 0.0.0.0/0 (Allow access from anywhere)
# For production: Specific IP addresses

# 4. Create Database User
# Go to Database Access
# Add new database user with read/write permissions
# Choose password authentication

# 5. Get Connection String
# Go to Clusters > Connect > Connect your application
# Copy the connection string
# Replace <password> with your database user password
# Replace <dbname> with your database name

# Example connection string:
# mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jira_time_track?retryWrites=true&w=majority
```

### 3. Production Configuration

```typescript
// main/config/production.ts
export const getProductionConfig = () => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'DATA_ENCRYPTION_KEY',
  ];

  // Validate required environment variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Required environment variable ${envVar} is not set`);
    }
  }

  return {
    mongodb: {
      uri: process.env.MONGODB_URI!,
      database: process.env.MONGODB_DATABASE || 'jira_time_track',
      options: {
        maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE || '20'),
        minPoolSize: parseInt(process.env.MONGODB_MIN_POOL_SIZE || '5'),
        maxIdleTimeMS: parseInt(process.env.MONGODB_MAX_IDLE_TIME_MS || '30000'),
        serverSelectionTimeoutMS: parseInt(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || '5000'),
        ssl: process.env.MONGODB_SSL !== 'false',
        authSource: process.env.MONGODB_AUTH_SOURCE || 'admin',
        retryWrites: true,
        w: 'majority',
      },
    },
    security: {
      encryptionKey: process.env.DATA_ENCRYPTION_KEY!,
      enableRateLimit: process.env.ENABLE_RATE_LIMIT === 'true',
      maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE || '100'),
    },
    logging: {
      level: process.env.LOG_LEVEL || 'info',
      enableMongoDBLogs: process.env.ENABLE_MONGODB_LOGS === 'true',
    },
  };
};
```

### 4. Deployment Scripts

```bash
#!/bin/bash
# deploy.sh - Production deployment script

set -e

echo "Starting Jira Time Track deployment with MongoDB..."

# 1. Validate environment
if [ -z "$MONGODB_URI" ]; then
    echo "Error: MONGODB_URI environment variable is required"
    exit 1
fi

if [ -z "$DATA_ENCRYPTION_KEY" ]; then
    echo "Error: DATA_ENCRYPTION_KEY environment variable is required"
    exit 1
fi

# 2. Install dependencies
echo "Installing dependencies..."
npm ci --only=production

# 3. Build application
echo "Building application..."
npm run build

# 4. Test MongoDB connection
echo "Testing MongoDB connection..."
node -e "
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
client.connect()
  .then(() => {
    console.log('MongoDB connection successful');
    return client.close();
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
"

# 5. Run database migrations if needed
echo "Running database migrations..."
npm run migrate

# 6. Start application
echo "Starting application..."
npm start

echo "Deployment completed successfully!"
```

### 5. Monitoring and Maintenance

```typescript
// main/monitoring/mongodb-monitor.ts
export class MongoDBMonitor {
  private storageManager: MongoDBStorageManager;
  private metrics: {
    connectionCount: number;
    queryCount: number;
    errorCount: number;
    averageResponseTime: number;
  };

  constructor(storageManager: MongoDBStorageManager) {
    this.storageManager = storageManager;
    this.metrics = {
      connectionCount: 0,
      queryCount: 0,
      errorCount: 0,
      averageResponseTime: 0,
    };
  }

  async startMonitoring(): Promise<void> {
    // Check connection health every 30 seconds
    setInterval(async () => {
      try {
        const isHealthy = await this.storageManager.healthCheck();
        if (!isHealthy) {
          console.warn('MongoDB health check failed');
          this.metrics.errorCount++;
        }
      } catch (error) {
        console.error('MongoDB monitoring error:', error);
        this.metrics.errorCount++;
      }
    }, 30000);

    // Log metrics every 5 minutes
    setInterval(() => {
      console.log('MongoDB Metrics:', this.metrics);
    }, 300000);
  }

  recordQuery(responseTime: number): void {
    this.metrics.queryCount++;
    this.metrics.averageResponseTime = 
      (this.metrics.averageResponseTime + responseTime) / 2;
  }

  recordError(): void {
    this.metrics.errorCount++;
  }

  getMetrics(): typeof this.metrics {
    return { ...this.metrics };
  }
}
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Connection Issues

**Problem**: "MongoNetworkError: connect ECONNREFUSED"
```
Solution:
1. Check if MongoDB service is running:
   - Local: `sudo systemctl status mongod`
   - Docker: `docker ps | grep mongo`
2. Verify connection string format
3. Check firewall settings
4. Ensure correct port (default: 27017)
```

**Problem**: "MongoAuthenticationError: Authentication failed"
```
Solution:
1. Verify username and password
2. Check authentication database (authSource)
3. Ensure user has proper permissions:
   db.grantRolesToUser("username", ["readWrite"])
4. For Atlas: Check IP whitelist
```

#### 2. Performance Issues

**Problem**: Slow query performance
```
Solution:
1. Check database indexes:
   db.collection.getIndexes()
2. Add missing indexes for frequently queried fields
3. Monitor query execution plans:
   db.collection.find().explain("executionStats")
4. Consider data pagination for large result sets
```

**Problem**: High memory usage
```
Solution:
1. Reduce connection pool size in configuration
2. Implement data archiving for old records
3. Use projection to fetch only required fields
4. Monitor and optimize aggregation pipelines
```

#### 3. Data Issues

**Problem**: Data inconsistency between local and MongoDB
```
Solution:
1. Run data verification script:
   npm run verify-data-integrity
2. Use migration verification tool
3. Check for concurrent write operations
4. Implement proper error handling and rollback
```

**Problem**: Encryption/decryption errors
```
Solution:
1. Verify encryption key is consistent
2. Check for corrupted encrypted data
3. Implement backward compatibility for unencrypted data
4. Use data migration script to re-encrypt data
```

#### 4. Application Issues

**Problem**: Application won't start with MongoDB enabled
```
Solution:
1. Check environment variables are set correctly
2. Verify MongoDB service is accessible
3. Review application logs for specific errors
4. Test with fallback to local storage:
   MONGODB_ENABLED=false npm start
```

**Problem**: Migration fails with timeout
```
Solution:
1. Increase migration timeout settings
2. Run migration in batches:
   npm run migrate -- --batch-size=100
3. Check available disk space
4. Monitor network connectivity during migration
```

### Diagnostic Commands

```bash
# Check MongoDB connection
mongosh "mongodb://localhost:27017/jira_time_track" --eval "db.runCommand('ping')"

# Monitor MongoDB performance
mongosh --eval "db.serverStatus()"

# Check collection statistics
mongosh jira_time_track --eval "db.sessions.stats()"

# Verify indexes
mongosh jira_time_track --eval "db.sessions.getIndexes()"

# Test application database connectivity
node -e "
const { MongoClient } = require('mongodb');
MongoClient.connect(process.env.MONGODB_URI)
  .then(client => {
    console.log('Connection successful');
    return client.db().admin().ping();
  })
  .then(() => console.log('Ping successful'))
  .catch(console.error);
"
```

### Support Resources

- **MongoDB Documentation**: https://docs.mongodb.com/
- **MongoDB Atlas Support**: https://support.mongodb.com/
- **Node.js MongoDB Driver**: https://mongodb.github.io/node-mongodb-native/
- **Mongoose Documentation**: https://mongoosejs.com/docs/
- **MongoDB University**: https://university.mongodb.com/

---

## Conclusion

This comprehensive MongoDB integration guide provides everything needed to add optional MongoDB support to the Jira Time Track application. The implementation includes:

✅ **Database Abstraction Layer** - Clean separation between storage implementations
✅ **Backward Compatibility** - Existing local storage continues to work
✅ **Data Migration Tools** - Safe migration from local to MongoDB storage
✅ **Security Features** - Encryption, access control, and secure connections
✅ **Error Handling** - Robust error handling with automatic fallbacks
✅ **Performance Optimization** - Indexes, connection pooling, and query optimization
✅ **Testing Strategy** - Unit tests, integration tests, and performance tests
✅ **Production Deployment** - Complete deployment guide and monitoring
✅ **Troubleshooting Guide** - Common issues and solutions

The feature can be implemented incrementally, starting with the core storage abstraction layer and gradually adding advanced features like encryption, monitoring, and team collaboration capabilities.

Remember to thoroughly test the implementation in a development environment before deploying to production, and always maintain backups of your data during migration processes.