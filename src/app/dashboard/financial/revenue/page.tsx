'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import {
 CurrencyDollarIcon,
 ArrowTrendingUpIcon,
 ArrowTrendingDownIcon,
 BanknotesIcon,
 CreditCardIcon,
 ChartBarIcon,
 CalendarIcon,
 DocumentTextIcon,
 PlusIcon,
 ArrowPathIcon,
 ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function RevenuePage() {
 const [selectedPeriod, setSelectedPeriod] = useState('month');
 const [selectedView, setSelectedView] = useState('overview');

 const [revenueStats, setRevenueStats] = useState({
  totalRevenue: '$12,450.00',
  monthlyGrowth: '+15.3%',
  projectedRevenue: '$15,200.00',
  outstandingInvoices: '$3,250.00',
  averageInvoiceValue: '$850.00',
  recurringRevenue: '$8,500.00',
 });

 const [revenueSources, setRevenueSources] = useState([
  {
   id: '1',
   name: 'Consulting Services',
   amount: '$5,200.00',
   percentage: 42,
   trend: 'up',
   growth: '+12%',
  },
  {
   id: '2',
   name: 'Product Sales',
   amount: '$3,800.00',
   percentage: 30,
   trend: 'up',
   growth: '+8%',
  },
  {
   id: '3',
   name: 'Subscriptions',
   amount: '$2,450.00',
   percentage: 20,
   trend: 'up',
   growth: '+15%',
  },
  {
   id: '4',
   name: 'Other Income',
   amount: '$1,000.00',
   percentage: 8,
   trend: 'down',
   growth: '-3%',
  },
 ]);

 const [recentTransactions, setRecentTransactions] = useState([
  {
   id: '1',
   description: 'Website Development',
   amount: '$2,500.00',
   date: '2024-03-20',
   status: 'completed',
   type: 'income',
   client: 'Acme Corp',
  },
  {
   id: '2',
   description: 'Monthly Subscription',
   amount: '$299.00',
   date: '2024-03-19',
   status: 'completed',
   type: 'income',
   client: 'TechStart Inc',
  },
  {
   id: '3',
   description: 'Consulting Services',
   amount: '$1,200.00',
   date: '2024-03-18',
   status: 'pending',
   type: 'income',
   client: 'Global Solutions',
  },
 ]);

 const [upcomingPayments, setUpcomingPayments] = useState([
  {
   id: '1',
   description: 'Project Milestone Payment',
   amount: '$3,000.00',
   dueDate: '2024-03-25',
   client: 'Innovation Labs',
   status: 'scheduled',
  },
  {
   id: '2',
   description: 'Monthly Retainer',
   amount: '$1,500.00',
   dueDate: '2024-03-28',
   client: 'Digital Creations',
   status: 'scheduled',
  },
 ]);

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Revenue Management"
     description="Track and manage your business revenue"
    />
    <div className="flex items-center space-x-4">
     <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
      <PlusIcon className="h-5 w-5 mr-2" />
      New Invoice
     </button>
    </div>
   </div>

   {/* Quick Stats */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
     <div className="flex items-center">
      <div className="p-3 bg-green-100 rounded-lg">
       <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500">Total Revenue</p>
       <p className="text-lg font-semibold text-gray-900">{revenueStats.totalRevenue}</p>
       <p className="text-sm text-green-600 flex items-center">
        <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
        {revenueStats.monthlyGrowth}
       </p>
      </div>
     </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm p-6">
     <div className="flex items-center">
      <div className="p-3 bg-blue-100 rounded-lg">
       <ChartBarIcon className="h-6 w-6 text-blue-600" />
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500">Projected Revenue</p>
       <p className="text-lg font-semibold text-gray-900">{revenueStats.projectedRevenue}</p>
       <p className="text-sm text-blue-600">Next 30 days</p>
      </div>
     </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm p-6">
     <div className="flex items-center">
      <div className="p-3 bg-yellow-100 rounded-lg">
       <DocumentTextIcon className="h-6 w-6 text-yellow-600" />
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500">Outstanding Invoices</p>
       <p className="text-lg font-semibold text-gray-900">{revenueStats.outstandingInvoices}</p>
       <p className="text-sm text-yellow-600">Requires attention</p>
      </div>
     </div>
    </div>
   </div>

   {/* Revenue Sources and Transactions */}
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Revenue Sources */}
    <div className="lg:col-span-1">
     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
       <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Sources</h2>
       <div className="space-y-4">
        {revenueSources.map((source) => (
         <div key={source.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
           <div>
            <h3 className="text-sm font-medium text-gray-900">{source.name}</h3>
            <p className="text-sm text-gray-500">{source.amount}</p>
           </div>
           <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{source.percentage}%</p>
            <p className={`text-sm flex items-center ${source.trend === 'up' ? 'text-green-600' : 'text-red-600'
             }`}>
             {source.trend === 'up' ? (
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
             ) : (
              <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
             )}
             {source.growth}
            </p>
           </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
           <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${source.percentage}%` }}
           />
          </div>
         </div>
        ))}
       </div>
      </div>
     </div>

     {/* Upcoming Payments */}
     <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
      <div className="p-6">
       <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Payments</h2>
       <div className="space-y-4">
        {upcomingPayments.map((payment) => (
         <div key={payment.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
           <div>
            <h3 className="text-sm font-medium text-gray-900">{payment.description}</h3>
            <p className="text-sm text-gray-500">{payment.client}</p>
           </div>
           <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{payment.amount}</p>
            <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
           </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {payment.status}
           </span>
           <button className="text-sm text-primary hover:text-primary-dark">
            View Details
           </button>
          </div>
         </div>
        ))}
       </div>
      </div>
     </div>
    </div>

    {/* Recent Transactions */}
    <div className="lg:col-span-2">
     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
       <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
        <div className="flex items-center space-x-2">
         <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Filter
         </button>
         <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Refresh
         </button>
        </div>
       </div>
       <div className="space-y-4">
        {recentTransactions.map((transaction) => (
         <div key={transaction.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
           <div>
            <h3 className="text-sm font-medium text-gray-900">{transaction.description}</h3>
            <p className="text-sm text-gray-500">{transaction.client}</p>
           </div>
           <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{transaction.amount}</p>
            <p className="text-sm text-gray-500">{transaction.date}</p>
           </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'completed'
             ? 'bg-green-100 text-green-800'
             : 'bg-yellow-100 text-yellow-800'
            }`}>
            {transaction.status}
           </span>
           <div className="flex items-center space-x-2">
            <button className="text-sm text-primary hover:text-primary-dark">
             View Details
            </button>
            <button className="text-sm text-primary hover:text-primary-dark">
             Download
            </button>
           </div>
          </div>
         </div>
        ))}
       </div>
      </div>
     </div>

     {/* Revenue Insights */}
     <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
      <div className="p-6">
       <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Insights</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
         <div className="flex items-center justify-between">
          <div>
           <p className="text-sm font-medium text-gray-500">Average Invoice Value</p>
           <p className="text-lg font-semibold text-gray-900">{revenueStats.averageInvoiceValue}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
           <BanknotesIcon className="h-6 w-6 text-green-600" />
          </div>
         </div>
        </div>
        <div className="p-4 border rounded-lg">
         <div className="flex items-center justify-between">
          <div>
           <p className="text-sm font-medium text-gray-500">Recurring Revenue</p>
           <p className="text-lg font-semibold text-gray-900">{revenueStats.recurringRevenue}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
           <CreditCardIcon className="h-6 w-6 text-blue-600" />
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* New Invoice Modal (to be implemented) */}
   {/* Transaction Details Modal (to be implemented) */}
   {/* Payment Details Modal (to be implemented) */}
  </div>
 );
} 