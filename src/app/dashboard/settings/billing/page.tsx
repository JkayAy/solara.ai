'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 CreditCardIcon,
 BanknotesIcon,
 ReceiptRefundIcon,
 ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function BillingSettingsPage() {
 const [billingSettings, setBillingSettings] = useState({
  currentPlan: 'Pro',
  nextBillingDate: '2024-04-15',
  paymentMethod: {
   type: 'credit_card',
   last4: '4242',
   expiry: '12/25',
   brand: 'Visa',
  },
  billingHistory: [
   {
    date: '2024-03-15',
    amount: 29.99,
    status: 'paid',
    invoice: 'INV-2024-001',
   },
   {
    date: '2024-02-15',
    amount: 29.99,
    status: 'paid',
    invoice: 'INV-2024-002',
   },
   {
    date: '2024-01-15',
    amount: 29.99,
    status: 'paid',
    invoice: 'INV-2024-003',
   },
  ],
 });

 const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
   year: 'numeric',
   month: 'long',
   day: 'numeric',
  });
 };

 const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
  }).format(amount);
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Billing Settings"
     description="Manage your subscription and payment methods"
    />
    <BackButton href="/dashboard/settings" label="Back to Settings" />
   </div>

   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    {/* Current Plan */}
    <div className="p-6 border-b border-gray-200">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <ChartBarIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
       <p className="mt-1 text-sm text-gray-500">
        Manage your subscription and billing cycle
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div className="flex items-center justify-between">
       <div>
        <h3 className="text-sm font-medium text-gray-900">Plan</h3>
        <p className="text-sm text-gray-500">{billingSettings.currentPlan}</p>
       </div>
       <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
        Change Plan
       </button>
      </div>

      <div>
       <h3 className="text-sm font-medium text-gray-900">Next Billing Date</h3>
       <p className="text-sm text-gray-500">
        {formatDate(billingSettings.nextBillingDate)}
       </p>
      </div>
     </div>
    </div>

    {/* Payment Method */}
    <div className="p-6 border-b border-gray-200">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <CreditCardIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
       <p className="mt-1 text-sm text-gray-500">
        Manage your payment methods and billing information
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div className="flex items-center justify-between">
       <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-100 rounded-lg">
         <CreditCardIcon className="h-5 w-5 text-gray-600" />
        </div>
        <div>
         <p className="text-sm font-medium text-gray-900">
          {billingSettings.paymentMethod.brand} ending in{' '}
          {billingSettings.paymentMethod.last4}
         </p>
         <p className="text-sm text-gray-500">
          Expires {billingSettings.paymentMethod.expiry}
         </p>
        </div>
       </div>
       <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
        Update
       </button>
      </div>
     </div>
    </div>

    {/* Billing History */}
    <div className="p-6">
     <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
       <BanknotesIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Billing History</h2>
       <p className="mt-1 text-sm text-gray-500">
        View your past invoices and payment history
       </p>
      </div>
     </div>

     <div className="space-y-4">
      {billingSettings.billingHistory.map((invoice, index) => (
       <div
        key={index}
        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
       >
        <div>
         <p className="text-sm font-medium text-gray-900">
          Invoice {invoice.invoice}
         </p>
         <p className="text-sm text-gray-500">{formatDate(invoice.date)}</p>
        </div>
        <div className="flex items-center space-x-4">
         <p className="text-sm font-medium text-gray-900">
          {formatCurrency(invoice.amount)}
         </p>
         <button className="text-sm text-primary hover:text-primary-dark">
          Download
         </button>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Additional Actions */}
   <div className="flex justify-end space-x-4">
    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
     <ReceiptRefundIcon className="h-5 w-5 mr-2" />
     Request Refund
    </button>
    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
     Save Changes
    </button>
   </div>
  </div>
 );
} 