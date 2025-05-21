export interface ReportCategory {
 id: string;
 title: string;
 description: string;
 icon: string;
 href: string;
}

export interface RecentReport {
 id: string;
 title: string;
 type: string;
 status: string;
 generatedAt: string;
}

export async function getReportCategories(): Promise<ReportCategory[]> {
 // This would typically fetch from an API
 return [
  {
   id: '1',
   title: 'Performance Reports',
   description: 'System performance metrics and analysis',
   icon: 'ChartBarIcon',
   href: '/dashboard/reports/performance',
  },
  {
   id: '2',
   title: 'Usage Reports',
   description: 'System usage statistics and trends',
   icon: 'ChartPieIcon',
   href: '/dashboard/reports/usage',
  },
  {
   id: '3',
   title: 'Error Reports',
   description: 'System errors and exceptions',
   icon: 'ExclamationTriangleIcon',
   href: '/dashboard/reports/errors',
  },
  {
   id: '4',
   title: 'Audit Reports',
   description: 'System audit logs and activities',
   icon: 'DocumentTextIcon',
   href: '/dashboard/reports/audit',
  },
 ];
}

export async function getRecentReports(): Promise<RecentReport[]> {
 // This would typically fetch from an API
 return [
  {
   id: '1',
   title: 'Monthly Performance Report',
   type: 'Performance',
   status: 'Completed',
   generatedAt: '2024-03-15',
  },
  {
   id: '2',
   title: 'Weekly Usage Report',
   type: 'Usage',
   status: 'Completed',
   generatedAt: '2024-03-14',
  },
  {
   id: '3',
   title: 'Error Analysis Report',
   type: 'Error',
   status: 'In Progress',
   generatedAt: '2024-03-13',
  },
 ];
} 