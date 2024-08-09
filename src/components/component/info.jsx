"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Use Input instead of Textarea for single-line fields
import emailjs from 'emailjs-com'; // Import EmailJS
import './styles.css'; // Import the CSS file

export default function ConnectPESChatbot() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    srn: '',
    idCard: null,
    role: '',
    company: '',
    contactMethod: ''
  });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for email
    const emailData = {
      name: formData.name,
      srn: formData.srn,
      role: formData.role,
      company: formData.company,
      contactMethod: formData.contactMethod,
    };

    // Log formData to check if it contains expected values
    console.log('Form Data:', formData);

    // Send data via EmailJS
    emailjs.send('service_nra8ibh', 'template_7zhdusk', emailData, 'vW5x6b44wyKCaQKLb')
      .then((response) => {
        console.log('Email sent successfully:', response);
        setStep(2);
        setMessage('Your answer has reached the concerned person. Thank you for taking some time out to answer the query!');
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setMessage('Failed to send your information. Please try again.');
      });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="grid md:grid-cols-[260px_1fr] min-h-screen w-full bg-gradient-to-r from-orange-400 via-blue-500 to-blue-700 text-gray-800">
        <div className="hidden md:flex flex-col side-component shadow-lg p-4 rounded-lg">
          <Button variant="ghost" className="justify-start w-full gap-2 px-2 text-left">
            <div className="flex items-center justify-center rounded-full w-7 h-7 bg-gray-200">
              <BotIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="overflow-hidden text-sm grow text-ellipsis whitespace-nowrap text-gray-700">ConnectPES</div>
          </Button>
          <div className="mt-4 text-gray-600">
            <p>Welcome to connectPES! This form helps you connect with PES Alumni if you require additional information about the concerned organization. Please enter the following details:</p>
          </div>
        </div>
        <div className="flex flex-col items-start flex-1 p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Full Name:</label>
                <Input name="name" value={formData.name} onChange={handleChange} required className="mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your SRN :</label>
                <Input name="srn" value={formData.srn} onChange={handleChange} required className="mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Your ID Card:</label>
                <Input type="file" name="idCard" onChange={handleChange} required className="mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">The organization you want information for:</label>
                <Input name="company" value={formData.company} onChange={handleChange} required className="mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Preferred Contact Method (email, phone):</label>
                <Input name="contactMethod" value={formData.contactMethod} onChange={handleChange} required className="mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>          
            
              <Button type="submit" className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">Submit your details</Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-800">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BotIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
