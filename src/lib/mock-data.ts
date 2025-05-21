export const mockFinancialMetrics = {
 totalRevenue: 125000,
 totalExpenses: 85000,
 netProfit: 40000,
 pendingInvoices: 12,
};

export const mockInvoices = [
 {
  id: 1,
  number: 'INV-001',
  client: 'Acme Corp',
  amount: 5000,
  status: 'Paid',
  dueDate: '2024-03-01',
  issueDate: '2024-02-15',
 },
 {
  id: 2,
  number: 'INV-002',
  client: 'TechStart Inc',
  amount: 7500,
  status: 'Sent',
  dueDate: '2024-03-15',
  issueDate: '2024-03-01',
 },
 {
  id: 3,
  number: 'INV-003',
  client: 'Global Services Ltd',
  amount: 12000,
  status: 'Overdue',
  dueDate: '2024-02-28',
  issueDate: '2024-02-01',
 },
];

export const mockTransactions = [
 {
  id: 1,
  date: '2024-03-01',
  description: 'Monthly Subscription',
  amount: 5000,
  type: 'Income',
  category: 'Recurring Revenue',
  status: 'Completed',
 },
 {
  id: 2,
  date: '2024-03-02',
  description: 'Office Supplies',
  amount: 500,
  type: 'Expense',
  category: 'Operating Expenses',
  status: 'Completed',
 },
 {
  id: 3,
  date: '2024-03-03',
  description: 'Software License',
  amount: 1200,
  type: 'Expense',
  category: 'Software',
  status: 'Pending',
 },
];

export const mockPayments = [
 {
  id: 1,
  date: '2024-03-01',
  amount: 5000,
  method: 'Credit Card',
  status: 'Completed',
  reference: 'PAY-001',
  description: 'Payment for Invoice INV-001',
 },
 {
  id: 2,
  date: '2024-03-02',
  amount: 7500,
  method: 'Bank Transfer',
  status: 'Pending',
  reference: 'PAY-002',
  description: 'Payment for Invoice INV-002',
 },
 {
  id: 3,
  date: '2024-03-03',
  amount: 12000,
  method: 'Credit Card',
  status: 'Failed',
  reference: 'PAY-003',
  description: 'Payment for Invoice INV-003',
 },
];

export const mockPerformanceMetrics = {
 responseTime: 245,
 cpuUsage: 45,
 memoryUsage: 60,
 requestCount: 1250,
 errorRate: 0.5,
 uptime: 99.9,
};

export const mockUsageMetrics = {
 activeUsers: 1250,
 totalSessions: 3500,
 averageSessionDuration: 15,
 peakConcurrentUsers: 450,
 mobileUsers: 750,
 desktopUsers: 500,
 topFeatures: [
  { name: 'Dashboard', usage: 85 },
  { name: 'Projects', usage: 70 },
  { name: 'Tasks', usage: 65 },
  { name: 'Reports', usage: 45 },
 ],
};

export const mockTrendMetrics = {
 revenue: {
  current: 125000,
  previous: 100000,
  change: 25,
 },
 users: {
  current: 5000,
  previous: 4000,
  change: 20,
 },
 engagement: {
  current: 75,
  previous: 65,
  change: 15,
 },
 conversion: {
  current: 12,
  previous: 10,
  change: 20,
 },
 monthlyTrends: [
  {
   month: 'Jan',
   revenue: 100000,
   users: 4000,
   engagement: 65,
   conversion: 10,
  },
  {
   month: 'Feb',
   revenue: 110000,
   users: 4200,
   engagement: 68,
   conversion: 11,
  },
  {
   month: 'Mar',
   revenue: 115000,
   users: 4500,
   engagement: 70,
   conversion: 11.5,
  },
  {
   month: 'Apr',
   revenue: 120000,
   users: 4800,
   engagement: 72,
   conversion: 12,
  },
  {
   month: 'May',
   revenue: 125000,
   users: 5000,
   engagement: 75,
   conversion: 12,
  },
 ],
};

export const mockSystemMetrics = {
 cpu: {
  usage: 45,
  cores: 8,
  temperature: 65,
 },
 memory: {
  total: 16 * 1024 * 1024 * 1024, // 16GB
  used: 10 * 1024 * 1024 * 1024, // 10GB
  free: 6 * 1024 * 1024 * 1024, // 6GB
 },
 disk: {
  total: 500 * 1024 * 1024 * 1024, // 500GB
  used: 300 * 1024 * 1024 * 1024, // 300GB
  free: 200 * 1024 * 1024 * 1024, // 200GB
 },
 network: {
  bytesIn: 1024 * 1024, // 1MB/s
  bytesOut: 512 * 1024, // 512KB/s
  connections: 150,
 },
 alerts: [
  {
   id: '1',
   type: 'warning',
   message: 'High CPU usage detected',
   timestamp: new Date().toISOString(),
  },
  {
   id: '2',
   type: 'info',
   message: 'System backup completed',
   timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
   id: '3',
   type: 'error',
   message: 'Database connection timeout',
   timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
 ],
};

export const mockTeamMetrics = {
 totalMembers: 12,
 activeMembers: 10,
 pendingInvites: 2,
 teamHealth: 95,
};

export const mockTeamMembers = [
 {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  status: 'active',
  joinDate: '2024-01-01',
  lastActive: '2024-03-15 14:30',
 },
 {
  id: '2',
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'manager',
  status: 'active',
  joinDate: '2024-01-15',
  lastActive: '2024-03-15 15:45',
 },
 {
  id: '3',
  name: 'Bob Johnson',
  email: 'bob@example.com',
  role: 'member',
  status: 'inactive',
  joinDate: '2024-02-01',
  lastActive: '2024-03-14 09:15',
 },
];

export const mockTeamRoles = [
 {
  id: '1',
  name: 'Admin',
  description: 'Full system access and control',
  permissions: {
   view_dashboard: true,
   manage_tasks: true,
   manage_projects: true,
   manage_team: true,
   manage_finances: true,
   view_reports: true,
   manage_settings: true,
  },
  memberCount: 2,
 },
 {
  id: '2',
  name: 'Manager',
  description: 'Project and team management',
  permissions: {
   view_dashboard: true,
   manage_tasks: true,
   manage_projects: true,
   manage_team: false,
   manage_finances: false,
   view_reports: true,
   manage_settings: false,
  },
  memberCount: 3,
 },
 {
  id: '3',
  name: 'Member',
  description: 'Basic team member access',
  permissions: {
   view_dashboard: true,
   manage_tasks: true,
   manage_projects: false,
   manage_team: false,
   manage_finances: false,
   view_reports: false,
   manage_settings: false,
  },
  memberCount: 7,
 },
];

export const mockTeamPerformance = {
 averageCompletionRate: 85,
 averageResponseTime: 2.5,
 taskCompletionRate: 90,
 onTimeDelivery: 88,
 memberPerformance: [
  {
   id: '1',
   name: 'John Doe',
   completedTasks: 45,
   totalTasks: 50,
   averageResponseTime: 1.8,
   onTimeDelivery: 95,
  },
  {
   id: '2',
   name: 'Jane Smith',
   completedTasks: 38,
   totalTasks: 40,
   averageResponseTime: 2.2,
   onTimeDelivery: 92,
  },
  {
   id: '3',
   name: 'Bob Johnson',
   completedTasks: 25,
   totalTasks: 30,
   averageResponseTime: 3.1,
   onTimeDelivery: 85,
  },
 ],
};

export const mockTeamSchedules = [
 {
  id: '1',
  title: 'Weekly Team Meeting',
  type: 'meeting',
  startTime: '2024-03-18T10:00:00',
  endTime: '2024-03-18T11:00:00',
  participants: ['John Doe', 'Jane Smith', 'Bob Johnson'],
  status: 'upcoming',
  description: 'Weekly team sync and project updates',
 },
 {
  id: '2',
  title: 'Project Deadline',
  type: 'task',
  startTime: '2024-03-20T17:00:00',
  endTime: '2024-03-20T17:00:00',
  participants: ['John Doe', 'Jane Smith'],
  status: 'upcoming',
  description: 'Final project delivery deadline',
 },
 {
  id: '3',
  title: 'Client Presentation',
  type: 'event',
  startTime: '2024-03-22T14:00:00',
  endTime: '2024-03-22T15:30:00',
  participants: ['John Doe', 'Jane Smith', 'Bob Johnson'],
  status: 'upcoming',
  description: 'Quarterly client review presentation',
 },
];

export const mockDocumentMetrics = {
 totalDocuments: 156,
 recentUploads: 12,
 sharedDocuments: 45,
 storageUsed: 2.4,
};

export const mockDocuments = [
 {
  id: '1',
  title: 'Project Proposal',
  type: 'document',
  size: '2.4 MB',
  lastModified: '2024-03-15T10:30:00Z',
  owner: 'John Doe',
  shared: true,
  category: 'Projects',
  tags: ['proposal', 'project', 'important'],
 },
 {
  id: '2',
  title: 'Q1 Financial Report',
  type: 'spreadsheet',
  size: '1.8 MB',
  lastModified: '2024-03-14T15:45:00Z',
  owner: 'Jane Smith',
  shared: false,
  category: 'Finance',
  tags: ['finance', 'report', 'Q1'],
 },
 // Add more mock documents as needed
];

export const mockDocumentCategories = [
 {
  id: '1',
  name: 'Projects',
  documentCount: 45,
  icon: 'FolderIcon',
 },
 {
  id: '2',
  name: 'Finance',
  documentCount: 32,
  icon: 'FolderIcon',
 },
 {
  id: '3',
  name: 'HR',
  documentCount: 28,
  icon: 'FolderIcon',
 },
 {
  id: '4',
  name: 'Legal',
  documentCount: 15,
  icon: 'FolderIcon',
 },
];

export const mockRecentActivity = [
 {
  id: '1',
  type: 'upload',
  document: 'Project Proposal',
  user: 'John Doe',
  timestamp: '2024-03-15T10:30:00Z',
 },
 {
  id: '2',
  type: 'share',
  document: 'Q1 Financial Report',
  user: 'Jane Smith',
  timestamp: '2024-03-14T15:45:00Z',
 },
 // Add more mock activities as needed
]; 