import type { Meta, StoryObj } from '@storybook/react';

import ActivityListing from '@/components/ActivityListing';

const meta: Meta<typeof ActivityListing> = {
    component: ActivityListing,
};

export default meta;
type Story = StoryObj<typeof ActivityListing>;

export const Default: Story = {
    args: {
        
        isLoading: false,
        activities: [
            {
                id : 1,
                user : "Rajesh Ounch",
                description : "New Contact has been added. Contact Name: Cullen Mitchell",
                timestamp : 1732524695000,
                type : "CREATE",
            },
            {
                id : 2,
                user : "Rajesh Ounch",
                description : "New Contact has been added. Contact Name: Cullen Mitchell",
                timestamp : 1732524695000,
                type : "CREATE",
            },

        ]
    },
};