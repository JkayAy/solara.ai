"use client";

import { PageLayout } from "@/components/page-layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
 });

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle form submission
  console.log(formData);
 };

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
 };

 return (
  <PageLayout>
   <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
     <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
     <p className="text-xl text-muted-foreground">
      Get in touch with our team. We're here to help.
     </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
     {/* Contact Information */}
     <div>
      <div className="bg-muted/50 rounded-lg p-8 mb-8">
       <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
       <div className="space-y-6">
        <div className="flex items-start space-x-4">
         <Mail className="w-6 h-6 text-primary mt-1" />
         <div>
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-muted-foreground">support@solara.ai</p>
          <p className="text-muted-foreground">sales@solara.ai</p>
         </div>
        </div>
        <div className="flex items-start space-x-4">
         <Phone className="w-6 h-6 text-primary mt-1" />
         <div>
          <h3 className="font-semibold mb-1">Phone</h3>
          <p className="text-muted-foreground">+1 (555) 123-4567</p>
         </div>
        </div>
        <div className="flex items-start space-x-4">
         <MapPin className="w-6 h-6 text-primary mt-1" />
         <div>
          <h3 className="font-semibold mb-1">Office</h3>
          <p className="text-muted-foreground">
           123 Innovation Drive<br />
           San Francisco, CA 94107<br />
           United States
          </p>
         </div>
        </div>
       </div>
      </div>

      {/* Office Hours */}
      <div className="bg-muted/50 rounded-lg p-8">
       <h2 className="text-2xl font-semibold mb-6">Office Hours</h2>
       <div className="space-y-4">
        <div className="flex justify-between">
         <span className="text-muted-foreground">Monday - Friday</span>
         <span>9:00 AM - 6:00 PM PST</span>
        </div>
        <div className="flex justify-between">
         <span className="text-muted-foreground">Saturday</span>
         <span>10:00 AM - 4:00 PM PST</span>
        </div>
        <div className="flex justify-between">
         <span className="text-muted-foreground">Sunday</span>
         <span>Closed</span>
        </div>
       </div>
      </div>
     </div>

     {/* Contact Form */}
     <div className="bg-muted/50 rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
       <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
         Name
        </label>
        <input
         type="text"
         id="name"
         name="name"
         value={formData.name}
         onChange={handleChange}
         className="w-full px-4 py-2 rounded-md bg-background"
         required
        />
       </div>
       <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
         Email
        </label>
        <input
         type="email"
         id="email"
         name="email"
         value={formData.email}
         onChange={handleChange}
         className="w-full px-4 py-2 rounded-md bg-background"
         required
        />
       </div>
       <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
         Subject
        </label>
        <input
         type="text"
         id="subject"
         name="subject"
         value={formData.subject}
         onChange={handleChange}
         className="w-full px-4 py-2 rounded-md bg-background"
         required
        />
       </div>
       <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
         Message
        </label>
        <textarea
         id="message"
         name="message"
         value={formData.message}
         onChange={handleChange}
         rows={5}
         className="w-full px-4 py-2 rounded-md bg-background"
         required
        ></textarea>
       </div>
       <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90"
       >
        <Send className="w-4 h-4" />
        Send Message
       </button>
      </form>
     </div>
    </div>
   </div>
  </PageLayout>
 );
} 