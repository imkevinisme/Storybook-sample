import type { Meta, StoryObj } from '@storybook/react';

import InputBox from '@/components/InputBox';

const meta: Meta<typeof InputBox> = {
    component: InputBox,
};

export default meta;
type Story = StoryObj<typeof InputBox>;

export const Default: Story = {
    args: {
        label : "Input Box Title",
        required : true,
        isError : false,
        errorMessage : "Error Message",
        variant : "ghost",

    },
};