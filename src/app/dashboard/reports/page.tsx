import { getReportCategories, getRecentReports } from '@/lib/data';
import { ReportCategories } from './components/ReportCategories';
import { RecentReports } from './components/RecentReports';
import { QuickActions } from './components/QuickActions';

export default async function ReportsPage() {
 // Fetch data on the server
 const [categories, recentReports] = await Promise.all([
  getReportCategories(),
  getRecentReports(),
 ]);

 return (
  <div className="py-6">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
   </div>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div className="py-4">
     <ReportCategories categories={categories} />
    </div>

    <RecentReports reports={recentReports} />

    <QuickActions />
   </div>
  </div>
 );
} 