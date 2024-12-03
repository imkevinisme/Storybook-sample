import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from '../DatePicker';

const meta: Meta<typeof DatePicker> = {
    component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    args: {
        label: "Purchase Order Date",
        required: true,
        date: new Date(1733124635 * 1000),
        onChangeDate: (date) => (Math.floor(date.getTime() / 1000)),
        isError: false,
        errorMessage: "This field is required",
        variant: "ghost"
    },
};