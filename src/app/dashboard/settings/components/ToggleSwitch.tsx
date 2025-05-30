'use client';

import { useState } from 'react';

interface ToggleSwitchProps {
 initialValue?: boolean;
 onChange?: (value: boolean) => void;
 label: string;
 description: string;
}

export function ToggleSwitch({ initialValue = false, onChange, label, description }: ToggleSwitchProps) {
 const [enabled, setEnabled] = useState(initialValue);

 const handleToggle = () => {
  const newValue = !enabled;
  setEnabled(newValue);
  onChange?.(newValue);
 };

 return (
  <div className="flex items-center justify-between">
   <div>
    <h3 className="text-sm font-medium text-gray-900">{label}</h3>
    <p className="text-sm text-gray-500">{description}</p>
   </div>
   <button
    type="button"
    onClick={handleToggle}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${enabled ? 'bg-indigo-600' : 'bg-gray-200'
     }`}
    role="switch"
    aria-checked={enabled}
   >
    <span
     className={`${enabled ? 'translate-x-5' : 'translate-x-0'
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
   </button>
  </div>
 );
} 