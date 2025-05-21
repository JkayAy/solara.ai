'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';
import { Modal } from '@/components/ui/modal';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import { validate, rules } from '@/lib/validation';
import { DocumentTextIcon, CurrencyDollarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Invoice {
 id: number;
 number: string;
 client: string;
 amount: number;
 status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
 dueDate: string;
 issueDate: string;
}

interface InvoiceForm {
 client: string;
 amount: number;
 dueDate: string;
 description: string;
}

const invoiceValidationRules = {
 client: [rules.required()],
 amount: [rules.required(), rules.number(), rules.min(0)],
 dueDate: [rules.required()],
 description: [rules.required(), rules.minLength(10)],
};

export default function InvoicingPage() {
 const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
 const [formData, setFormData] = useState<InvoiceForm>({
  client: '',
  amount: 0,
  dueDate: '',
  description: '',
 });
 const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

 const { data: invoices, loading, error, refetch } = useData<Invoice[]>(
  () => api.financial.invoices.list()
 );

 const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormErrors({});

  try {
   validate(formData, invoiceValidationRules);
   await api.financial.invoices.create(formData);
   setShowNewInvoiceModal(false);
   refetch();
  } catch (error) {
   if (error instanceof Error) {
    setFormErrors({ general: [error.message] });
   }
  }
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
 };

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
    <PageHeader title="Invoicing" backHref="/dashboard/financial">
     <button
      type="button"
      onClick={() => setShowNewInvoiceModal(true)}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     >
      Create Invoice
     </button>
    </PageHeader>

    {/* Invoice Overview */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <MetricsCard
      title="Total Invoiced"
      value="$45,000"
      icon={CurrencyDollarIcon}
     />
     <MetricsCard
      title="Pending Invoices"
      value="12"
      icon={ClockIcon}
     />
     <MetricsCard
      title="Paid Invoices"
      value="28"
      icon={CheckCircleIcon}
     />
     <MetricsCard
      title="Overdue Invoices"
      value="3"
      icon={DocumentTextIcon}
     />
    </div>

    {/* Invoice List */}
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
     <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Recent Invoices
      </h3>
     </div>
     <ul role="list" className="divide-y divide-gray-200">
      {invoices?.map((invoice) => (
       <li key={invoice.id}>
        <div className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
           <p className="text-sm font-medium text-indigo-600 truncate">
            Invoice #{invoice.number}
           </p>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
           <p
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'Paid'
              ? 'bg-green-100 text-green-800'
              : invoice.status === 'Overdue'
               ? 'bg-red-100 text-red-800'
               : invoice.status === 'Sent'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
             }`}
           >
            {invoice.status}
           </p>
          </div>
         </div>
         <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
           <p className="flex items-center text-sm text-gray-500">
            Client: {invoice.client}
           </p>
           <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
            Due Date: {invoice.dueDate}
           </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
           <p>Amount: ${invoice.amount.toFixed(2)}</p>
          </div>
         </div>
        </div>
       </li>
      ))}
     </ul>
    </div>
   </div>

   {/* New Invoice Modal */}
   <Modal
    isOpen={showNewInvoiceModal}
    onClose={() => setShowNewInvoiceModal(false)}
    title="Create New Invoice"
   >
    <form onSubmit={handleFormSubmit} className="space-y-4">
     {formErrors.general && (
      <div className="text-red-600 text-sm">
       {formErrors.general.map((error, index) => (
        <p key={index}>{error}</p>
       ))}
      </div>
     )}
     <div>
      <label htmlFor="client" className="block text-sm font-medium text-gray-700">
       Client
      </label>
      <input
       type="text"
       name="client"
       id="client"
       value={formData.client}
       onChange={handleInputChange}
       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {formErrors.client && (
       <p className="mt-1 text-sm text-red-600">{formErrors.client[0]}</p>
      )}
     </div>
     <div>
      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
       Amount
      </label>
      <input
       type="number"
       name="amount"
       id="amount"
       value={formData.amount}
       onChange={handleInputChange}
       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {formErrors.amount && (
       <p className="mt-1 text-sm text-red-600">{formErrors.amount[0]}</p>
      )}
     </div>
     <div>
      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
       Due Date
      </label>
      <input
       type="date"
       name="dueDate"
       id="dueDate"
       value={formData.dueDate}
       onChange={handleInputChange}
       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {formErrors.dueDate && (
       <p className="mt-1 text-sm text-red-600">{formErrors.dueDate[0]}</p>
      )}
     </div>
     <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
       Description
      </label>
      <textarea
       name="description"
       id="description"
       rows={3}
       value={formData.description}
       onChange={handleInputChange}
       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {formErrors.description && (
       <p className="mt-1 text-sm text-red-600">{formErrors.description[0]}</p>
      )}
     </div>
     <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
      <button
       type="submit"
       className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
      >
       Create Invoice
      </button>
      <button
       type="button"
       onClick={() => setShowNewInvoiceModal(false)}
       className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
      >
       Cancel
      </button>
     </div>
    </form>
   </Modal>
  </div>
 );
} 