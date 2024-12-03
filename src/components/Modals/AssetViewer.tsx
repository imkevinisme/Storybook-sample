"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button, ButtonProps } from "@/components/ui/button";

interface AssetViewerProps {
    trigger?: string | React.ReactNode;
    title: string;
    message?: string;
    file: {
        url: string;
        type: 'pdf' | 'jpeg' | 'png' | 'gif';
        name: string;
        size: string;
        uploadDate: string;
        uploadedBy: string;
    }
}

const AssetViewer = ({ trigger, title, message, file }: AssetViewerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderTrigger = () => {
        if(trigger) {
            return typeof trigger === 'string' ? <Button>{trigger}</Button> : trigger;
        }
        return <Button>Open</Button>;
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{renderTrigger()}</DialogTrigger>

            <DialogContent className="w-[calc(100%-2rem)] max-w-screen-4xl rounded border-0 h-[calc(100%-2rem)] max-h-[calc(100%-2rem)] flex flex-col dark:bg-slate-700">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {message && <DialogDescription>{message}</DialogDescription>}
                </DialogHeader>
                <div className="flex flex-1 gap-4 h-full overflow-hidden grow">
                    {/* Main preview area */}
                    <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden dark:bg-slate-800">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* PDF Viewer */}
                            {file.type === 'pdf' && (
                                <iframe
                                    src={file.url}
                                    className="w-full h-full"
                                    title="PDF viewer"
                                />
                            )}

                            {/* Image Viewer */}
                            {['jpg', 'jpeg', 'png', 'gif'].includes(file.type) && (
                                <img
                                    src={file.url}
                                    alt="Preview"
                                    className="max-w-full max-h-full object-contain"
                                />
                            )}
                        </div>
                    </div>

                    {/* File info sidebar */}
                    <div className="w-80 flex-shrink-0 bg-slate-50 rounded-lg p-4 dark:bg-slate-800">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-sm text-slate-500">File Name</h3>
                                <p className="text-sm break-all font-semibold">{file.name}</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-sm text-slate-500">Size</h3>
                                <p className="text-sm font-semibold">{file.size}</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-sm text-slate-500">Uploaded</h3>
                                <p className="text-sm font-semibold">{file.uploadDate}</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-sm text-slate-500">Uploaded By</h3>
                                <p className="text-sm font-semibold">{file.uploadedBy}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <DialogFooter className="pt-4">
                    <Button variant={cancelVariant} onClick={handleCancel}>
                        {cancelText}
                    </Button>
                    <Button variant={confirmVariant} onClick={handleConfirm}>
                        {confirmText}
                    </Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}

export default AssetViewer;
