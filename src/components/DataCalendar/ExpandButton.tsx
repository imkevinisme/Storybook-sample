import React from 'react';


import { cn } from "@/lib/utils";

const ExpandButton: React.FC<{ text: string, isActive: boolean, onClick: () => void, icon: React.ReactNode }> = ({ text, isActive, onClick, icon }) => {

    return (
        <button
            onClick={onClick}
            className={cn(
                "rounded-md px-2 py-2 inline-flex text-sm gap-2 items-center justify-center transition-all duration-300 will-change-auto",
                isActive ? "bg-white text-dark dark:bg-slate-700 dark:text-white" : "bg-transparent text-secondary"
            )}
            style={{
                width: isActive ? "auto" : "40px",
                flex: isActive ? "2 1 0%" : "1 1 0%"
            }}
        >
            <div className="flex items-center justify-center space-x-1 w-full">
                {icon}
                {isActive && <span className="text-xs font-medium whitespace-nowrap overflow-hidden">{text}</span>}
            </div>
        </button>
    );
};

export default ExpandButton;

