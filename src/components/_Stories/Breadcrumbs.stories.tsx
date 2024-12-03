import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from '@/components/Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
    component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
    args: {
        items: [
            { title: 'Home', link: '/' },
            { title: 'About', link: '/about' },
            { title: 'Contact', link: '/contact' },
        ],
    },
};