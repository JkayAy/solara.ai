'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MetricsCard } from '@/components/ui/metrics-card';
import { Modal } from '@/components/ui/modal';
import { useData } from '@/hooks/useData';
import { api } from '@/lib/api';
import { validate, rules } from '@/lib/validation';
import { CalculatorIcon, DocumentTextIcon, ChartBarIcon, BanknotesIcon } from '@heroicons/react/24/outline';

interface Transaction {
 id: number;
 date: string;
 description: string;
 amount: number;
 type: 'Income' | 'Expense';
 category: string;
 status: 'Pending' | 'Completed' | 'Reconciled';
}

interface TransactionForm {
 description: string;
 amount: number;
 type: 'Income' | 'Expense';
 category: string;
 date: string;
}

const transactionValidationRules = {
 description: [rules.required(), rules.minLength(5)],
 amount: [rules.required(), rules.number(), rules.min(0)],
 type: [rules.required()],
 category: [rules.required()],
 date: [rules.required()],
};

export default function AccountingPage() {
 const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
 const [formData, setFormData] = useState<TransactionForm>({
  description: '',
  amount: 0,
  type: 'Income',
  category: '',
  date: '',
 });
 const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

 const { data: transactions, loading, error, refetch } = useData<Transaction[]>(
  () => api.financial.transactions.list()
 );

 const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormErrors({});

  try {
   validate(formData, transactionValidationRules);
   await api.financial.transactions.create(formData);
   setShowNewTransactionModal(false);
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
    <PageHeader title="Accounting" backHref="/dashboard/financial">
     <button
      type="button"
      onClick={() => setShowNewTransactionModal(true)}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
     >
      Record Transaction
     </button>
    </PageHeader>

    {/* Financial Overview */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
     <MetricsCard
      title="Total Income"
      value="$125,000"
      icon={BanknotesIcon}
     />
     <MetricsCard
      title="Total Expenses"
      value="$85,000"
      icon={CalculatorIcon}
     />
     <MetricsCard
      title="Net Profit"
      value="$40,000"
      icon={ChartBarIcon}
     />
     <MetricsCard
      title="Pending Transactions"
      value="15"
      icon={DocumentTextIcon}
     />
    </div>

    {/* Transaction List */}
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
     <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
       Recent Transactions
      </h3>
     </div>
     <ul role="list" className="divide-y divide-gray-200">
      {transactions?.map((transaction) => (
       <li key={transaction.id}>
        <div className="px-4 py-4 sm:px-6">
         <div className="flex items-center justify-between">
          <div className="flex items-center">
           <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
           <p className="text-sm font-medium text-indigo-600 truncate">
            {transaction.description}
           </p>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
           <p
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'Income'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
             }`}
           >
            {transaction.type}
           </p>
          </div>
         </div>
         <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
           <p className="flex items-center text-sm text-gray-500">
            Category: {transaction.category}
           </p>
           <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
            Date: {transaction.date}
           </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
           <p>Amount: ${transaction.amount.toFixed(2)}</p>
          </div>
         </div>
         <div className="mt-2">
          <p
           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === 'Reconciled'
             ? 'bg-green-100 text-green-800'
             : transaction.status === 'Completed'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
            }`}
          >
           {transaction.status}
          </p>
         </div>
        </div>
       </li>
      ))}
     </ul>
    </div>
   </div>

   {/* New Transaction Modal */}
   <Modal
    isOpen={showNewTransactionModal}
    onClose={() => setShowNewTransactionModal(false)}
    title="Record New Transaction"
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
      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
       Type
      </label>
      <select
       name="type"
       id="type"
       value={formData.type}
       onChange={handleInputChange}
       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
       <option value="Income">Income</option>
       <option value="Expense">Expense</option>
      </select>
      {formErrors.type && (
       <p className="mt-1 text-sm text-red-600">{formErrors.type[0]}</p>
      )}
     </div>
     <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
       Category
      </label>
      <input
       type="text"
       name="category"
       id="category"
       value={formData.category}
       onChange={handleInputChange}
       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {formErrors.category && (
       <p className="mt-1 text-sm text-red-600">{formErrors.category[0]}</p>
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
      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
       Date
      </label>
      <input
       type="date"
       name="date"
       id="date"
       value={formData.date}
       onChange={handleInputChange}
       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {formErrors.date && (
       <p className="mt-1 text-sm text-red-600">{formErrors.date[0]}</p>
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
       Record Transaction
      </button>
      <button
       type="button"
       onClick={() => setShowNewTransactionModal(false)}
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