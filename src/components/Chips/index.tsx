import React from 'react';

export type ChipVariant = 'default' | 'primary' | 'warning' | 'success' | 'danger';

export interface ChipProps {
    text: string;
    variant?: ChipVariant;
    onClose?: () => void;
}

const Chip: React.FC<ChipProps> = ({ text, variant = 'default', onClose }) => {
    const baseStyles = 'chip px-2 py-0.5 rounded inline-flex justify-center items-center';
    const variantStyles: Record<ChipVariant, string> = {
        default: 'text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300',
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
        warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
        success: 'text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300',
        danger: 'text-pink-700 bg-pink-100 dark:bg-pink-900 dark:text-pink-300',
    };

    return (
        <div className={`${baseStyles} ${variantStyles[variant]}`}>
            <div className="text-xs font-medium leading-none max-w-full flex-initial">{text}</div>

            {onClose && (
                <button onClick={onClose} className="ml-2 text-white" aria-label="Remove Chip">
                &times;
                </button>
            )}
        </div>
    );
};

export default Chip;

