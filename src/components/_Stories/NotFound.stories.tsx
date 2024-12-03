import type { Meta, StoryObj } from '@storybook/react';

import { NotFound } from '@/components/NotFound';

const meta: Meta<typeof NotFound> = {
    component: NotFound,
};

export default meta;
type Story = StoryObj<typeof NotFound>;

export const Default: Story = {
    args: {
        text: 'This is a 404 page',
    },
};