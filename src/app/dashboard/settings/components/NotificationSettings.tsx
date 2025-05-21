'use client';

import { ToggleSwitch } from './ToggleSwitch';

export function NotificationSettings() {
 const handleEmailNotifications = (value: boolean) => {
  console.log('Email notifications:', value);
  // Add your email notification logic here
 };

 const handlePushNotifications = (value: boolean) => {
  console.log('Push notifications:', value);
  // Add your push notification logic here
 };

 const handleSMSNotifications = (value: boolean) => {
  console.log('SMS notifications:', value);
  // Add your SMS notification logic here
 };

 const handleMarketingEmails = (value: boolean) => {
  console.log('Marketing emails:', value);
  // Add your marketing email logic here
 };

 return (
  <div className="space-y-6">
   <ToggleSwitch
    label="Email Notifications"
    description="Receive email updates about your account"
    initialValue={true}
    onChange={handleEmailNotifications}
   />

   <ToggleSwitch
    label="Push Notifications"
    description="Receive push notifications on your devices"
    initialValue={true}
    onChange={handlePushNotifications}
   />

   <ToggleSwitch
    label="SMS Notifications"
    description="Receive text messages for important updates"
    initialValue={false}
    onChange={handleSMSNotifications}
   />

   <ToggleSwitch
    label="Marketing Emails"
    description="Receive promotional emails and offers"
    initialValue={false}
    onChange={handleMarketingEmails}
   />
  </div>
 );
} 