import type { Meta, StoryObj } from '@storybook/react';

import PageHeading from '@/components/Typography/PageHeading';

const meta: Meta<typeof PageHeading> = {
    component: PageHeading,
};

export default meta;
type Story = StoryObj<typeof PageHeading>;

export const Default: Story = {
    args: {
        headingText: 'Supplies',
        breadcrumbs: [
            {
                title: "Samples",
                link: "/",
            },
            {
                title: `SamplesTwo`,
                link: "/SamplesTwo",
            },
        ]
    },
};