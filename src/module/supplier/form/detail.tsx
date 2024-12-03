"use client"

// Library
import React, { useState } from 'react'

// UI components
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import FormSheet from '@/components/FormSheet';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function Details(supplier: any) {
    const [isOpen, setIsOpen] = useState(false);

    //console.log("supplier :", supplier.supplier)

    const handleDropdownItemSelect = (event: Event) => {
        event.preventDefault();
        setIsOpen(true);
    };

    return (
        <>
            <FormSheet
                triggerButton={<DropdownMenuItem onSelect={handleDropdownItemSelect}>View</DropdownMenuItem>}
                title="View Supplier Details"
                onSubmit={() => { }}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                submitButton={false}
                cancelButton={false}
            >

                <div className="flex flex-col justify-center items-center gap-2">
                    <Avatar className='h-32 w-32 my-4'>
                        <AvatarImage src="" alt="" />
                        <AvatarFallback className='text-5xl bg-blue-300'>{supplier.supplier.name[0].toUpperCase() + supplier.supplier.name[1].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className='text-lg font-medium'>{supplier.supplier.name}</p>
                    <div className='flex items-center'>
                        <p className='text-gray-500 text-sm '>Status&ensp;</p>
                        <p className='text-black text-sm font-normal '>{supplier.supplier.status}</p>
                    </div>
                </div>



            </FormSheet>
        </>
    )
}
