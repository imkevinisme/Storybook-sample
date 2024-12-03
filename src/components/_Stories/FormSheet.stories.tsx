import type { Meta, StoryObj } from '@storybook/react';

import FormSheet from '../FormSheet';
import { Button } from '../ui/button';

const meta: Meta<typeof FormSheet> = {
    component: FormSheet,
};

export default meta;
type Story = StoryObj<typeof FormSheet>;

export const Default: Story = {
    args: {
        triggerButton: <Button>Create Contact</Button>,
        title: "Create New Contact",
        submitButtonText: "Create",
        // onSubmit: {handleSubmit(onSubmit)}
        // isOpen: {isOpen}
        // onOpenChange: {setIsOpen}
        // submitButtonLoading: {buttonLoading}
    },
};