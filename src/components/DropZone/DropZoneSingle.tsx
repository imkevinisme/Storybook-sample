'use client';

import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import FileService from '@/services/File';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import FilePreview from './FilePreview';

interface DropZoneSingleProps {
    onFileUploaded: (file: File | null, response: any) => void;
    label?: string;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    acceptedTypes?: {
        [key: string]: string[];
    };
}

export interface DropZoneSingleRef {
    reset: () => void;
}

const DropZoneSingle = forwardRef<DropZoneSingleRef, DropZoneSingleProps>(({
    onFileUploaded,
    label,
    required,
    isError,
    errorMessage,
    acceptedTypes,
}, ref) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Expose the reset method to parent components
    useImperativeHandle(ref, () => ({
        reset: () => {
            setFile(null);
            setUploadProgress(0);
            setUploadError(null);
            onFileUploaded(null, null);
        }
    }));

    // Upload file to server
    const uploadFile = useCallback(async (fileToUpload: File) => {
        setUploading(true);
        setUploadError(null);
        try {
            const response = await FileService.singleUpload(fileToUpload, (progress) => {
                const percentCompleted = Math.round((progress.loaded * 100) / progress.total);
                setUploadProgress(percentCompleted);
            });
            onFileUploaded(fileToUpload, response);
        } catch (error: any) {
            console.error('Error uploading file:', error);
            const errorMessage = error.response?.data?.error || 'An error occurred while uploading the file. Please try again.';
            setUploadError(errorMessage);
            onFileUploaded(null, null);
        } finally {
            setUploading(false);
        }
    }, [onFileUploaded]);

    // Handle file drop
    const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (fileRejections.length > 0) {
            setUploadError(fileRejections[0].errors[0].message);
            return;
        }
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            await uploadFile(acceptedFiles[0]);
        }
    }, [uploadFile]);

    // Initialize dropzone
    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        noClick: true,
        noKeyboard: true,
        accept: acceptedTypes,
    });

    // Remove selected file
    const removeFile = () => {
        setFile(null);
        setUploadProgress(0);
        setUploadError(null);
        onFileUploaded(null, null); // Notify parent that file has been removed
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block mb-1 text-sm font-medium">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}

            <div className={cn(
                'w-full p-8 rounded text-center transition-colors font-medium border border-dashed border-slate-200 hover:border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700' ,

                isDragActive ? 'bg-slate-200' : ''

            )}>
                <div {...getRootProps()} className="flex flex-col items-center">
                    <input {...getInputProps()} />
                    {file ? (
                        <div className='flex items-center justify-start gap-4 w-full'>
                            <FilePreview width={48} height={48} file={file} />
                            <div className='flex flex-col items-start justify-center flex-grow'>
                                <p>{file.name}</p>
                                {uploading ? (
                                    <div className='flex flex-col items-start justify-center w-full'>
                                        <p>Uploading... {uploadProgress}%</p>

                                        <div className="w-full h-1 mt-1 rounded-full">

                                            <div
                                                className="h-1 bg-blue-600 rounded"
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ) : uploadError ? (
                                    <p className="text-red-500">{uploadError}</p>
                                ) : (
                                    <p className='text-green-600'>File uploaded successfully!</p>
                                )}
                            </div>
                            <button
                                onClick={removeFile}
                                className="flex items-center justify-center w-6 h-6 transition-colors rounded-full bg-slate-100 hover:bg-slate-200"
                                disabled={uploading}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <svg className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className='text-slate-600 dark:text-slate-400'>Drag and Drop file here or <span className="text-blue-600 underline cursor-pointer" onClick={open}>Choose file</span></p>
                            {uploadError && <p className='text-red-500 mt-2'>{uploadError}</p>}
                        </>
                    )}
                </div>
            </div>

            {!file && (
                <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <p>Supported formats: {acceptedTypes ? Object.keys(acceptedTypes).join(', ') : 'All files'}</p>
                    <p>Maximum size: 25MB</p>
                </div>
            )}



            {isError && errorMessage && (
                <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    );
});

// Set the displayName property
DropZoneSingle.displayName = 'DropZoneSingle';

export default DropZoneSingle;


