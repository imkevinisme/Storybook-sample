import type { Meta, StoryObj } from '@storybook/react';

import StatusChip from "@/components/Chips/StatusChip";

const meta: Meta<typeof StatusChip> = {
    component: StatusChip,
};

export default meta;
type Story = StoryObj<typeof StatusChip>;

export const Delivered: Story = {
    args: {
        status: "delivered"
    },
};

export const Processing: Story = {
    args: {
        status: "processing"
    },
};

export const InTransit: Story = {
    args: {
        status: "in_transit"
    },
};

export const Error: Story = {
    args: {
        status: "error"
    },
};