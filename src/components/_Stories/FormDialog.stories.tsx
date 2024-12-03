import type { Meta, StoryObj } from '@storybook/react';

import FormDialog from '../FormDialog';
import { Button } from '../ui/button';

const meta: Meta<typeof FormDialog> = {
    component: FormDialog,
};

export default meta;
type Story = StoryObj<typeof FormDialog>;

export const Default: Story = {
    args: {
        triggerButton: <Button>Create New Folder</Button>,
        title: "New Folder",
        buttonVariant: "default",
        submitButtonText: "Submit",
        // onSubmit: handleSubmit(onSubmit),
        // isOpen: isFormOpen,
        // onOpenChange: setIsFormOpen,
        // buttonLoading: buttonLoading,
    },
};