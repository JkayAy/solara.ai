import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart2,
  Lightbulb,
  Menu,
  Inbox,
  Bot,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Inbox',
    href: '/dashboard/inbox',
    icon: Inbox
  },
  {
    name: 'AI Command',
    href: '/dashboard/ai-command',
    icon: Bot
  },
  {
    name: 'Proposals',
    href: '/dashboard/proposals',
    icon: FileText
  },
  {
    name: 'Clients',
    href: '/dashboard/clients',
    icon: Users
  },
  {
    name: 'Insights',
    href: '/dashboard/insights',
    icon: Lightbulb
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex h-[calc(100vh-4rem)] flex-col border-r bg-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
      }`}>
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <BarChart2 className="h-6 w-6" />
          {!isCollapsed && <span>Solara</span>}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-md"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 