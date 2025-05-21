'use client';

import { useState } from 'react';
import { CreditCard, Bank, Wallet, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentIntegrationProps {
 proposal: {
  id: string;
  title: string;
  amount: number;
 };
 onClose: () => void;
 onPaymentComplete: () => void;
}

type PaymentMethod = 'card' | 'bank' | 'wallet';

export function PaymentIntegration({ proposal, onClose, onPaymentComplete }: PaymentIntegrationProps) {
 const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
 const [isProcessing, setIsProcessing] = useState(false);
 const [isComplete, setIsComplete] = useState(false);

 const paymentMethods = [
  {
   id: 'card',
   name: 'Credit Card',
   icon: CreditCard,
   description: 'Pay with credit or debit card',
  },
  {
   id: 'bank',
   name: 'Bank Transfer',
   icon: Bank,
   description: 'Pay via bank transfer',
  },
  {
   id: 'wallet',
   name: 'Digital Wallet',
   icon: Wallet,
   description: 'Pay with digital wallet',
  },
 ];

 const handlePayment = async () => {
  setIsProcessing(true);
  try {
   // TODO: Implement actual payment processing
   await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
   setIsComplete(true);
   onPaymentComplete();
  } catch (error) {
   console.error('Payment failed:', error);
  } finally {
   setIsProcessing(false);
  }
 };

 if (isComplete) {
  return (
   <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
    <div className="fixed inset-0 flex items-center justify-center p-4">
     <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6">
      <div className="text-center space-y-4">
       <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-6 h-6 text-green-500" />
       </div>
       <h2 className="text-xl font-semibold">Payment Successful</h2>
       <p className="text-muted-foreground">
        Thank you for your payment. We'll send you a receipt shortly.
       </p>
       <Button onClick={onClose} className="w-full">
        Close
       </Button>
      </div>
     </div>
    </div>
   </div>
  );
 }

 return (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
   <div className="fixed inset-0 flex items-center justify-center p-4">
    <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
     {/* Header */}
     <div className="p-4 border-b">
      <h2 className="text-lg font-semibold">Complete Payment</h2>
      <p className="text-sm text-muted-foreground">
       Amount to pay: ${proposal.amount.toLocaleString()}
      </p>
     </div>

     {/* Payment Methods */}
     <div className="p-4 space-y-4">
      <div className="grid gap-3">
       {paymentMethods.map((method) => (
        <button
         key={method.id}
         onClick={() => setSelectedMethod(method.id as PaymentMethod)}
         className={`p-4 rounded-lg border flex items-start gap-3 transition-colors ${selectedMethod === method.id
           ? 'border-primary bg-primary/5'
           : 'hover:bg-muted/50'
          }`}
        >
         <div className="p-2 bg-primary/10 rounded-lg">
          <method.icon className="w-5 h-5 text-primary" />
         </div>
         <div className="text-left">
          <h3 className="font-medium">{method.name}</h3>
          <p className="text-sm text-muted-foreground">{method.description}</p>
         </div>
        </button>
       ))}
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
       {selectedMethod === 'card' && (
        <div className="space-y-3">
         <div>
          <label className="text-sm font-medium">Card Number</label>
          <input
           type="text"
           placeholder="1234 5678 9012 3456"
           className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          />
         </div>
         <div className="grid grid-cols-2 gap-3">
          <div>
           <label className="text-sm font-medium">Expiry Date</label>
           <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
           />
          </div>
          <div>
           <label className="text-sm font-medium">CVV</label>
           <input
            type="text"
            placeholder="123"
            className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
           />
          </div>
         </div>
        </div>
       )}

       {selectedMethod === 'bank' && (
        <div className="space-y-3">
         <div>
          <label className="text-sm font-medium">Account Number</label>
          <input
           type="text"
           placeholder="Enter account number"
           className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          />
         </div>
         <div>
          <label className="text-sm font-medium">Routing Number</label>
          <input
           type="text"
           placeholder="Enter routing number"
           className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          />
         </div>
        </div>
       )}

       {selectedMethod === 'wallet' && (
        <div className="space-y-3">
         <div>
          <label className="text-sm font-medium">Wallet Address</label>
          <input
           type="text"
           placeholder="Enter wallet address"
           className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          />
         </div>
        </div>
       )}
      </div>
     </div>

     {/* Actions */}
     <div className="p-4 border-t flex items-center justify-end gap-3">
      <Button variant="outline" onClick={onClose}>
       Cancel
      </Button>
      <Button
       onClick={handlePayment}
       disabled={isProcessing}
       className="flex items-center gap-2"
      >
       {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
     </div>
    </div>
   </div>
  </div>
 );
} 