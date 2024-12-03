import type { Meta, StoryObj } from '@storybook/react';

import ConfirmModal from '../Modals/Confirm';

const meta: Meta<typeof ConfirmModal> = {
    component: ConfirmModal,
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Confirm: Story = {
    args: {
        title: "Delete Contact",
        message: "Are you sure you want to delete this contact? This action cannot be undone.",
        // onConfirm: handleSubmit(onSubmit),
        onCancel: () => {
            console.log("Contact deletion cancelled");
        },
        triggerIcon: "trash",
        triggerText: "Delete",
        confirmVariant: "destructive",
    },
};

