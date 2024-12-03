import type { Meta, StoryObj } from '@storybook/react';

import Address from '@/components/Address';

const meta: Meta<typeof Address> = {
    component: Address,
};

export default meta;
type Story = StoryObj<typeof Address>;

export const Default: Story = {
    args: {
        address : '65 Cowley Parkway', 
        address2 : 'Non qui accusamus qu', 
        city : 'Culpa numquam fugit', 
        state : 'AU-TAS', 
        zip : 'Esse culpa duis volu', 
        country: 'AU',
    },
};