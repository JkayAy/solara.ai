'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUser } from '@clerk/nextjs';

const setupSchema = z.object({
 firstName: z.string().min(2, 'First name is required'),
 lastName: z.string().min(2, 'Last name is required'),
 business: z.string().min(2, 'Business name is required'),
 role: z.string().min(2, 'Role is required'),
 preferences: z.object({
  emailNotifications: z.boolean().default(true),
  weeklyDigest: z.boolean().default(true),
  darkMode: z.boolean().default(false),
 }),
});

type SetupFormData = z.infer<typeof setupSchema>;

export default function SetupPage() {
 const router = useRouter();
 const { user } = useUser();
 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
 } = useForm<SetupFormData>({
  resolver: zodResolver(setupSchema),
  defaultValues: {
   preferences: {
    emailNotifications: true,
    weeklyDigest: true,
    darkMode: false,
   },
  },
 });

 const onSubmit = async (data: SetupFormData) => {
  try {
   const response = await fetch('/api/setup', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     ...data,
     email: user?.primaryEmailAddress?.emailAddress,
     userId: user?.id,
    }),
   });

   if (!response.ok) {
    throw new Error('Failed to save profile');
   }

   router.push('/dashboard');
  } catch (error) {
   console.error('Setup error:', error);
  }
 };

 return (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
     Complete Your Profile
    </h2>
    <p className="mt-2 text-center text-sm text-gray-600">
     Tell us a bit about yourself to get started
    </p>
   </div>

   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
     <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
       <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
         First Name
        </label>
        <input
         type="text"
         id="firstName"
         {...register('firstName')}
         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.firstName && (
         <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
        )}
       </div>

       <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
         Last Name
        </label>
        <input
         type="text"
         id="lastName"
         {...register('lastName')}
         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.lastName && (
         <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
        )}
       </div>
      </div>

      <div>
       <label htmlFor="business" className="block text-sm font-medium text-gray-700">
        Business Name
       </label>
       <input
        type="text"
        id="business"
        {...register('business')}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
       />
       {errors.business && (
        <p className="mt-1 text-sm text-red-600">{errors.business.message}</p>
       )}
      </div>

      <div>
       <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        Your Role
       </label>
       <select
        id="role"
        {...register('role')}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
       >
        <option value="">Select a role</option>
        <option value="freelancer">Freelancer</option>
        <option value="consultant">Consultant</option>
        <option value="agency_owner">Agency Owner</option>
        <option value="small_business">Small Business Owner</option>
       </select>
       {errors.role && (
        <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
       )}
      </div>

      <div className="space-y-4">
       <h3 className="text-lg font-medium text-gray-900">Preferences</h3>

       <div className="flex items-center">
        <input
         type="checkbox"
         id="emailNotifications"
         {...register('preferences.emailNotifications')}
         className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
         Email Notifications
        </label>
       </div>

       <div className="flex items-center">
        <input
         type="checkbox"
         id="weeklyDigest"
         {...register('preferences.weeklyDigest')}
         className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="weeklyDigest" className="ml-2 block text-sm text-gray-900">
         Weekly Digest
        </label>
       </div>

       <div className="flex items-center">
        <input
         type="checkbox"
         id="darkMode"
         {...register('preferences.darkMode')}
         className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-900">
         Dark Mode
        </label>
       </div>
      </div>

      <div>
       <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
       >
        {isSubmitting ? 'Saving...' : 'Complete Setup'}
       </button>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
} 