import type { Meta, StoryObj } from '@storybook/react';

import DropZoneSingle from '../DropZone/DropZoneSingle';

const meta: Meta<typeof DropZoneSingle> = {
    component: DropZoneSingle,
};

export default meta;
type Story = StoryObj<typeof DropZoneSingle>;

export const Default: Story = {
    args: {
        // ref: {dropZoneRef},
        label: "Upload Documents",
        required: true,
        isError: false,
        errorMessage: "This field is required",
        onFileUploaded: (file: any, response: any) => {
            if (!response) {
                return
            }

            const res = response?.data?.data?.results[0]?.data;

            const documentId = Math.floor(100 * Math.random()) + "" + (new Date).getTime();
            const newFileData = {
                documentId,
                file: {
                    documentId,
                    fileId: res.fileId,
                    url: res.url,
                    name: res.name,
                    originalName: res.originalName,
                    size: res.size,
                    createdTs: res.createdTs,
                    createdBy: res.createdBy,
                    mimetype: res.mimetype,
                }
            }
            // const newDocuments = [...state.documents, newFileData];

            // setState({ documents: newDocuments as any });
            // setTimeout(() => {
            //     dropZoneRef.current?.reset();
            // }, 100)
        },
        acceptedTypes: {
            'application/pdf': ['.pdf'],
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
        }
    },
};