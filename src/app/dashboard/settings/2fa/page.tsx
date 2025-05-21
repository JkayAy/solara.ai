'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { ShieldCheckIcon, QrCodeIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function TwoFactorAuthPage() {
 const [isEnabled, setIsEnabled] = useState(false);
 const [showQRCode, setShowQRCode] = useState(false);
 const [verificationCode, setVerificationCode] = useState('');

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Two-Factor Authentication"
     description="Enhance your account security with 2FA"
    />
    <BackButton href="/dashboard/settings" label="Back to Settings" />
   </div>

   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    {/* 2FA Status */}
    <div className="p-6 border-b border-gray-200">
     <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
       <div className="p-2 bg-primary/10 rounded-lg">
        <ShieldCheckIcon className="h-6 w-6 text-primary" />
       </div>
       <div>
        <h2 className="text-lg font-medium text-gray-900">
         Two-Factor Authentication
        </h2>
        <p className="mt-1 text-sm text-gray-500">
         {isEnabled
          ? 'Two-factor authentication is currently enabled'
          : 'Add an extra layer of security to your account'}
        </p>
       </div>
      </div>
      <button
       onClick={() => setIsEnabled(!isEnabled)}
       className={`px-4 py-2 rounded-md text-sm font-medium ${isEnabled
         ? 'bg-red-100 text-red-700 hover:bg-red-200'
         : 'bg-primary text-white hover:bg-primary-dark'
        } transition-colors`}
      >
       {isEnabled ? 'Disable 2FA' : 'Enable 2FA'}
      </button>
     </div>
    </div>

    {!isEnabled && (
     <div className="p-6 space-y-6">
      {/* Setup Instructions */}
      <div className="bg-gray-50 rounded-lg p-4">
       <h3 className="text-sm font-medium text-gray-900 mb-2">
        How to set up 2FA
       </h3>
       <ol className="list-decimal list-inside space-y-2 text-sm text-gray-500">
        <li>Download an authenticator app (Google Authenticator, Authy, etc.)</li>
        <li>Scan the QR code or enter the setup key manually</li>
        <li>Enter the verification code from your authenticator app</li>
        <li>Save your backup codes in a secure location</li>
       </ol>
      </div>

      {/* QR Code Section */}
      <div className="flex items-center justify-between">
       <div className="flex items-center space-x-3">
        <QrCodeIcon className="h-5 w-5 text-gray-400" />
        <span className="text-sm font-medium text-gray-900">QR Code</span>
       </div>
       <button
        onClick={() => setShowQRCode(!showQRCode)}
        className="text-sm text-primary hover:text-primary-dark transition-colors"
       >
        {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
       </button>
      </div>

      {showQRCode && (
       <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
        <div className="w-48 h-48 bg-white p-2 rounded-lg">
         {/* Placeholder for QR Code */}
         <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
          <QrCodeIcon className="h-12 w-12 text-gray-400" />
         </div>
        </div>
       </div>
      )}

      {/* Manual Setup Key */}
      <div className="flex items-center justify-between">
       <div className="flex items-center space-x-3">
        <KeyIcon className="h-5 w-5 text-gray-400" />
        <span className="text-sm font-medium text-gray-900">Setup Key</span>
       </div>
       <button className="text-sm text-primary hover:text-primary-dark transition-colors">
        Show Key
       </button>
      </div>

      {/* Verification Code Input */}
      <div>
       <label
        htmlFor="verificationCode"
        className="block text-sm font-medium text-gray-700 mb-2"
       >
        Verification Code
       </label>
       <input
        type="text"
        id="verificationCode"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        placeholder="Enter 6-digit code"
        maxLength={6}
       />
      </div>

      {/* Verify Button */}
      <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
       Verify and Enable 2FA
      </button>
     </div>
    )}

    {isEnabled && (
     <div className="p-6 space-y-6">
      {/* Backup Codes */}
      <div>
       <h3 className="text-sm font-medium text-gray-900 mb-2">
        Backup Codes
       </h3>
       <p className="text-sm text-gray-500 mb-4">
        Save these backup codes in a secure location. You can use them to access
        your account if you lose your authenticator device.
       </p>
       <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
         <div
          key={index}
          className="bg-gray-50 p-2 rounded text-sm font-mono text-gray-600"
         >
          XXXXX-XXXXX
         </div>
        ))}
       </div>
       <button className="mt-4 text-sm text-primary hover:text-primary-dark transition-colors">
        Generate New Backup Codes
       </button>
      </div>

      {/* Recovery Options */}
      <div>
       <h3 className="text-sm font-medium text-gray-900 mb-2">
        Recovery Options
       </h3>
       <div className="space-y-4">
        <div className="flex items-center justify-between">
         <div>
          <p className="text-sm font-medium text-gray-900">Recovery Email</p>
          <p className="text-sm text-gray-500">user@example.com</p>
         </div>
         <button className="text-sm text-primary hover:text-primary-dark transition-colors">
          Change
         </button>
        </div>
        <div className="flex items-center justify-between">
         <div>
          <p className="text-sm font-medium text-gray-900">Recovery Phone</p>
          <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
         </div>
         <button className="text-sm text-primary hover:text-primary-dark transition-colors">
          Change
         </button>
        </div>
       </div>
      </div>
     </div>
    )}
   </div>
  </div>
 );
} 