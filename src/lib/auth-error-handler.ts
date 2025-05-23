import { toast } from 'sonner';

interface AuthError {
 message: string;
 code?: string;
 status?: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export class AuthErrorHandler {
 private static retryCount = 0;
 private static isRefreshing = false;
 private static lastErrorTime = 0;
 private static readonly ERROR_COOLDOWN = 5000; // 5 seconds

 static async handleAuthError(error: AuthError): Promise<boolean> {
  const now = Date.now();

  // Prevent error spam
  if (now - this.lastErrorTime < this.ERROR_COOLDOWN) {
   return false;
  }

  this.lastErrorTime = now;
  console.error('Auth Error:', {
   message: error.message,
   code: error.code,
   status: error.status,
   timestamp: new Date().toISOString(),
  });

  // Check if it's a token refresh error
  if (error.message.includes('Token refresh failed')) {
   return this.handleTokenRefreshError();
  }

  // Handle network errors
  if (error.message.includes('Network error')) {
   return this.handleNetworkError();
  }

  // Handle other auth errors
  this.showErrorToast(error);
  return false;
 }

 private static async handleTokenRefreshError(): Promise<boolean> {
  if (this.isRefreshing) {
   return false;
  }

  if (this.retryCount >= MAX_RETRIES) {
   this.showErrorToast({
    message: 'Authentication failed after multiple attempts. Please try logging in again.',
   });
   this.resetRetryCount();
   return false;
  }

  this.isRefreshing = true;
  this.retryCount++;

  try {
   // Wait for the retry delay with exponential backoff
   const delay = RETRY_DELAY * Math.pow(2, this.retryCount - 1);
   await new Promise(resolve => setTimeout(resolve, delay));

   // Attempt to refresh the token
   const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies
   });

   if (response.ok) {
    this.resetRetryCount();
    toast.success('Authentication refreshed successfully');
    return true;
   }

   throw new Error('Token refresh failed');
  } catch (error) {
   console.error('Token refresh attempt failed:', error);
   return false;
  } finally {
   this.isRefreshing = false;
  }
 }

 private static async handleNetworkError(): Promise<boolean> {
  toast.error('Network connection issue detected. Please check your internet connection.', {
   duration: 5000,
   action: {
    label: 'Retry',
    onClick: () => {
     window.location.reload();
    },
   },
  });
  return false;
 }

 private static showErrorToast(error: AuthError) {
  toast.error(error.message || 'Authentication error occurred. Please try again.', {
   duration: 5000,
   action: {
    label: 'Retry',
    onClick: () => {
     window.location.reload();
    },
   },
  });
 }

 private static resetRetryCount() {
  this.retryCount = 0;
 }
} 