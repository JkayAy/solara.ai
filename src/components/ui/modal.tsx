import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 title: string;
 children: React.ReactNode;
 size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
 const modalRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const handleEscape = (event: KeyboardEvent) => {
   if (event.key === 'Escape') {
    onClose();
   }
  };

  const handleClickOutside = (event: MouseEvent) => {
   if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
    onClose();
   }
  };

  if (isOpen) {
   document.addEventListener('keydown', handleEscape);
   document.addEventListener('mousedown', handleClickOutside);
   document.body.style.overflow = 'hidden';
  }

  return () => {
   document.removeEventListener('keydown', handleEscape);
   document.removeEventListener('mousedown', handleClickOutside);
   document.body.style.overflow = 'unset';
  };
 }, [isOpen, onClose]);

 if (!isOpen) return null;

 const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
 };

 return (
  <div
   className="fixed inset-0 z-50 overflow-y-auto"
   role="dialog"
   aria-modal="true"
   aria-labelledby="modal-title"
  >
   <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
    <div
     className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
     aria-hidden="true"
    />

    <div
     ref={modalRef}
     className={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${sizeClasses[size]} sm:p-6`}
    >
     <div className="absolute right-0 top-0 pr-4 pt-4">
      <button
       type="button"
       className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
       onClick={onClose}
      >
       <span className="sr-only">Close</span>
       <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      </button>
     </div>

     <div className="sm:flex sm:items-start">
      <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
       <h3
        className="text-lg font-medium leading-6 text-gray-900"
        id="modal-title"
       >
        {title}
       </h3>
       <div className="mt-4">{children}</div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
} 