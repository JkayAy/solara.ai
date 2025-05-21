import { PageLayout } from "@/components/page-layout";

export default function PrivacyPage() {
 return (
  <PageLayout>
   <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
    <p className="text-muted-foreground mb-8">Last updated: March 15, 2024</p>

    <div className="prose prose-lg dark:prose-invert max-w-none">
     <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
      <p>
       At Solara AI, we take your privacy seriously. This Privacy Policy explains how we
       collect, use, disclose, and safeguard your information when you use our service.
       Please read this privacy policy carefully. If you do not agree with the terms of
       this privacy policy, please do not access the site.
      </p>
     </section>

     <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
      <p>
       We may collect personal information that you voluntarily provide to us when you:
      </p>
      <ul className="list-disc pl-6 mb-4">
       <li>Register for an account</li>
       <li>Express an interest in obtaining information about us or our products</li>
       <li>Participate in activities on our website</li>
       <li>Contact us</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Automatically Collected Information</h3>
      <p>
       When you access our website, we may automatically collect certain information,
       including:
      </p>
      <ul className="list-disc pl-6">
       <li>Device and usage information</li>
       <li>IP address and browser type</li>
       <li>Operating system</li>
       <li>Referring URLs</li>
      </ul>
     </section>

     <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul className="list-disc pl-6">
       <li>Provide and maintain our service</li>
       <li>Notify you about changes to our service</li>
       <li>Provide customer support</li>
       <li>Gather analysis or valuable information to improve our service</li>
       <li>Monitor the usage of our service</li>
       <li>Detect, prevent and address technical issues</li>
      </ul>
     </section>

     <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
      <p>
       We have implemented appropriate technical and organizational security measures
       designed to protect the security of any personal information we process. However,
       please also remember that we cannot guarantee that the internet itself is 100%
       secure.
      </p>
     </section>

     <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Your Data Protection Rights</h2>
      <p>
       You have certain data protection rights. These include the right to:
      </p>
      <ul className="list-disc pl-6">
       <li>Request access to your personal data</li>
       <li>Request correction of your personal data</li>
       <li>Request erasure of your personal data</li>
       <li>Object to processing of your personal data</li>
       <li>Request restriction of processing your personal data</li>
       <li>Request transfer of your personal data</li>
       <li>Withdraw consent</li>
      </ul>
     </section>

     <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p>
       If you have any questions about this Privacy Policy, please contact us at:
      </p>
      <ul className="list-none pl-6">
       <li>Email: privacy@solara.ai</li>
       <li>Phone: +1 (555) 123-4567</li>
       <li>Address: 123 Innovation Drive, San Francisco, CA 94107</li>
      </ul>
     </section>
    </div>
   </div>
  </PageLayout>
 );
} 