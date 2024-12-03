"use client";

import { ReactNode, useContext } from 'react';


export function MainWrapper({ children, }: { children: ReactNode }) {
    return (
        <div className="flex-1 z-[9]">
            <div className={`flex flex-col min-h-screen`}> { /** ${ isOpen ? 'md:ml-60' : 'md:ml-16'} */}
                {children}
            </div>
        </div>
    );
}


export default function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="page-wrapper flex flex-col pt-2 px-6 flex-grow pb-4">
            {children}
        </div>
    );
}
