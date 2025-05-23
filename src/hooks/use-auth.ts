import { useState, useEffect } from 'react';

interface User {
 id: string;
 name: string;
 email: string;
 image?: string;
}

interface AuthState {
 user: User | null;
 loading: boolean;
 error: Error | null;
}

export function useAuth() {
 const [state, setState] = useState<AuthState>({
  user: null,
  loading: true,
  error: null,
 });

 useEffect(() => {
  // Check if user is logged in
  const checkAuth = async () => {
   try {
    const response = await fetch('/api/auth/session');
    const data = await response.json();

    if (data.user) {
     setState({
      user: data.user,
      loading: false,
      error: null,
     });
    } else {
     setState({
      user: null,
      loading: false,
      error: null,
     });
    }
   } catch (error) {
    setState({
     user: null,
     loading: false,
     error: error as Error,
    });
   }
  };

  checkAuth();
 }, []);

 const signIn = async (email: string, password: string) => {
  try {
   const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.message || 'Failed to sign in');
   }

   setState({
    user: data.user,
    loading: false,
    error: null,
   });

   return data;
  } catch (error) {
   setState({
    user: null,
    loading: false,
    error: error as Error,
   });
   throw error;
  }
 };

 const signOut = async () => {
  try {
   await fetch('/api/auth/signout', {
    method: 'POST',
   });

   setState({
    user: null,
    loading: false,
    error: null,
   });
  } catch (error) {
   setState({
    user: null,
    loading: false,
    error: error as Error,
   });
   throw error;
  }
 };

 return {
  user: state.user,
  loading: state.loading,
  error: state.error,
  signIn,
  signOut,
 };
} 