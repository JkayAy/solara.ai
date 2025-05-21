'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import {
 ShieldCheckIcon,
 QrCodeIcon,
 KeyIcon,
 DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

export default function TwoFactorAuthPage() {
 const [isEnabled, setIsEnabled] = useState(true);
 const [showQRCode, setShowQRCode] = useState(false);
 const [verificationCode, setVerificationCode] = useState('');
 const [backupCodes, setBackupCodes] = useState([
  'ABCD-1234',
  'EFGH-5678',
  'IJKL-9012',
  'MNOP-3456',
  'QRST-7890',
 ]);

 const handleToggle2FA = () => {
  if (isEnabled) {
   setIsEnabled(false);
   setShowQRCode(false);
   setVerificationCode('');
  } else {
   setShowQRCode(true);
  }
 };

 const handleVerifyCode = () => {
  // In a real application, you would verify the code here
  if (verificationCode.length === 6) {
   setIsEnabled(true);
   setShowQRCode(false);
   setVerificationCode('');
  }
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Two-Factor Authentication"
     description="Add an extra layer of security to your account"
    />
    <BackButton href="/dashboard/security" label="Back to Security" />
   </div>

   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 bg-primary/10 rounded-lg">
       <ShieldCheckIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">
        Two-Factor Authentication
       </h2>
       <p className="mt-1 text-sm text-gray-500">
        Protect your account with an additional layer of security
       </p>
      </div>
     </div>

     {/* 2FA Status */}
     <div className="mb-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
       <div className="flex items-center space-x-3">
        <div
         className={`p-2 rounded-lg ${isEnabled ? 'bg-green-100' : 'bg-gray-100'
          }`}
        >
         <ShieldCheckIcon
          className={`h-5 w-5 ${isEnabled ? 'text-green-600' : 'text-gray-600'
           }`}
         />
        </div>
        <div>
         <h3 className="text-sm font-medium text-gray-900">Status</h3>
         <p
          className={`text-sm font-medium ${isEnabled ? 'text-green-600' : 'text-gray-600'
           }`}
         >
          {isEnabled ? 'Enabled' : 'Disabled'}
         </p>
        </div>
       </div>
       <button
        onClick={handleToggle2FA}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isEnabled
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-primary hover:bg-primary-dark'
         } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
       >
        {isEnabled ? 'Disable 2FA' : 'Enable 2FA'}
       </button>
      </div>
     </div>

     {/* Setup Instructions */}
     {showQRCode && (
      <div className="space-y-6">
       <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex">
         <div className="flex-shrink-0">
          <DevicePhoneMobileIcon className="h-5 w-5 text-blue-400" />
         </div>
         <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
           Setup Instructions
          </h3>
          <div className="mt-2 text-sm text-blue-700">
           <ol className="list-decimal pl-5 space-y-2">
            <li>Download an authenticator app like Google Authenticator or Authy</li>
            <li>Scan the QR code below with your authenticator app</li>
            <li>Enter the 6-digit code from your authenticator app</li>
            <li>Save your backup codes in a secure location</li>
           </ol>
          </div>
         </div>
        </div>
       </div>

       {/* QR Code */}
       <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
         <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
          <QrCodeIcon className="h-32 w-32 text-gray-400" />
         </div>
         <p className="mt-2 text-sm text-gray-500">
          Scan this QR code with your authenticator app
         </p>
        </div>
       </div>

       {/* Verification Code Input */}
       <div>
        <label
         htmlFor="verificationCode"
         className="block text-sm font-medium text-gray-700 mb-1"
        >
         Verification Code
        </label>
        <div className="flex space-x-2">
         <input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
         />
         <button
          onClick={handleVerifyCode}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
         >
          Verify
         </button>
        </div>
       </div>
      </div>
     )}

     {/* Backup Codes */}
     {isEnabled && (
      <div className="mt-6">
       <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
         <KeyIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
         <h3 className="text-sm font-medium text-gray-900">Backup Codes</h3>
         <p className="text-sm text-gray-500">
          Save these codes in a secure location
         </p>
        </div>
       </div>
       <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        {backupCodes.map((code, index) => (
         <div
          key={index}
          className="flex items-center justify-between p-2 bg-white rounded"
         >
          <span className="font-mono text-sm">{code}</span>
          <button
           onClick={() => {
            navigator.clipboard.writeText(code);
           }}
           className="text-gray-400 hover:text-gray-600"
          >
           Copy
          </button>
         </div>
        ))}
       </div>
       <button className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
        Generate New Backup Codes
       </button>
      </div>
     )}
    </div>
   </div>

   {/* Security Notice */}
   <div className="bg-yellow-50 rounded-lg p-4">
    <div className="flex">
     <div className="flex-shrink-0">
      <ShieldCheckIcon className="h-5 w-5 text-yellow-400" />
     </div>
     <div className="ml-3">
      <h3 className="text-sm font-medium text-yellow-800">
       Security Notice
      </h3>
      <div className="mt-2 text-sm text-yellow-700">
       <p>
        Two-factor authentication adds an extra layer of security to your
        account. Even if someone knows your password, they won't be able to
        access your account without the second factor.
       </p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 