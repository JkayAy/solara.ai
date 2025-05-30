'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
 const router = useRouter();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
   // TODO: Implement actual authentication
   router.push('/dashboard');
  } catch (err) {
   setError('Invalid email or password');
  }
 };

 return (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
     Sign in to your account
    </h2>
    <p className="mt-2 text-center text-sm text-gray-600">
     Or{' '}
     <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
      start your 14-day free trial
     </Link>
    </p>
   </div>

   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
     <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
       <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">{error}</div>
       </div>
      )}
      <div>
       <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email address
       </label>
       <div className="mt-1">
        <input
         id="email"
         name="email"
         type="email"
         autoComplete="email"
         required
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
       </div>
      </div>

      <div>
       <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
       </label>
       <div className="mt-1">
        <input
         id="password"
         name="password"
         type="password"
         autoComplete="current-password"
         required
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
       </div>
      </div>

      <div className="flex items-center justify-between">
       <div className="flex items-center">
        <input
         id="remember-me"
         name="remember-me"
         type="checkbox"
         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
         Remember me
        </label>
       </div>

       <div className="text-sm">
        <Link href="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
         Forgot your password?
        </Link>
       </div>
      </div>

      <div>
       <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
       >
        Sign in
       </button>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
} 