// types/index.ts - Comprehensive type definitions for the entire application

// ==================== CORE DATA TYPES ====================

export interface Task {
  ticket_number: string;
  ticket_name: string;
  story_points: number | null;
  isImported?: boolean;
  importedAt?: string;
  isManual?: boolean;
  createdAt?: string;
}

export interface Session {
  startTime: number;
  endTime?: number;
  duration: number;
  status: 'running' | 'paused' | 'completed' | 'stopped';
}

export interface TimerSession {
  ticketNumber: string;
  ticketName: string;
  storyPoints?: number;
  sessions: Session[];
  totalElapsed: number;
}

export interface ProjectSummary {
  name: string;
  ticketCount: number;
  location?: string;
  currentBranch?: string;
  totalStoryPoints: number;
  averageStoryPoints: number;
  completedTickets: number;
  inProgressTickets: number;
  totalTimeSpent: number;
}

export interface DashboardStats {
  totalTickets: number;
  totalStoryPoints: number;
  averageStoryPoints: number;
  totalProjects: number;
  completedTickets: number;
  inProgressTickets: number;
  totalTimeTracked: number;
  productivity: ProductivityMetrics;
}

export interface ProductivityMetrics {
  ticketsPerDay: number;
  pointsPerDay: number;
  averageTimePerTicket: number;
  averageTimePerPoint: number;
}

// ==================== STORAGE TYPES ====================

export interface AppData {
  sessions: { [ticketNumber: string]: TimerSession };
  projectData: Task[];
  manualTasks: Task[];
}

export interface ProjectPaths {
  [projectName: string]: string;
}

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ImportResponse {
  success: boolean;
  importedCount?: number;
  error?: string;
}

export interface ExportResponse {
  success: boolean;
  filePath?: string;
  recordCount?: number;
  canceled?: boolean;
  error?: string;
}

export interface GitBranchResponse {
  branch?: string;
  error?: string;
}

export interface DataSourceInfo {
  projectDataCount: number;
  manualTasksCount: number;
  totalTasksCount: number;
  hasImportedData: boolean;
  lastImportDate: string | null;
}

// ==================== IPC CHANNEL TYPES ====================

export interface IpcChannels {
  // Data management
  'load-project-data': () => Promise<Task[]>;
  'get-sessions': () => Promise<{ [ticketNumber: string]: TimerSession }>;
  'save-session': (sessionData: TimerSession) => void;
  'get-all-tasks': () => Promise<Task[]>;
  
  // Manual tasks
  'add-manual-task': (taskData: Omit<Task, 'isManual' | 'createdAt'>) => Promise<ApiResponse<Task>>;
  'update-manual-task': (params: { taskId: string; updates: Partial<Task> }) => Promise<ApiResponse<Task>>;
  'delete-manual-task': (taskId: string) => Promise<ApiResponse<void>>;
  'get-manual-tasks': () => Promise<Task[]>;
  
  // CSV import/export
  'import-csv-data': (csvData: any[]) => Promise<ImportResponse>;
  'import-csv-file': () => Promise<ImportResponse>;
  'export-time-data': (options: ExportOptions) => Promise<ExportResponse>;
  'get-export-summary': () => Promise<ExportSummary>;
  'get-data-source-info': () => Promise<DataSourceInfo>;
  
  // Project management
  'get-project-paths': () => Promise<ProjectPaths>;
  'save-project-paths': (paths: ProjectPaths) => void;
  'select-project-directory': (projectName: string) => Promise<{ filePath?: string; canceled?: boolean; error?: string }>;
  'get-current-branch': (params: { projectName: string; projectPath: string }) => Promise<GitBranchResponse>;
  'run-github-action': (params: { projectPath: string; actionName: string }) => Promise<ApiResponse<string>>;
  
  // Window control
  'toggle-float-window': () => void;
  'window-control': (command: 'minimize' | 'maximize' | 'close' | 'hide' | 'show') => void;
  'window-move': (movement: { movementX: number; movementY: number }) => void;
  'window-resize': (size: { height: number }) => void;
  'show-main-window': () => void;
  
  // Task management
  'start-task': (params: { ticket: string; name: string; storyPoints?: number }) => void;
  'pause-task': (params: { ticket: string }) => void;
  'resume-task': (params: { ticket: string }) => void;
  'stop-task': (params: { ticket: string }) => void;
  'delete-task': (params: { ticket: string }) => void;
  
  // Tray management
  'update-tray-status': (params: { activeTimers: number }) => Promise<ApiResponse<void>>;
  
  // Legacy
  'message': (message: string) => Promise<string>;
}

export interface IpcEvents {
  'sessions-updated': (sessions: { [ticketNumber: string]: TimerSession }) => void;
  'project-data-updated': (data: Task[]) => void;
  'manual-tasks-updated': (tasks: Task[]) => void;
  'task-started': (params: { ticketNumber: string; ticketName: string; storyPoints?: number }) => void;
  'task-paused': (ticketNumber: string) => void;
  'task-resumed': (ticketNumber: string) => void;
  'task-stopped': (ticketNumber: string) => void;
  'message': (message: string) => void;
}

// ==================== EXPORT TYPES ====================

export interface ExportOptions {
  format: 'csv' | 'json';
  dateRange?: {
    start?: string;
    end?: string;
  };
  filterProject?: string;
}

export interface ExportSummary {
  totalSessions: number;
  totalTime: number;
  totalProjects: number;
  totalTickets: number;
  error?: string;
}

export interface ExportRecord {
  ticketNumber: string;
  ticketName: string;
  projectName: string;
  storyPoints: number;
  sessionStart: string;
  sessionEnd: string;
  duration: number;
  durationHours: string;
  status: string;
  date: string;
}

// ==================== FORM TYPES ====================

export interface ManualTaskFormData {
  ticket_number: string;
  ticket_name: string;
  story_points?: number;
}

export interface CsvImportFormData {
  file: File;
  hasHeader: boolean;
  delimiter: ',' | ';' | '\t';
}

// ==================== COMPONENT PROPS TYPES ====================

export interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
}

export interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projects: string[];
}

export interface ManualTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: ManualTaskFormData) => Promise<void>;
  editingTask?: Task | null;
  existingTickets: string[];
}

export interface CsvImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (csvData: any[]) => Promise<void>;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

// ==================== HOOK TYPES ====================

export interface UseSharedDataReturn {
  projectData: Task[];
  sessions: { [ticketNumber: string]: TimerSession };
  loading: boolean;
  saveSession: (sessionData: TimerSession) => void;
}

export interface UseKeyboardShortcutsOptions {
  onToggleFloating?: () => void;
  onShowExport?: () => void;
  onRefreshData?: () => void;
  onStartTimer?: () => void;
  onPauseTimer?: () => void;
  onStopTimer?: () => void;
}

// ==================== WINDOW TYPES ====================
// Window types are now in types/global.d.ts to avoid conflicts