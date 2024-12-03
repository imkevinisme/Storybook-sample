import type { Meta, StoryObj } from '@storybook/react';

import DashCard from '@/components/DashCard';

const meta: Meta<typeof DashCard> = {
    component: DashCard,
};

export default meta;
type Story = StoryObj<typeof DashCard>;

export const Default: Story = {
    args: {
        title: 'Card Title',
        description: 'Card Description',
        className: 'w-96',
        actions: <button className="btn btn-primary">Action</button>,
    },
};