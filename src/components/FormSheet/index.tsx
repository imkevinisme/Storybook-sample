'use client'

import React, { ReactNode, useState, useEffect } from 'react';

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';

interface FormSheetProps {
    title: string;
    children: ReactNode;
    triggerButton: ReactNode;
    submitButtonText?: string;
    joinAtText?: string;
    isOpen?: boolean;
    onSubmit: (data: any) => void;
    onOpenChange?: (open: boolean) => void;
    cancelButton? : boolean;
    submitButton? : boolean;
    widthSheet?: string;
    heightSheet?: string;
    side?: "right" | "left" ;
}

const FormSheet: React.FC<FormSheetProps> = ({
    title,
    children,
    triggerButton,
    submitButtonText = 'Submit',
    joinAtText,
    isOpen,
    onSubmit,
    onOpenChange,
    cancelButton = true,
    submitButton = true,
    widthSheet = '700px',
    heightSheet = '95vh',
    side = "right"
}) => {
    const [open, setOpen] = useState(isOpen || false);

    useEffect(() => {
        if (isOpen !== undefined) {
            setOpen(isOpen);
        }
    }, [isOpen]);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        onOpenChange?.(newOpen);
        // console.log("Sheet Open")
        //!SECTION Reset figure this out
        // resetForm();
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                {triggerButton}
            </SheetTrigger>
            <SheetContent side={side} style={{ maxWidth: widthSheet, maxHeight: heightSheet, overflow: 'auto' }} className="rounded-lg m-5">
                {/* <div className='h-full overflow-auto'> */}
                    <SheetHeader>
                        <SheetTitle className='px-1 border-b pb-4 mb-4'>{title}</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col flex-grow">
                        <div className="space-y-4 flex flex-grow overflow-y-auto px-1">
                            <form onSubmit={onSubmit} className='flex flex-col gap-4 flex-grow'>
                                {children}

                                <SheetFooter className='mt-auto border-t pt-4'>
                                    {
                                        cancelButton == true &&
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setOpen(false)}
                                        > Cancel </Button>
                                    }
                                    {
                                        submitButton == true &&
                                        <Button type="submit">{submitButtonText}</Button>
                                    }
                                    {
                                        joinAtText !== undefined &&
                                        <div className='flex items-center'>
                                            <p className='text-gray-500 text-sm '>Join at&ensp;</p>
                                            <p className='text-black text-sm font-normal '>{joinAtText}</p>
                                        </div>
                                    }
                                </SheetFooter>
                            </form>
                        </div>
                    </div>
                {/* </div> */}
            </SheetContent>
        </Sheet>
    );
};

export default FormSheet;