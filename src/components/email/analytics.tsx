import { useState, useEffect } from 'react';
import { Mail, Clock, Users, TrendingUp, AlertCircle, FileText } from 'lucide-react';

interface EmailAnalytics {
 totalEmails: number;
 unreadCount: number;
 responseTime: number;
 topSenders: Array<{ name: string; count: number }>;
 emailByTime: Array<{ hour: number; count: number }>;
 emailByType: Array<{ type: string; count: number }>;
 averageResponseTime: number;
 busiestDay: string;
 busiestHour: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function EmailAnalytics() {
 const [analytics, setAnalytics] = useState<EmailAnalytics>({
  totalEmails: 0,
  unreadCount: 0,
  responseTime: 0,
  topSenders: [],
  emailByTime: [],
  emailByType: [],
  averageResponseTime: 0,
  busiestDay: '',
  busiestHour: 0,
 });

 useEffect(() => {
  // In a real application, this would fetch data from your API
  // For now, we'll use mock data
  const mockAnalytics: EmailAnalytics = {
   totalEmails: 1245,
   unreadCount: 23,
   responseTime: 45,
   topSenders: [
    { name: 'John Doe', count: 45 },
    { name: 'Jane Smith', count: 38 },
    { name: 'Team Updates', count: 32 },
    { name: 'Client Support', count: 28 },
    { name: 'Newsletter', count: 25 },
   ],
   emailByTime: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: Math.floor(Math.random() * 50),
   })),
   emailByType: [
    { type: 'Work', count: 450 },
    { type: 'Personal', count: 300 },
    { type: 'Newsletter', count: 250 },
    { type: 'Updates', count: 150 },
    { type: 'Other', count: 95 },
   ],
   averageResponseTime: 2.5,
   busiestDay: 'Wednesday',
   busiestHour: 14,
  };

  setAnalytics(mockAnalytics);
 }, []);

 const stats = [
  {
   title: 'Total Emails',
   value: analytics.totalEmails,
   icon: Mail,
   change: '+12%',
  },
  {
   title: 'Unread',
   value: analytics.unreadCount,
   icon: AlertCircle,
   change: '-5%',
  },
  {
   title: 'Avg. Response Time',
   value: `${analytics.averageResponseTime}h`,
   icon: Clock,
   change: '-15%',
  },
  {
   title: 'Active Contacts',
   value: analytics.topSenders.length,
   icon: Users,
   change: '+8%',
  },
 ];

 const maxEmailCount = Math.max(...analytics.emailByTime.map(item => item.count));

 return (
  <div className="space-y-6">
   {/* Stats Overview */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((stat) => (
     <div
      key={stat.title}
      className="bg-card rounded-lg p-4 border shadow-sm"
     >
      <div className="flex items-center justify-between">
       <div>
        <p className="text-sm text-muted-foreground">{stat.title}</p>
        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
       </div>
       <div className="p-2 bg-primary/10 rounded-lg">
        <stat.icon className="w-5 h-5 text-primary" />
       </div>
      </div>
      <p className="text-sm text-green-500 mt-2">{stat.change} from last week</p>
     </div>
    ))}
   </div>

   {/* Charts */}
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Email Volume by Time */}
    <div className="bg-card rounded-lg p-4 border shadow-sm">
     <h3 className="text-lg font-semibold mb-4">Email Volume by Hour</h3>
     <div className="h-[300px] flex items-end gap-1">
      {analytics.emailByTime.map((item) => (
       <div
        key={item.hour}
        className="flex-1 flex flex-col items-center"
       >
        <div
         className="w-full bg-primary/20 hover:bg-primary/30 transition-colors rounded-t"
         style={{
          height: `${(item.count / maxEmailCount) * 100}%`,
         }}
        />
        <span className="text-xs text-muted-foreground mt-1">
         {item.hour}:00
        </span>
       </div>
      ))}
     </div>
    </div>

    {/* Email Types Distribution */}
    <div className="bg-card rounded-lg p-4 border shadow-sm">
     <h3 className="text-lg font-semibold mb-4">Email Types</h3>
     <div className="space-y-4">
      {analytics.emailByType.map((type, index) => (
       <div key={type.type} className="space-y-2">
        <div className="flex items-center justify-between">
         <span className="text-sm font-medium">{type.type}</span>
         <span className="text-sm text-muted-foreground">
          {type.count} emails
         </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
         <div
          className="h-full rounded-full"
          style={{
           width: `${(type.count / analytics.totalEmails) * 100}%`,
           backgroundColor: COLORS[index % COLORS.length],
          }}
         />
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Top Senders */}
   <div className="bg-card rounded-lg p-4 border shadow-sm">
    <h3 className="text-lg font-semibold mb-4">Top Senders</h3>
    <div className="space-y-4">
     {analytics.topSenders.map((sender, index) => (
      <div
       key={sender.name}
       className="flex items-center justify-between"
      >
       <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
         <Users className="w-4 h-4 text-primary" />
        </div>
        <div>
         <p className="font-medium">{sender.name}</p>
         <p className="text-sm text-muted-foreground">
          {sender.count} emails
         </p>
        </div>
       </div>
       <div className="text-sm text-muted-foreground">
        {((sender.count / analytics.totalEmails) * 100).toFixed(1)}%
       </div>
      </div>
     ))}
    </div>
   </div>

   {/* Insights */}
   <div className="bg-card rounded-lg p-4 border shadow-sm">
    <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
    <div className="space-y-4">
     <div className="flex items-start gap-3">
      <Clock className="w-5 h-5 text-primary mt-1" />
      <div>
       <p className="font-medium">Best Response Time</p>
       <p className="text-sm text-muted-foreground">
        Your average response time is {analytics.averageResponseTime} hours,
        which is faster than 75% of your peers.
       </p>
      </div>
     </div>
     <div className="flex items-start gap-3">
      <TrendingUp className="w-5 h-5 text-primary mt-1" />
      <div>
       <p className="font-medium">Peak Activity</p>
       <p className="text-sm text-muted-foreground">
        {analytics.busiestDay} at {analytics.busiestHour}:00 is your busiest
        time. Consider scheduling important emails around this time.
       </p>
      </div>
     </div>
     <div className="flex items-start gap-3">
      <FileText className="w-5 h-5 text-primary mt-1" />
      <div>
       <p className="font-medium">Email Organization</p>
       <p className="text-sm text-muted-foreground">
        You have {analytics.unreadCount} unread emails. Consider using
        filters and labels to better organize your inbox.
       </p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 