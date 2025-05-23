'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';
import { Modal } from '@/components/ui/modal';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import { validate, rules } from '@/lib/validation';
import {
 DocumentTextIcon,
  CalculatorIcon,
 CreditCardIcon,
 ChartBarIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/outline';

interface FinancialMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pendingInvoices: number;
}

const financialFeatures = [
 {
  title: 'Invoicing',
    description: 'Create and manage invoices',
  icon: DocumentTextIcon,
    href: '/dashboard/financial/invoicing',
 },
 {
  title: 'Accounting',
    description: 'Track financial transactions',
    icon: CalculatorIcon,
  href: '/dashboard/financial/accounting',
 },
 {
  title: 'Payments',
    description: 'Process and track payments',
  icon: CreditCardIcon,
  href: '/dashboard/financial/payments',
 },
 {
  title: 'Revenue',
    description: 'View revenue analytics',
    icon: ChartBarIcon,
  href: '/dashboard/financial/revenue',
 },
];

export default function FinancialPage() {
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [showGenerateReportModal, setShowGenerateReportModal] = useState(false);

  const { data: metrics, loading, error } = useData<FinancialMetrics>(
    () => api.financial.getMetrics()
  );

  if (loading) {
 return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
   </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">
          Error: {error.message}
        </div>
       </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <PageHeader title="Financial Management">
          <div className="flex space-x-4">
      <button
       type="button"
              onClick={() => setShowCreateInvoiceModal(true)}
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Invoice
      </button>
      <button
       type="button"
              onClick={() => setShowRecordPaymentModal(true)}
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
              <DocumentPlusIcon className="h-5 w-5 mr-2" />
       Record Payment
      </button>
      <button
       type="button"
              onClick={() => setShowGenerateReportModal(true)}
       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
       Generate Report
      </button>
     </div>
        </PageHeader>

        {/* Financial Overview */}
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Total Revenue"
            value={`$${metrics?.totalRevenue.toLocaleString()}`}
            icon={ChartBarIcon}
          />
          <MetricsCard
            title="Total Expenses"
            value={`$${metrics?.totalExpenses.toLocaleString()}`}
            icon={CalculatorIcon}
          />
          <MetricsCard
            title="Net Profit"
            value={`$${metrics?.netProfit.toLocaleString()}`}
            icon={DocumentTextIcon}
          />
          <MetricsCard
            title="Pending Invoices"
            value={metrics?.pendingInvoices.toString() || '0'}
            icon={CreditCardIcon}
          />
    </div>

        {/* Financial Features */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {financialFeatures.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
    <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Create Invoice Modal */}
      <Modal
        isOpen={showCreateInvoiceModal}
        onClose={() => setShowCreateInvoiceModal(false)}
        title="Create New Invoice"
      >
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Redirecting to the invoicing page...
          </p>
          <div className="mt-4">
            <Link
              href="/dashboard/financial/invoicing"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Invoicing
            </Link>
          </div>
         </div>
      </Modal>

      {/* Record Payment Modal */}
      <Modal
        isOpen={showRecordPaymentModal}
        onClose={() => setShowRecordPaymentModal(false)}
        title="Record New Payment"
      >
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Redirecting to the payments page...
          </p>
          <div className="mt-4">
            <Link
              href="/dashboard/financial/payments"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Payments
            </Link>
          </div>
        </div>
      </Modal>

      {/* Generate Report Modal */}
      <Modal
        isOpen={showGenerateReportModal}
        onClose={() => setShowGenerateReportModal(false)}
        title="Generate Financial Report"
      >
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Select the type of report you want to generate:
          </p>
          <div className="mt-4 space-y-4">
            <button
              type="button"
              onClick={() => {
                setShowGenerateReportModal(false);
                // Add report generation logic here
              }}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Monthly Report
            </button>
            <button
              type="button"
              onClick={() => {
                setShowGenerateReportModal(false);
                // Add report generation logic here
              }}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Quarterly Report
            </button>
            <button
              type="button"
              onClick={() => {
                setShowGenerateReportModal(false);
                // Add report generation logic here
              }}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Annual Report
            </button>
         </div>
        </div>
      </Modal>
  </div>
 );
} 