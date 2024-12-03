import type { Meta, StoryObj } from '@storybook/react';

import Chip from "@/components/Chips";

const meta: Meta<typeof Chip> = {
    component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;


export const Default: Story = {
    args: {
        text: 'Chip',
        variant: 'default',
    },
};

export const Primary: Story = {
    args: {
        text: 'Chip',
        variant: 'primary',
    },
};

export const Warning: Story = {
    args: {
        text: 'Chip',
        variant: 'warning',
    },
};

export const Success: Story = {
    args: {
        text: 'Chip',
        variant: 'success',
    },
};

export const Danger: Story = {
    args: {
        text: 'Chip',
        variant: 'danger',
    },
};