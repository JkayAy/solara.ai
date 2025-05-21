'use client';

import {
 ChartBarIcon,
 ChartLineIcon,
 ChartPieIcon,
 DocumentTextIcon,
 DocumentReportIcon,
 ClockIcon,
 ArrowDownTrayIcon,
 CalendarIcon,
} from '@heroicons/react/24/outline';

export const IconMap = {
 ChartBar: ChartBarIcon,
 ChartLine: ChartLineIcon,
 ChartPie: ChartPieIcon,
 DocumentText: DocumentTextIcon,
 DocumentReport: DocumentReportIcon,
 Clock: ClockIcon,
 ArrowDownTray: ArrowDownTrayIcon,
 Calendar: CalendarIcon,
} as const;

export type IconName = keyof typeof IconMap; 