'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';
import { Modal } from '@/components/ui/modal';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import { validate, rules } from '@/lib/validation';
import { CreditCardIcon, BanknotesIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Payment {
 id: number;
 date: string;
 amount: number;
 method: 'Credit Card' | 'Bank Transfer' | 'Cash';
 status: 'Pending' | 'Completed' | 'Failed';
 reference: string;
 description: string;
}

interface PaymentForm {
 amount: number;
 method: 'Credit Card' | 'Bank Transfer' | 'Cash';
 reference: string;
 description: string;
}

const paymentValidationRules = {
 amount: [rules.required(), rules.number(), rules.min(0)],
 method: [rules.required()],
 reference: [rules.required()],
 description: [rules.required(), rules.minLength(5)],
};

export default function PaymentsPage() {
 const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
 const [formData, setFormData] = useState<PaymentForm>({
  amount: 0,
  method: 'Credit Card',
  reference: '',
  description: '',
 });
 const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

 const { data: payments, loading, error, refetch } = useData<Payment[]>(
  () => api.financial.payments.list()
 );

 const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormErrors({});

  try {
   validate(formData, paymentValidationRules);
   await api.financial.payments.create(formData);
   setShowNewPaymentModal(false);
   refetch();
  } catch (error) {
   if (error instanceof Error) {
    setFormErrors({ general: [error.message] });
   }
  }
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    <PageHeader title="Payments" backHref="/dashboard/financial">
     <button
      type="button"
      onClick={() => setShowNewPaymentModal(true)}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     >
      Record Payment
     </button>
    </PageHeader>

    {/* Payment Overview */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <MetricsCard
      title="Total Payments"
      value="$75,000"
      icon={BanknotesIcon}
     />
     <MetricsCard
      title="Pending Payments"
      value="8"
      icon={ClockIcon}
     />
     <MetricsCard
      title="Completed Payments"
      value="42"
      icon={CheckCircleIcon}
     />
     <MetricsCard
      title="Failed Payments"
      value="2"
      icon={CreditCardIcon}
     />
    </div>

    {/* Payment List */}
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
     <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Recent Payments
      </h3>
     </div>
     <ul role="list" className="divide-y divide-gray-200">
      {payments?.map((payment) => (
       <li key={payment.id}>
        <div className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
           <p className="text-sm font-medium text-indigo-600 truncate">
            {payment.reference}
           </p>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
           <p
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : payment.status === 'Failed'
               ? 'bg-red-100 text-red-800'
               : 'bg-yellow-100 text-yellow-800'
             }`}
           >
            {payment.status}
           </p>
          </div>
         </div>
         <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
           <p className="flex items-center text-sm text-gray-500">
            Method: {payment.method}
           </p>
           <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
            Date: {payment.date}
           </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
           <p>Amount: ${payment.amount.toFixed(2)}</p>
          </div>
         </div>
         <div className="mt-2">
          <p className="text-sm text-gray-500">{payment.description}</p>
         </div>
        </div>
       </li>
      ))}
     </ul>
    </div>
   </div>

   {/* New Payment Modal */}
   <Modal
    isOpen={showNewPaymentModal}
    onClose={() => setShowNewPaymentModal(false)}
    title="Record New Payment"
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
      <label htmlFor="method" className="block text-sm font-medium text-gray-700">
       Payment Method
      </label>
      <select
       name="method"
       id="method"
       value={formData.method}
       onChange={handleInputChange}
       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
       <option value="Credit Card">Credit Card</option>
       <option value="Bank Transfer">Bank Transfer</option>
       <option value="Cash">Cash</option>
      </select>
      {formErrors.method && (
       <p className="mt-1 text-sm text-red-600">{formErrors.method[0]}</p>
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
      <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
       Reference Number
      </label>
      <input
       type="text"
       name="reference"
       id="reference"
       value={formData.reference}
       onChange={handleInputChange}
       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {formErrors.reference && (
       <p className="mt-1 text-sm text-red-600">{formErrors.reference[0]}</p>
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
       Record Payment
      </button>
      <button
       type="button"
       onClick={() => setShowNewPaymentModal(false)}
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