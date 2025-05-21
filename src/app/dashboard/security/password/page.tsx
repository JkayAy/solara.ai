'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BackButton } from '@/components/BackButton';
import { KeyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function PasswordManagementPage() {
 const [passwordData, setPasswordData] = useState({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
 });

 const [passwordStrength, setPasswordStrength] = useState({
  score: 0,
  feedback: '',
 });

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setPasswordData((prev) => ({
   ...prev,
   [name]: value,
  }));

  if (name === 'newPassword') {
   // Simple password strength calculation
   let score = 0;
   let feedback = '';

   if (value.length >= 8) score += 1;
   if (/[A-Z]/.test(value)) score += 1;
   if (/[a-z]/.test(value)) score += 1;
   if (/[0-9]/.test(value)) score += 1;
   if (/[^A-Za-z0-9]/.test(value)) score += 1;

   switch (score) {
    case 0:
    case 1:
     feedback = 'Very weak';
     break;
    case 2:
     feedback = 'Weak';
     break;
    case 3:
     feedback = 'Medium';
     break;
    case 4:
     feedback = 'Strong';
     break;
    case 5:
     feedback = 'Very strong';
     break;
   }

   setPasswordStrength({ score, feedback });
  }
 };

 const getStrengthColor = (score: number) => {
  switch (score) {
   case 0:
   case 1:
    return 'bg-red-500';
   case 2:
    return 'bg-orange-500';
   case 3:
    return 'bg-yellow-500';
   case 4:
    return 'bg-green-500';
   case 5:
    return 'bg-green-600';
   default:
    return 'bg-gray-200';
  }
 };

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between">
    <PageHeader
     title="Password Management"
     description="Update your password and security settings"
    />
    <BackButton href="/dashboard/security" label="Back to Security" />
   </div>

   <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6">
     <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 bg-primary/10 rounded-lg">
       <KeyIcon className="h-6 w-6 text-primary" />
      </div>
      <div>
       <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
       <p className="mt-1 text-sm text-gray-500">
        Update your password to keep your account secure
       </p>
      </div>
     </div>

     <div className="space-y-4">
      <div>
       <label
        htmlFor="currentPassword"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        Current Password
       </label>
       <input
        type="password"
        id="currentPassword"
        name="currentPassword"
        value={passwordData.currentPassword}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       />
      </div>

      <div>
       <label
        htmlFor="newPassword"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        New Password
       </label>
       <input
        type="password"
        id="newPassword"
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       />
       {passwordData.newPassword && (
        <div className="mt-2">
         <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
           <div
            className={`h-full ${getStrengthColor(
             passwordStrength.score
            )} transition-all duration-300`}
            style={{
             width: `${(passwordStrength.score / 5) * 100}%`,
            }}
           />
          </div>
          <span className="text-sm font-medium text-gray-600">
           {passwordStrength.feedback}
          </span>
         </div>
        </div>
       )}
      </div>

      <div>
       <label
        htmlFor="confirmPassword"
        className="block text-sm font-medium text-gray-700 mb-1"
       >
        Confirm New Password
       </label>
       <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handleInputChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
       />
      </div>
     </div>

     <div className="mt-6">
      <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
       Update Password
      </button>
     </div>
    </div>
   </div>

   {/* Password Requirements */}
   <div className="bg-blue-50 rounded-lg p-4">
    <div className="flex">
     <div className="flex-shrink-0">
      <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
     </div>
     <div className="ml-3">
      <h3 className="text-sm font-medium text-blue-800">
       Password Requirements
      </h3>
      <div className="mt-2 text-sm text-blue-700">
       <ul className="list-disc pl-5 space-y-1">
        <li>At least 8 characters long</li>
        <li>Include uppercase and lowercase letters</li>
        <li>Include at least one number</li>
        <li>Include at least one special character</li>
        <li>Must be different from your current password</li>
       </ul>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 