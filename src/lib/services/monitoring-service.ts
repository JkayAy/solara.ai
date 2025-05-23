import * as Sentry from '@sentry/nextjs';
import posthog from 'posthog-js';

class MonitoringService {
 constructor() {
  // Initialize PostHog
  if (typeof window !== 'undefined') {
   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
     if (process.env.NODE_ENV === 'development') posthog.debug();
    },
   });
  }
 }

 // Error tracking
 captureError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
   extra: context,
  });
 }

 captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, {
   level,
  });
 }

 setUser(user: { id: string; email?: string; name?: string }) {
  Sentry.setUser(user);
  if (typeof window !== 'undefined') {
   posthog.identify(user.id, {
    email: user.email,
    name: user.name,
   });
  }
 }

 // Analytics
 trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
   posthog.capture(eventName, properties);
  }
 }

 // Automation specific tracking
 trackRuleCreated(rule: any) {
  this.trackEvent('automation_rule_created', {
   rule_id: rule.id,
   trigger_type: rule.triggerType,
   action_type: rule.actionType,
  });
 }

 trackRuleUpdated(rule: any) {
  this.trackEvent('automation_rule_updated', {
   rule_id: rule.id,
   trigger_type: rule.triggerType,
   action_type: rule.actionType,
  });
 }

 trackRuleDeleted(ruleId: string) {
  this.trackEvent('automation_rule_deleted', {
   rule_id: ruleId,
  });
 }

 trackRuleExecuted(rule: any, success: boolean) {
  this.trackEvent('automation_rule_executed', {
   rule_id: rule.id,
   trigger_type: rule.triggerType,
   action_type: rule.actionType,
   success,
  });
 }

 // Performance monitoring
 startPerformanceSpan(name: string) {
  return Sentry.startTransaction({
   name,
   op: 'task',
  });
 }
}

export const monitoringService = new MonitoringService(); 