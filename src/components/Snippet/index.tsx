'use client';

import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

type SnippetVariant = 'default' | 'primary' | 'success' | 'danger';
type SnippetSize = 'small' | 'medium' | 'large';

interface SnippetProps {
    children: React.ReactNode;
    variant?: SnippetVariant;
    size?: SnippetSize;
    className?: string;
}

const Snippet: React.FC<SnippetProps> = ({ children, variant = 'default', size = 'medium', className }) => {
    const [copied, setCopied] = useState(false);

    const baseStyles = 'bg-slate-100 font-mono rounded-md relative inline-flex items-center gap-2';

    const variantStyles: Record<SnippetVariant, string> = {
        default: 'text-gray-700 bg-slate-100 dark:bg-gray-700 dark:text-gray-300',
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
        success: 'text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300',
        danger: 'text-pink-700 bg-pink-100 dark:bg-pink-900 dark:text-pink-300',
    };

    const sizeStyles: Record<SnippetSize, string> = {
        small: 'text-xs py-1 px-2',
        medium: 'text-sm py-2 px-4',
        large: 'text-base py-3 px-6',
    };

    const buttonPositions: Record<SnippetSize, string> = {
        small: 'top-1 right-1',
        medium: 'top-2 right-2',
        large: 'top-3 right-3',
    };

    const handleCopy = (e: any) => {
        e.preventDefault();
        const text = typeof children === 'string' ? children : JSON.stringify(children);
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <span className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            'relative',
            className
        )}>
            {children}
            <button
                onClick={handleCopy}
                className={cn(
                    "ms-auto p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                    buttonPositions[size]
                )}
            >
                {copied ? (
                    // <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    //     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    // </svg>
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    // <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    //     <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    //     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    // </svg>
                    <Copy className="h-4 w-4" />
                )}
            </button>
        </span>
    );
};

export default Snippet;
