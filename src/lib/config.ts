interface Config {
 api: {
  baseUrl: string;
  timeout: number;
 };
 auth: {
  redirectUrl: string;
 };
 app: {
  name: string;
  description: string;
  version: string;
 };
 features: {
  enableAnalytics: boolean;
  enableNotifications: boolean;
  enableFileUpload: boolean;
 };
 limits: {
  maxFileSize: number;
  maxUploads: number;
  rateLimit: number;
  rateLimitWindow: number;
 };
}

const config: Config = {
 api: {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 5000,
 },
 auth: {
  redirectUrl: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL || '/dashboard',
 },
 app: {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'My App',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A modern web application',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
 },
 features: {
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableNotifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
  enableFileUpload: process.env.NEXT_PUBLIC_ENABLE_FILE_UPLOAD === 'true',
 },
 limits: {
  maxFileSize: Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  maxUploads: Number(process.env.NEXT_PUBLIC_MAX_UPLOADS) || 10,
  rateLimit: Number(process.env.NEXT_PUBLIC_RATE_LIMIT) || 100,
  rateLimitWindow: Number(process.env.NEXT_PUBLIC_RATE_LIMIT_WINDOW) || 60 * 1000, // 1 minute
 },
};

export default config;

// Environment validation
export function validateEnvironment() {
 const requiredEnvVars = [
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_APP_NAME',
  'NEXT_PUBLIC_SENTRY_DSN',
 ];

 const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
 );

 if (missingEnvVars.length > 0) {
  throw new Error(
   `Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
 }
}

// Feature flags
export function isFeatureEnabled(feature: keyof Config['features']): boolean {
 return config.features[feature];
}

// API configuration
export function getApiConfig() {
 return config.api;
}

// App configuration
export function getAppConfig() {
 return config.app;
}

// Limits configuration
export function getLimitsConfig() {
 return config.limits;
} 