
import React, { ReactNode, useState, useEffect } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/Button"

interface FormSheetProps {
    title: string;
    children: ReactNode;
    triggerButton: ReactNode;
    buttonVariant: "secondary" | "destructive" | "default" | null;
    submitButtonText?: string;
    isOpen?: boolean;
    onSubmit: (data: any) => void;
    onOpenChange?: (open: boolean) => void;
    buttonLoading?: boolean;
}

const FormDialog: React.FC<FormSheetProps> = ({
    title,
    children,
    triggerButton,
    buttonVariant,
    submitButtonText = 'Submit',
    isOpen,
    onSubmit,
    onOpenChange,
    buttonLoading = false
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
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} >
                    <div className="grid gap-4 py-4">
                        {children}
                    </div>
                    <DialogFooter className='pt-4 mt-auto'>
                        {/* <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                        > Cancel </Button> */}
                        {/* <Button variant={buttonVariant} type="submit">{submitButtonText}</Button> */}
                        <Button loading={buttonLoading} loadingText="Loading..." type="submit">{submitButtonText}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default FormDialog;
